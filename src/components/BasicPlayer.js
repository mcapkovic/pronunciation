import React, { useRef, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useKeyDown } from "../hooks/useKeyDown";
import { faBookmark, faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  const [bookmark, setBookmark] = useState(0);
  const [isTimePinOn, setIsTimePinOn] = useState(false);
  const [bookmarkPosition, setBookmarkPosition] = useState(0);
  const [bookmarkOffset, setBookmarkOffset] = useState(0.5);
  const [volume, setVolume] = useState(0.5);

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

  useKeyDown("j", handleGoBack, [duration, playerState]);
  useKeyDown("l", handleForward, [duration, playerState]);
  // useKeyDown("ArrowUp", handleForward, [duration, playerState]);
  // useKeyDown("ArrowDown", handleForward, [duration, playerState]);

  useKeyDown(
    "i",
    () => {
      setRewindAmount(+rewindAmount + 1);
    },
    [rewindAmount]
  );

  useKeyDown(
    "k",
    () => {
      if (rewindAmount > 1) setRewindAmount(+rewindAmount - 1);
    },
    [rewindAmount]
  );

  const setBookmarkTime = () => {
    const rounded = Math.round(playerState.playedSeconds * 10) / 10;
    setBookmarkPosition(playerState.played);
    setBookmark(rounded);
  };

  useEffect(() => {
    if (isSourcePlaying || !isTimePinOn) return;

    const newPosition = bookmark / duration;

    setPlayerState({ ...playerState, played: newPosition });
    player.current.seekTo(newPosition);
  }, [isSourcePlaying]);

  useKeyDown(
    "q",
    () => {
      setIsTimePinOn(!isTimePinOn);
    },
    [isTimePinOn]
  );
  useKeyDown("w", setBookmarkTime, [playerState.playedSeconds]);

  return (
    <>
      {props.url && (
        <ReactPlayer
          className="basic-player"
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
          volume={volume}
          {...playerProps}
        />
      )}
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ width: "70px" }}>
          <button onClick={() => setIsTimePinOn(!isTimePinOn)}>
            {isTimePinOn ? (
              <FontAwesomeIcon icon={faBookmark} color="gray" />
            ) : (
              <FontAwesomeIcon icon={faBookmarkRegular} color="gray" />
            )}
          </button>

          <button disabled={!isTimePinOn} onClick={setBookmarkTime}>
            <FontAwesomeIcon icon={faThumbtack} />
          </button>
        </div>

        <div style={{ flexGrow: 1, height: "60px" }}>
          <input
            className={`basic-player__bookmark-slider basic-player__bookmark-slider--${
              isTimePinOn ? "visible" : "hidden"
            }`}
            // onKeyDown={(event) => event.preventDefault()}
            style={{ width: "100%" }}
            type="range"
            min={0}
            max={0.999999}
            step="any"
            value={bookmarkPosition}
            onChange={(e) => setBookmarkPosition(e.target.value)}
            // onMouseDown={() => setPlayerState({ ...playerState, seeking: true })}
            // onChange={handleSeekChange}
            // onMouseUp={handleSeekMouseUp}
          />

          <input
            className="basic-player__position-slider"
            // onKeyDown={(event) => event.preventDefault()}
            style={{ width: "100%" }}
            type="range"
            min={0}
            max={0.999999}
            step="any"
            value={playerState.played}
            onMouseDown={() =>
              setPlayerState({ ...playerState, seeking: true })
            }
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp}
          />
        </div>

        {/* <span style={{ marginLeft: "auto" }}>
          {Math.floor(playerState.playedSeconds)} /{duration}
        </span> */}

        <input
          // className={`basic-player__bookmark-slider basic-player__bookmark-slider--${
          //   isTimePinOn ? "visible" : "hidden"
          // }`}
          // onKeyDown={(event) => event.preventDefault()}
          style={{ width: "5em" }}
          type="range"
          min={0}
          max={0.999999}
          step="any"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
        />
      </div>

      <div style={{ display: "flex" }}>
        <button onClick={handleGoBack}>-{rewindAmount}</button>
        <input
          // onKeyDown={(event) => event.preventDefault()}
          min="1"
          type="number"
          value={rewindAmount}
          onChange={(e) => setRewindAmount(e.target.value)}
        />
        <button onClick={handleForward}>+{rewindAmount}</button>

        {/* <span style={{ marginLeft: "auto" }}>
          {Math.floor(playerState.playedSeconds)} /{duration}
        </span> */}
      </div>

      <label>
        bookmark offset
        <input
          type="number"
          disabled={!isTimePinOn}
          value={bookmarkOffset}
          onChange={(e) => setBookmarkOffset(e.target.value)}
        />
      </label>
      {/* <label>
        bookmark time
        <input
          type="number"
          disabled={!isTimePinOn}
          value={bookmark}
          onChange={(e) => setBookmark(e.target.value)}
        />
      </label> */}
      <br />
    </>
  );
}

export default BasicPlayer;
