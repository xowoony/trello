import { atom } from "recoil";

export const toDoState = atom({
  key: "toDo",
  // default는 우리가 이미 가지고 있던 것을 쓰도록 하겠음.
  default: ["a", "b", "c", "d", "e", "f"],
});
