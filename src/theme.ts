// 이곳에 테마를 작성함으로 인해 실수를 방지할 수 있다.
import { DefaultTheme } from "styled-components";

// 이 테마들은 styled.d.ts 파일 속 속성들과 같아야 한다.
// 작성해준 후 export 를 해준다.
export const darkTheme: DefaultTheme = {
  bgColor: "black",
  boardColor: "rgb(255 255 255 / 34%)",
  cardColor: "#ffffffb3",
  textColor: "white",
};

export const lightTheme: DefaultTheme = {
  bgColor: "rgb(166, 177, 208)",
  boardColor: "rgba(255, 255, 255, 0.34)",
  cardColor: "#ffffffb3",
  textColor: "gray",
};
