import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
  useReducer,
} from "react";

import {
  TOGGLE_SOURCE_PLAY,
  SET_SOURCE_PLAY,
  TOGGLE_RECORDING,
  TOGGLE_RECORD_PLAY,
  UPDATE_POSITION,
  SET_RECORD_PLAY,
  SET_CARD_AUTOPLAY,
  SET_SOURCE_VOLUME,
  STOP_SOURCE_PLAY_AND_CONTINUE,
  STOP_RECORDING_AND_CONTINUE,
  SET_RECORD_VOLUME,
} from "./constants";

const initialState = {
  currentCard: 0,
  isRecording: false,
  isRecordPlaying: false,
  isSourcePlaying: false,
  cardAutoplay: false,
  lessonAutoplay: false,
  cardRepeat: false,
  lessonPlay: false,
  recordVolume: 1,
  sourceVolume: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case TOGGLE_SOURCE_PLAY:
      return {
        ...state,
        isSourcePlaying: !state.isSourcePlaying,
        cardAutoplay: false,
        lessonAutoplay: false,
      };
    case TOGGLE_RECORDING:
      return {
        ...state,
        isRecording: !state.isRecording,
        cardAutoplay: false,
        lessonAutoplay: false,
      };
    case TOGGLE_RECORD_PLAY:
      return {
        ...state,
        isRecordPlaying: !state.isRecordPlaying,
        cardAutoplay: false,
        lessonAutoplay: false,
      };
    case SET_SOURCE_PLAY:
      return { ...state, isSourcePlaying: action.payload };
    case SET_RECORD_PLAY:
      return { ...state, isRecordPlaying: action.payload };
    case UPDATE_POSITION:
      return {
        ...state,
        currentCard: action.payload,
        isRecording: false,
        isRecordPlaying: false,
        isSourcePlaying: false,
        cardAutoplay: false,
        lessonAutoplay: false,
      };
    case SET_CARD_AUTOPLAY:
      return {
        ...state,
        cardAutoplay: action.payload,
        isSourcePlaying: action.payload,
      };

    case STOP_SOURCE_PLAY_AND_CONTINUE:
      return { ...state, isSourcePlaying: false, isRecording: true };

    case STOP_RECORDING_AND_CONTINUE:
      return { ...state, isRecording: false, isRecordPlaying: true };

    case SET_RECORD_VOLUME:
      return { ...state, recordVolume: action.payload };
    case SET_SOURCE_VOLUME:
      return { ...state, sourceVolume: action.payload };

    default:
      throw new Error();
  }
}

function useMultiCard() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function hookDispatch(type) {
    return (payload) => dispatch({ type, payload });
  }

  function getActions() {
    return {
      toggleSourcePlay: hookDispatch(TOGGLE_SOURCE_PLAY),
      setSourcePlay: hookDispatch(SET_SOURCE_PLAY),
      toggleRecording: hookDispatch(TOGGLE_RECORDING),
      toggleRecordPlay: hookDispatch(TOGGLE_RECORD_PLAY),
      updatePosition: hookDispatch(UPDATE_POSITION),
      setRecordPlay: hookDispatch(SET_RECORD_PLAY),
      setCardAutoplay: hookDispatch(SET_CARD_AUTOPLAY),
      setSourceVolume: hookDispatch(SET_SOURCE_VOLUME),
      setRecordVolume: hookDispatch(SET_RECORD_VOLUME),
      stopSourcePlayAndContinue: hookDispatch(STOP_SOURCE_PLAY_AND_CONTINUE),
      stopRecordingAndContinue: hookDispatch(STOP_RECORDING_AND_CONTINUE),
    };
  }

  const actions = useMemo(getActions, []);

  return [state, actions];
}

export default useMultiCard;
