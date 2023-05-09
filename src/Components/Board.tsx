import { Droppable } from "react-beautiful-dnd";
import DragabbleCard from "./DragabbleCard";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { ITodo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

// 보드
const Wrapper = styled.div`
  margin-bottom: 5rem;
  width: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

// TODO, Doing, Done 타이틀
const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 16px;
  color: ${(props) => props.theme.textColor};
`;

// drop 이 허락되는 영역
const Area = styled.div<IAreaProps>`
  // 드래그해서 보드 위로 올라오는지 아닌지에 따라서 배경색을 바꾸어줌.
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  min-width: 17rem;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
    text-align: center;
    background-color: #ffffffc4;
    border: ${(props) => props.theme.borderStyle};
    color: #211053;
    width: 100%;
    height: 2.5rem;
  }
`;

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
}

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  // Board 삭제 로직
  // const [todoState, setTodoState] = useRecoilState(toDoState);
  // const onDeleteClick = () => {
  //   setTodoState((allBoards) => {
  //     const copy = {...allBoards};
  //     delete copy[boardId];
  //     const result = copy;
  //     return result;
  //   });
  // };

  // state를 조작할 수 있는 함수
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();

  // form이 valid할 때 호출되는 함수
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    setValue("toDo", "");
  };

  return (
    <Wrapper>
      <Title>{boardId}</Title>
      {/* 보드삭제 */}
      {/* <button onClick={onDeleteClick}>X</button> */}
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`메모를 입력하세요`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, info) => (
          // 3개의 보드 생성
          <Area
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos &&
              toDos.map(
                (
                  toDo,
                  index // map 오류 해결해야 함
                ) => (
                  <DragabbleCard
                    key={toDo.id}
                    index={index}
                    toDoId={toDo.id}
                    toDoText={toDo.text}
                    boardId={boardId}
                  />
                )
              )}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
