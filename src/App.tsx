import { useRecoilState, useRecoilValue } from "recoil";
import { hourSelector, minuteState } from "./atoms";
import { useState } from "react";

function App() {
  // useRecoilState는 atom의 값과 그 atom을 수정할 수 있는 함수를 줌
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const hours = useRecoilValue(hourSelector);
  const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value); //+를 적어주면 string=>number가 됨
  };

  return (
    <div>
      <input
        value={minutes}
        onChange={onMinutesChange}
        type="number"
        placeholder="Minutes"
      />
      <input value={hours} type="number" placeholder="Hours" />
    </div>
  );
}

export default App;
