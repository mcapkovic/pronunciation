import React, { useState } from "react";
import { useGetKey } from "../hooks/useGetKey";
import { useKeyDown } from "../hooks/useKeyDown";
import {
  faPlay,
  faEdit,
  faStop,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Shortcuts(props) {
  const { source = false, recording = false, record = false } = props;
  const {
    toggleSourcePlay,
    toggleRecordPlay,
    setRecording,
  } = props.multiCardActions;
  const { isRecording = null } = props.multiCardState;
  const [triggerSource, setTriggerSource] = useState("=");
  const [triggerRecording, setTriggerRecording] = useState("[");
  const [triggerRecord, setTriggerRecord] = useState("]");

  useKeyDown(triggerSource, () => {
    toggleSourcePlay();
  });
  useKeyDown(
    triggerRecording,
    () => {
      console.log("triggerRecording", isRecording);
      setRecording(!isRecording);
    },
    [isRecording]
  );
  useKeyDown(triggerRecord, () => {
    toggleRecordPlay();
  });

  const lastPressedKey = useGetKey();

  return (
    <div className={"shortcuts"}>
      {source && (
        <div className="shortcuts__item">
          <span>play source:</span> <kbd>{triggerSource}</kbd>
          <button className="shortcuts__item__button" onClick={() => setTriggerSource(lastPressedKey)}>
            <FontAwesomeIcon icon={faEdit} color="gray"/>
          </button>
        </div>
      )}

      {recording && (
        <div className="shortcuts__item">
          <span>start recording:</span> <kbd>{triggerRecording}</kbd>
          <button className="shortcuts__item__button" onClick={() => setTriggerRecording(lastPressedKey)}>
            <FontAwesomeIcon icon={faEdit} color="gray" />
          </button>
        </div>
      )}

      {record && (
        <div className="shortcuts__item">
          <span>play record:</span> <kbd>{triggerRecord}</kbd>
          <button className="shortcuts__item__button" onClick={() => setTriggerRecord(lastPressedKey)}>
            <FontAwesomeIcon icon={faEdit} color="gray"/>
          </button>
        </div>
      )}

      <div className="shortcuts__item">
        <span>last pressed:</span>
        {lastPressedKey && lastPressedKey !== ' ' && <kbd>{lastPressedKey}</kbd>}
      </div>
    </div>
  );
}

export default Shortcuts;
