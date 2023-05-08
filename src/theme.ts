// 이곳에 테마를 작성함으로 인해 실수를 방지할 수 있다.
import { DefaultTheme } from "styled-components";

// 이 테마들은 styled.d.ts 파일 속 속성들과 같아야 한다.
// 작성해준 후 export 를 해준다.
export const darkTheme: DefaultTheme = {
  bgColor: "linear-gradient(45deg, rgb(48 48 104), black)",
  boardColor: "rgba(255, 255, 255, 0.51)",
  cardColor: "#ffffffb3",
  textColor: "rgb(0,0,0)",
  titleColor: "#d5c7fdba",
};

export const lightTheme: DefaultTheme = {
  bgColor: "linear-gradient(45deg, rgb(249 243 152), #cbccff)",
  boardColor: "rgba(255, 255, 255, 0.51)",
  cardColor: "#ffffffb3",
  textColor: "rgb(0,0,0)",
  titleColor: "rgb(0,0,0)",
};
