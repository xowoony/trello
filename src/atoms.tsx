import { atom, selector } from "recoil";

export const minuteState = atom({
  key: "minutes",
  default: 0,
});

// number를 적어주면 selector가 number를 받는다는 것을 알게됨
export const hourSelector = selector<number>({
  key: "hours",
  get: ({ get }) => {
    const minutes = get(minuteState);
    return minutes / 60;
  },
  set: ({ set }, newValue) => {
    const minutes = Number(newValue) * 60;
    // set함수 사용하기
    //set(수정하고싶은 recoil atom, 새로운 값)
    set(minuteState, minutes);
  },
});
