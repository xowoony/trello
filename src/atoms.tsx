import { atom } from "recoil";

// interface를 하나 만든다
interface IToDoState {
  // 이 state는 string으로서의 property와, string array로 이루어져있다고 알려주겠음
  [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  // default를 기존의 배열에서 -> object로 변경해준다.
  default: {
    // 이 to_do는 배열을 가진다.
    "To Do": ["a", "b"],
    "Doing": ["c", "d", "e"],
    "Done": ["f"],
  },
});

// 유저에게 board를 만들 선택권을 줄 가능성이 있을 경우
