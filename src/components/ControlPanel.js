import React, { useState, useRef, useCallback, useEffect } from "react";
import Mic from "./Mic";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import ButtonCircle from "./ButtonCircle";

function ControlPanel(props) {
  const { multiCardActions, multiCardState } = props;
  const { toggleLessonPlay } = multiCardActions;
  const { lessonPlay } = multiCardState;

  return (
    <div>
      <Mic
        multiCardActions={multiCardActions}
        multiCardState={multiCardState}
      />

      <ButtonCircle
        onClick={() => toggleLessonPlay()}
        icons={[
          {
            icon: faPlay,
            isVisible: lessonPlay,
          },
          {
            icon: faPause,
            isVisible: !lessonPlay,
          },
        ]}
      />

      <input id="cardRepeat" type="checkbox" />
      <label htmlFor="cardRepeat">repeat</label>

      <input
        type="range"
        onChange={(e) => multiCardActions.setSourceVolume(Number(e.target.value))}
        value={multiCardState.sourceVolume}
        min={0}
        max={1}
        step={0.1}
      />
      {/* <input
        type="range"
        onChange={(e) => multiCardActions.setRecordVolume(e.target.value)}
        value={Number(multiCardState.recordVolume)}
        min="0"
        max="1"
        step="0.1"
      /> */}
    </div>
  );
}

export default ControlPanel;
