import React, { useState } from "react";
import {
  faPlay,
  faEdit,
  faStop,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import useMultiCard from "../hooks/useMultiCard";
import Mic from "./Mic";
import ButtonCircle from "./ButtonCircle";
import Shortcuts from "./Shortcuts";

function RecorderPage(props) {
  const [multiCardState, multiCardActions] = useMultiCard();

  const { isRecordPlaying, isRecording } = multiCardState;
  const { toggleRecordPlay, setRecording } = multiCardActions;

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

  const recordPlayerIcons = [
    {
      icon: faPlay,
      isVisible: isRecordPlaying,
    },
    {
      icon: faStop,
      isVisible: !isRecordPlaying,
    },
  ];
  return (
    <div className="recorder-page">
      <div className="recorder-page__controls">
        <ButtonCircle
          onClick={() => setRecording(!isRecording)}
          disabled={isRecordPlaying}
          icons={recordIcons}
        />
        <ButtonCircle
          onClick={() => toggleRecordPlay()}
          disabled={isRecording}
          icons={recordPlayerIcons}
        />
      </div>

<div className="recorder-page__footer">
<Mic
        multiCardActions={multiCardActions}
        multiCardState={multiCardState}
      />
      <Shortcuts
        multiCardActions={multiCardActions}
        multiCardState={multiCardState}
        recording
        record
      />
</div>
 
    </div>
  );
}

export default RecorderPage;
