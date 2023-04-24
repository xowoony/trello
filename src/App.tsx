import { useRecoilState, useRecoilValue } from "recoil";
import { hourSelector, minuteState } from "./atoms";
import { useState } from "react";

function App() {
  // useRecoilState는 atom의 값과 그 atom을 수정할 수 있는 함수를 줌
  const [minutes, setMinutes] = useRecoilState(minuteState);
  // selector의 set기능
  // useRecoilState를 atom으로도 쓸 수 있고, 이처럼 selector로도 쓸 수 있다
  const [hours, setHours] = useRecoilState(hourSelector);

  const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value); //+를 적어주면 string=>number가 됨
  };

  const onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
    setHours(+event.currentTarget.value); //+를 적어주면 string=>number가 됨
  };

  return (
    <div>
      <input
        value={minutes}
        onChange={onMinutesChange}
        type="number"
        placeholder="Minutes"
      />
      {/* 값을 변경 가능하게 하려면 onChange가 필요하다. */}
      {/* onChange가 없으면 읽기 전용이다. */}
      <input
        onChange={onHoursChange}
        value={hours}
        type="number"
        placeholder="Hours"
      />
    </div>
  );
}

export default App;
