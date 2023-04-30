import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100vh;
  margin: 0 auto;
  max-width: 680px;
  width: 100%;

`;

// 보드 전체 컨테이너
const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  gap: 10px;

  align-items: center;
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
  const [toDos, setToDos] = useRecoilState(toDoState);
  // onDragEnd : 드래그가 끝났을 때 실행되는 함수
  // destination : 드래그 끝나는 시점의 도착지 정보
  // source : 드래그 시작 정보 - 움직임을 시작한 아이템의 index, droppableId를 알려줌
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    // 그자리에 그대로 놓아서 destination이 없는 경우 그대로 리턴 조치.
    if (!destination) return;
    // oldToDos 작성
    /*  setToDos((oldToDos) => {
      // 모든 toDos를 변형시킬 수 없기 때문에 복사를 하겠음
      const toDosCopy = [...oldToDos];
      // 1. source.index에서 아이템을 삭제한다.
      toDosCopy.splice(source.index, 1); // source.index 즉 시작시점부터 1개만 지움
      // 2. item을 다시 destination.index에 넣고, 아무것도 추가하지 않고 item을 넣는다.
      // (item은 draggabledId 이다.)
      // (때때로 destination이 없을 수도 있다. 유저가 그자리에 그대로 둘 경우엔)
      toDosCopy.splice(destination?.index, 0, draggableId);
      console.log(toDosCopy);
      return toDosCopy;
    }); */
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
  );
}

export default App;
