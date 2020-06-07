import React, { useState, useMemo } from "react";
import ButtonCircle from "./ButtonCircle";
import {
    faPlay,
    faPause,
    faStop,
    faMicrophone,
  } from "@fortawesome/free-solid-svg-icons";

function BasicControls(props) {
  const {
    isRecordPlaying,
    isSourcePlaying,
    isRecording,
    lessonPlay,
  } = props.multiCardState;
  const {
    toggleRecordPlay,
    toggleSourcePlay,
    updatePosition,
    setRecording,
  } = props.multiCardActions;

  const sourceIcons = [
    {
      icon: faPlay,
      isVisible: isSourcePlaying,
    },
    {
      icon: faPause,
      isVisible: !isSourcePlaying,
    },
  ];

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
    <div className="basic-controls">
      <div className="basic-controls__source">
        <ButtonCircle
          onClick={() => toggleSourcePlay()}
          disabled={isRecording || isRecordPlaying || lessonPlay}
          icons={sourceIcons}
        />
        <span className="basic-controls__source__label">source</span>
      </div>

      <div className="basic-controls__record">
        <ButtonCircle
          onClick={() => setRecording(!isRecording)}
          disabled={isSourcePlaying || isRecordPlaying}
          icons={recordIcons}
        />
        <ButtonCircle
          onClick={() => toggleRecordPlay()}
          disabled={isSourcePlaying || isRecording || lessonPlay}
          icons={recordPlayerIcons}
        />
        <span className="basic-controls__record__label">record</span>
      </div>
    </div>
  );
}

export default BasicControls;
