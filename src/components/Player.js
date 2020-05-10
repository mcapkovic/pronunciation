import React, { useRef, useEffect } from "react";
import ReactPlayer from "react-player";

function Player(props) {
  const { stopAll, stopSourcePlay, startSourcePlay } = props.multiCardActions;
  const {
    lessonPlay,
    currentCard,
    isSourcePlaying,
    sourceVolume,
  } = props.multiCardState;
  const { lesson } = props;
  const player = useRef();
  const duration = useRef(0);

  const onProgress = (e) => {
    const start = lesson.data[currentCard].startTime;
    const end = lesson.data[currentCard].endTime;

    if (e.playedSeconds > end && isSourcePlaying) stopSourcePlay();
    if (e.playedSeconds - start < -1 && isSourcePlaying) stopAll(); // stop if the source position is behind the start position
  };

  const updatePosition = () => {
    const start = lesson.data[currentCard].startTime;

    let position = start / duration.current;
    if (Number.isNaN(position)) position = 0;

    player.current.seekTo(parseFloat(position));
  };

  // set position when video is loaded
  const onDuration = (videoDuration) => {
    duration.current = videoDuration;
    updatePosition();
  };

  // reset position on play button click
  useEffect(() => {
    if (player.current) {
      updatePosition();
    }
  }, [isSourcePlaying]);

  // set position on chard change
  useEffect(() => {
    // update source position on card change
    if (player.current) {
      updatePosition();
    }

    // start source on card change when lesson is playing
    if (!isSourcePlaying && lessonPlay) startSourcePlay();
  }, [currentCard]);

  return (
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
      onProgress={(e) => onProgress(e)}
      url="https://www.youtube.com/watch?v=IERJyt2qKh8"
      onDuration={onDuration}
      volume={sourceVolume}
      height={180}
      width={320}
      // height={'100%'}
      // width={'100%'}
    />
  );
}

export default Player;
