import { Droppable } from "react-beautiful-dnd";
import DragabbleCard from "./DragabbleCard";
import styled from "styled-components";

// 보드
const Wrapper = styled.div`
  border-radius: 5px;
  background-color: ${(props) => props.theme.boardColor};
  padding: 0.7rem 1rem;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1090px) {
    width: 20rem;
  }
`;

// TODO, Doing, Done 타이틀
const Title = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
`;

// drop 이 허락되는 영역
const Area = styled.div`
  background-color: blue;
  flex-grow: 1;
`;

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

// boardId를 넘겨주고 밑에서 DroppableId로 boardId를 주도록 한다.
// 이렇게 하면 재사용할 수 있는 board 컴포넌트가 생겼다.
function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          // 앞으로 3가지 보드를 만들 것이다.
          // 우리가 드롭할 때 받는 역할을 하는 건 div 뿐임
          <Area
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DragabbleCard key={toDo} toDo={toDo} index={index} />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
