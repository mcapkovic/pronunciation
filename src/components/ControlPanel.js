import React, { useState, useRef, useCallback, useEffect } from "react";
import Mic from "./Mic";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import ButtonCircle from "./ButtonCircle";

function ControlPanel(props) {
  const { multiCardActions, multiCardState, total } = props;
  const { toggleLessonPlay } = multiCardActions;
  const { lessonPlay, currentCard } = multiCardState;

  return (
    <div className="control-panel">
      <Mic
        multiCardActions={multiCardActions}
        multiCardState={multiCardState}
      />

      <div className="control-panel__controls">
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

        {/* <input id="cardRepeat" type="checkbox" />
        <label htmlFor="cardRepeat">repeat</label> */}

        <div className="control-panel__controls__volume">
          <input
            type="range"
            onChange={(e) =>
              multiCardActions.setSourceVolume(Number(e.target.value))
            }
            value={multiCardState.sourceVolume}
            min={0}
            max={1}
            step={0.1}
          />
          <span>source volume</span>
        </div>
        <div className="control-panel__controls__summary">
          {currentCard}/{total}
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;
