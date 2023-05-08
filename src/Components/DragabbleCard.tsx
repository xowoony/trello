import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

// 각각의 toDo들
const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  font-size: 12px;
  background-color: ${(props) =>
    props.isDragging ? "#a29bfe" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0,0,0,0.5)" : "none"};
`;

const Text = styled.div`
  color: black;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const DeleteButton = styled.button`
  margin-left: auto;
  background-color: transparent;
  border: 0.0625rem solid gray;
  border-radius: 0.2rem;
  height: 1.2rem;
  width: 1.4rem;
  font-size: 0.8rem;
  text-align: center;
`;

interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

function DragabbleCard({ toDoText, index, toDoId }: IDragabbleCardProps) {
  // 삭제 버튼 로직
  const [todoState, setTodoState] = useRecoilState(toDoState);

  const onDeleteClick = () => {
    setTodoState((allBoards) => {
      const copy = {...allBoards};
      console.log(copy.key);
      return { ...copy };
    });
  };

  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          <Text>
            <span>{toDoText}</span>
            <DeleteButton onClick={onDeleteClick}>X</DeleteButton>
          </Text>
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);
