import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled, { createGlobalStyle } from "styled-components";
import { isDarkAtom, toDoState } from "./atoms";
import Board from "./Components/Board";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
// global style
const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}

html{
  width: 100wh;
  height: 100vh;
  font-family: 'Montserrat', sans-serif;
  background:${(props) => props.theme.bgColor} fixed;
  background-repeat: no-repeat;
  color:black;
}
body {
  line-height: 1;
  font-weight: 600;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

* {
  box-sizing: border-box;
}

body {

}

select{
  border-radius: 0;
}

input {
  appearance: none;
  border-radius: 0;
}

a {
  text-decoration: none;
  color:inherit;
}
`;

const ThemeContainer = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  height: 4rem;
`;
const ThemeButton = styled.div`
  color: ${(props) => props.theme.textColor};
  position: fixed;
  margin-right: 3rem;
  margin-top: 1rem;
  cursor: pointer;
`;

const Title = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 3rem;
  margin-bottom: 3rem;
  margin-top: 5rem;
  color: ${(props) => props.theme.titleColor};
  font-family: "Caveat", cursive;
`;

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  max-width: 680px;
`;

// 보드 전체 컨테이너
const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  gap: 10px;

  align-items: flex-start;
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media screen and (max-width: 1090px) {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

function App() {
  // color theme
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => {
    setDarkAtom((prev) => !prev);
  };

  const [toDos, setToDos] = useRecoilState(toDoState);
  // onDragEnd : 드래그가 끝났을 때 실행되는 함수
  // destination : 드래그 끝나는 시점의 도착지 정보
  // source : 드래그 시작 정보 - 움직임을 시작한 아이템의 index, droppableId를 알려줌
  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;
    // destination이 정의되지 않았을 경우 그대로 리턴
    if (!destination) return;
    // ★ 같은 보드 내에서 재정렬하기 ★
    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        // source의 droppableId로부터 array를 복사하는 과정
        const boardCopy = [...allBoards[source.droppableId]]; // toDo or Doing or Done의 array를 복사한다.
        const taskObj = boardCopy[source.index]; // toDo object를 받아서
        // 1. source.index에서 아이템을 삭제한다.
        boardCopy.splice(source.index, 1); // source.index 즉 시작시점부터 1개만 지움
        // 2. item을 다시 destination.index에 넣고, 아무것도 추가하지 않고 item을 넣는다.
        // (item은 draggabledId 이다.)
        // (때때로 destination이 없을 수도 있다. 유저가 그자리에 그대로 둘 경우엔)
        boardCopy.splice(destination?.index, 0, taskObj); // toDo object (taskObj)를 다시 넣어준다.
        // boardCopy와, 이전의 State와, 다른 Boards를 모두 리턴해주어야 함
        // oldToDos는 object 였다.
        // oldToDos에서 모든걸 리턴할건데, 보드 딱 하나만 다른걸로 대체
        return {
          ...allBoards, // 다른 모든 board들을 가져오고
          [source.droppableId]: boardCopy, // 새로운 변형된 board. (복사본임)
        };
      });
    }
    // ★ 서로 다른 보드 넘나들어서 재정렬하기 ★
    if (destination.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        // 1. Source board의 복사본을 만든다. - 시작지점
        // (모든 보드를 가져와서 거기에서 source.droppableId를 복사)
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        // 2. destinationBoard 선언 - 끝나는 지점
        const destinationBoard = [...allBoards[destination.droppableId]];
        // 3. sourceboard 삭제하기
        sourceBoard.splice(source.index, 1);
        // 4. 삭제한걸 destination board에 넣어줌
        // (draggableId를 움직임이 끝나는 board의 index에 넣어줌)
        destinationBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <DragDropContext onDragEnd={onDragEnd}>
        {/* 테마 변경 버튼 */}
        <ThemeContainer>
          <ThemeButton onClick={toggleDarkAtom}>
            {isDark ? "🌝" : "🌚"}
          </ThemeButton>
        </ThemeContainer>
        {/* 보드  */}
        <Title>Trello</Title>
        <Wrapper>
          {/* Object.keys(toDos) 까지 하면 board의 모든 Id를 받아왔음. */}
          {/* 그럼 그 boardId로 map을 이용해 새로운 board들을 만들어준다. */}
          <Boards>
            {Object.keys(toDos).map((boardId) => (
              <Board key={boardId} toDos={toDos[boardId]} boardId={boardId} />
            ))}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </ThemeProvider>
  );
}

export default App;
