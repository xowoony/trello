import { useRecoilState } from "recoil";
import { minuteState } from "./atoms";
import { useState } from "react";

function App() {
  // useRecoilState는 atom의 값과 그 atom을 수정할 수 있는 함수를 줌
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value);//+를 적어주면 string=>number가 됨
  };
  

  return (
    <div>
      <input
        value={minutes}
        onChange={onMinutesChange}
        type="number"
        placeholder="Minutes"
      />
      <input type="number" placeholder="Hours" />
      <div>
      <span>Minutes : {minutes} </span>
      <span>Hours : {minutes/60}</span>
      </div>

    </div>
  );
}

export default App;
