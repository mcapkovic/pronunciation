import React, { useState, useRef, useCallback, useEffect } from "react";

import { ReactMic } from "react-mic";
import { useInterval } from "beautiful-react-hooks";
import ReactAudioPlayer from "react-audio-player";

function onData(recordedBlob) {
  // console.log("chunk of real-time data is: ", recordedBlob);
}

function Recorder(props) {
  const { stopRecordPlay } = props.multiCardActions;
  const { isRecording, isRecordPlaying } = props.multiCardState;

  const [blobURL, setBlobURL] = useState(null);

  const onStop = (recordedBlob) => {
    setBlobURL(recordedBlob.blobURL);
  };

  const onEnded = () => {
    stopRecordPlay();
  };

  console.log('isRecording', isRecording)
  return (
    <div>

      <ReactMic
        record={isRecording}
        className="sound-wave"
        onStop={onStop}
        onData={onData}
        strokeColor="gray"
        backgroundColor="#ffffff"
        visualSetting="frequencyBars"
      />

      <div style={{ backgroundColor: "#000000" }}>
        <ReactAudioPlayer
          // controls
          src={isRecordPlaying ? blobURL : ""}
          autoPlay
          // onPlay={(e) => console.log("onPlay", e)}
          // onEnded={(e) => console.log("onEnded", e)}
          onEnded={onEnded}
        />
      </div>
    </div>
  );
}

export default Recorder;
