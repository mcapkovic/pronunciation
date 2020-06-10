import React, { useRef, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useKeyDown } from "../hooks/useKeyDown";

function BasicPlayer(props) {
  const { multiCardActions, multiCardState, ...playerProps } = props;
  const { stopAll, stopSourcePlay, startSourcePlay } = props.multiCardActions;
  const { lessonPlay, isSourcePlaying, sourceVolume } = props.multiCardState;
  const player = useRef();

  // const [triggerX, setTriggerRecord] = useState("x");

  const [playerState, setPlayerState] = useState({
    url: null,
    pip: false,
    playing: true,
    controls: false,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    playbackRate: 1.0,
    loop: false,
    seeking: false,
  });

  const [duration, setDuration] = useState(0);
  const [rewindAmount, setRewindAmount] = useState(1);

  const handleProgress = (state) => {
    // We only want to update time slider if we are not currently seeking
    if (!playerState.seeking) {
      setPlayerState({ ...playerState, ...state });
    }
  };

  const handleSeekChange = (e) => {
    setPlayerState({ ...playerState, played: parseFloat(e.target.value) });
  };

  const handleSeekMouseUp = (e) => {
    setPlayerState({ ...playerState, seeking: false });
    player.current.seekTo(parseFloat(e.target.value));
  };

  const handleGoBack = (e) => {
    const newPosition = playerState.played - rewindAmount / duration;
    setPlayerState({ ...playerState, played: newPosition });
    player.current.seekTo(newPosition);
  };

  const handleForward = (e) => {
    const newPosition = playerState.played + rewindAmount / duration;
    setPlayerState({ ...playerState, played: newPosition });
    player.current.seekTo(newPosition);
  };

  const handleDuration = (newDuration) => {
    setDuration(newDuration);
  };

  useKeyDown("ArrowLeft", handleGoBack, [duration, playerState]);
  useKeyDown("ArrowRight", handleForward, [duration, playerState]);
  // useKeyDown("ArrowUp", handleForward, [duration, playerState]);
  // useKeyDown("ArrowDown", handleForward, [duration, playerState]);

  useKeyDown(
    "ArrowUp",
    () => {
      setRewindAmount(rewindAmount + 1);
    },
    [rewindAmount]
  );

  useKeyDown(
    "ArrowDown",
    () => {
      setRewindAmount(rewindAmount - 1);
    },
    [rewindAmount]
  );
console.log(playerState)
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
          onProgress={handleProgress}
          onDuration={handleDuration}
          volume={sourceVolume}
          height={180}
          width={320}
          {...playerProps}
        />
      )}
      <input
        type="number"
        value={rewindAmount}
        onChange={(e) => setRewindAmount(e.target.value)}
      />
      <input
        type="range"
        min={0}
        max={0.999999}
        step="any"
        value={playerState.played}
        onMouseDown={() => setPlayerState({ ...playerState, seeking: true })}
        onChange={handleSeekChange}
        onMouseUp={handleSeekMouseUp}
      />
      <button onClick={handleGoBack}>-{rewindAmount}</button>
      <button onClick={handleForward}>+{rewindAmount}</button>
      {Math.floor(playerState.playedSeconds)} /{duration}
    </>
  );
}

export default BasicPlayer;
