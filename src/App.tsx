import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Board = styled.div`
  background-color: ${(props) => props.theme.boardColor};
`;

const Card = styled.div`
  background-color: ${(props) => props.theme.cardColor};
`;

function App() {
  const onDragEnd = () => {};
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId="one">
          {(magic) => (
            <Board ref={magic.innerRef} {...magic.droppableProps}>
              <Draggable draggableId="first" index={0}>
                {(magic) => (
                  <Card ref={magic.innerRef} {...magic.draggableProps}>
                    <span {...magic.dragHandleProps}>★</span>
                    one
                  </Card>
                )}
              </Draggable>
            </Board>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App;
