import React, { useRef, useEffect } from "react";
import ReactPlayer from "react-player";

function Player(props) {
  const { stopSourcePlayAndContinue, setSourcePlay } = props.multiCardActions;
  const { cardAutoplay, currentCard, isSourcePlaying, sourceVolume } = props.multiCardState;
  const { lesson } = props;
  const player = useRef();
  const duration = useRef(0);

  const onProgress = (e) => {
    console.log("onProgress", e);
    const start = lesson.data[currentCard].startTime;
    const end = lesson.data[currentCard].endTime;
    if (Math.abs(e.playedSeconds - start) > 2) setSourcePlay(false);

    if (e.playedSeconds > end && cardAutoplay) {
      console.log("stopSourcePlayAndContinue");
      stopSourcePlayAndContinue();
    } else if (e.playedSeconds > end) {
      console.log("setSourcePlay");

      setSourcePlay(false);
    }
  };

  const updatePosition = () => {
    const start = lesson.data[currentCard].startTime;

    let position = start / duration.current;
    if (Number.isNaN(position)) position = 0;

    player.current.seekTo(parseFloat(position));
  };

  const onDuration = (videoDuration) => {
    console.log("duration", videoDuration);
    duration.current = videoDuration;
    updatePosition();
  };

  useEffect(() => {
    // console.log(isSourcePlaying);
    // console.log(currentCard);

    if (player.current) {
      updatePosition();
    }

    // if (player.current) player.current.seekTo(parseFloat(currentCard / 100));
    // player.current.seekTo(parseFloat(currentCard / 100));
  }, [currentCard, isSourcePlaying]);

  return (
    <ReactPlayer
      className='source-player'
      ref={player}
      // controls
      playing={isSourcePlaying}
      onReady={() => console.log("onReady")}
      onBuffer={() => console.log("onBuffer")}
      onSeek={(e) => console.log("onSeek", e)}
      onError={(e) => console.log("onError", e)}
      onSeek={(e) => console.log("onSeek", e)}
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
