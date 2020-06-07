import React, { useRef, useEffect } from "react";
import ReactPlayer from "react-player";

function BasicPlayer(props) {
  const { multiCardActions, multiCardState, ...playerProps } = props;
  const { stopAll, stopSourcePlay, startSourcePlay } = props.multiCardActions;
  const { lessonPlay, isSourcePlaying, sourceVolume } = props.multiCardState;
  const player = useRef();

  return (
    <>
      {props.url && (
        <ReactPlayer
          className="source-player"
          ref={player}
          // controls
          playing={isSourcePlaying}
          // onReady={() => console.log("onReady")}
          // onBuffer={() => console.log("onBuffer")}
          // onSeek={(e) => console.log("onSeek", e)}
          // onError={(e) => console.log("onError", e)}
          // onSeek={(e) => console.log("onSeek", e)}
          // url="https://www.youtube.com/watch?v=IERJyt2qKh8"
          volume={sourceVolume}
          height={180}
          width={320}
          {...playerProps}
        />
      )}
    </>
  );
}

export default BasicPlayer;
