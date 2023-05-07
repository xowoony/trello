import { Droppable } from "react-beautiful-dnd";
import DragabbleCard from "./DragabbleCard";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { ITodo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

// 보드
const Wrapper = styled.div`
  width: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  /* @media screen and (max-width: 1090px) {
    width: 20rem;
  } */
`;

// TODO, Doing, Done 타이틀
const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 16px;
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

// boardId를 넘겨주고 밑에서 DroppableId로 boardId를 주도록 한다.
// 이렇게 하면 재사용할 수 있는 board 컴포넌트가 생겼다.
function Board({ toDos, boardId }: IBoardProps) {
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
        [boardId]: [newToDo, ...allBoards[boardId] ],
      };
    }); // 현재 내가 있는 보드에만 올려주어야 함.
    // toDo를 Done 보드에 넣고 싶다고 했을 때
    // Done을 제외한 나머지는 제자리에 그대로 두고
    // Done안에도 그대로 두고 내 값만 마지막에 붙여주어야 함.
    // 그럴려면 현재 보드를 사용해서 카피하고 그걸 다시 state에 넣어야 함.
    setValue("toDo", "");
  };

  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`메모를 입력하세요`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, info) => (
          // 앞으로 3가지 보드를 만들 것이다.
          // 우리가 드롭할 때 받는 역할을 하는 건 div 뿐임
          <Area
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DragabbleCard
                key={toDo.id}
                toDoId={toDo.id}
                index={index}
                toDoText={toDo.text}
              />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
