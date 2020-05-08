import React, { useState, useRef, useCallback, useEffect } from "react";

import { ReactMic } from "react-mic";
import { useInterval } from "beautiful-react-hooks";
import ReactAudioPlayer from "react-audio-player";

function onData(recordedBlob) {
  console.log("chunk of real-time data is: ", recordedBlob);
}

function Recorder(props) {
  const { setRecordPlay, stopRecordPlayAndContinue } = props.multiCardActions;
  const {
    lessonPlay ,
    currentCard,
    isRecording,
    isRecordPlaying,
  } = props.multiCardState;

  const [blobURL, setBlobURL] = useState(null);

  const onStop = (recordedBlob) => {
    console.log("recordedBlob is: ", recordedBlob);
    setBlobURL(recordedBlob.blobURL);
  };

  // useEffect(()=>{
  //   // console.log('interval')
  //   // setTimeout(function(){ alert("Hello"); }, 3000);

  //   if(isRecording && lessonPlay ){
  //     setTimeout(() =>{ stopRecordingAndContinue(); }, 3000);

  //   }
  // },[isRecording])

  console.log(props.multiCardState)
  const onEnded = () => {
    stopRecordPlayAndContinue()
    // if(lessonPlay ){
    //   stopRecordPlayAndContinue()
    // }else{
    //   setRecordPlay(false);
    // }
    //   // setRecordPlay(false)

    //   stopRecordingAndContinue()

    
  };
  return (
    <div >
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
