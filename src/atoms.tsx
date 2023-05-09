import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface ITodo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: ITodo[];
}

// 로컬 스토리지 저장
const { persistAtom } = recoilPersist();

// setter함수
export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "진행 예정": [],
    "진행 중": [],
    "완료": [],
  },
  effects_UNSTABLE: [persistAtom],
});

// color theme
export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});

