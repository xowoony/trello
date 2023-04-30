import { Droppable } from "react-beautiful-dnd";
import DragabbleCard from "./DragabbleCard";
import styled from "styled-components";

// 보드
const Wrapper = styled.div`
  border-radius: 5px;
  background-color: ${(props) => props.theme.boardColor};
  padding: 0.7rem 1rem;
  min-height: 200px;
  @media screen and (max-width: 1090px) {
    width: 20rem;
  }
`;

// TODO, Doing, Done 타이틀
const Title = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
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
        {(magic) => (
          // 앞으로 3가지 보드를 만들 것이다.
          <div ref={magic.innerRef} {...magic.droppableProps}>
            {toDos.map((toDo, index) => (
              <DragabbleCard key={toDo} toDo={toDo} index={index} />
            ))}
            {magic.placeholder}
          </div>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
