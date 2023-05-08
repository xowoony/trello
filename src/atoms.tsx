import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'

export interface ITodo {
  id: number;
  text: string;
}

// interface를 하나 만든다
interface IToDoState {
  // 이 state는 string으로서의 property와, string array로 이루어져있다고 알려주겠음
  [key: string]: ITodo[];
}
const { persistAtom } = recoilPersist();
// setter함수
export const toDoState = atom<IToDoState>({
  
  key: "toDo",
  // default를 기존의 배열에서 -> object로 변경해준다.
  default: {
    // 이 to_do는 배열을 가진다.
    "진행 예정": [],
    "진행 중": [],
    "완료": [],
  },
  effects_UNSTABLE: [persistAtom],
});