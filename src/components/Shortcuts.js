import React, { useState } from "react";
import { useGetKey } from "../hooks/useGetKey";
import { useKeyDown } from "../hooks/useKeyDown";

function Shortcuts(props) {
  const {
    toggleNewLessonSource,
    updatePosition,
    toggleSourcePlay,
  } = props.multiCardActions;

  console.log(props);
  const [trigger, setTrigger] = useState("/");

  useKeyDown(trigger, () => {
    toggleSourcePlay();
  });

  const lastPressedKey = useGetKey();

  return (
    <div className={"shortcuts"}>
      <div className="shortcuts__item">
        <span>play source key:</span> <kbd>{trigger}</kbd>
        <button onClick={() => setTrigger(lastPressedKey)}>set new key</button>
      </div>

      <div className="shortcuts__item">
        <span>last pressed key:</span>
        {lastPressedKey && <kbd>{lastPressedKey}</kbd>}
      </div>
    </div>
  );
}

export default Shortcuts;
