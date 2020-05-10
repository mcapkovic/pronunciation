import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  faPlay,
  faPause,
  faStop,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import ButtonCircle from "./ButtonCircle";

function Display(props) {
  const {
    isRecordPlaying,
    isSourcePlaying,
    isRecording,
  } = props.multiCardState;
  const { setRecording } = props.multiCardActions;

  const recordIcons = [
    {
      icon: faStop,
      isVisible: !isRecording,
    },
    {
      icon: faMicrophone,
      isVisible: isRecording,
    },
  ];

  return (
    <div className="display">
      {isSourcePlaying && <span className="display__message"> listen</span>}
      {isRecording && (
        <>
          <span className="display__message">repeat</span>
          <ButtonCircle
            onClick={() => setRecording(!isRecording)}
            disabled={isSourcePlaying || isRecordPlaying}
            icons={recordIcons}
          />
        </>
      )}
      {isRecordPlaying && <span className="display__message"> compare</span>}
    </div>
  );
}
export default Display;
