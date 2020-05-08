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
  TOGGLE_RECORD_PLAY,
  UPDATE_POSITION,
  SET_RECORD_PLAY,
  SET_CARD_AUTOPLAY,
  SET_SOURCE_VOLUME,
  SET_RECORD_VOLUME,
  TOGGLE_LESSON_PLAY,
  STOP_ALL,
  STOP_RECORD_PLAY_AND_CONTINUE,
  STOP_SOURCE_PLAY,
  SET_RECORDING,
} from "./constants";

const initialState = {
  currentCard: 0,
  isRecording: false,
  isRecordPlaying: false,
  isSourcePlaying: false,
  cardAutoplay: false,
  cardRepeat: false,
  lessonPlay: false,
  recordVolume: 1,
  sourceVolume: 0.5,
};

function reducer(state, action) {
  switch (action.type) {
    case TOGGLE_SOURCE_PLAY:
      return {
        ...state,
        isSourcePlaying: !state.isSourcePlaying,
        lessonPlay: false,
        isRecording: false,
        isRecordPlaying: false,
      };
    case STOP_SOURCE_PLAY:
      return {
        ...state,
        isSourcePlaying: false,
        isRecording: state.lessonPlay,
        isRecordPlaying: false,
      };

    case SET_RECORDING:
      return {
        ...state,
        isSourcePlaying: false,
        isRecording: action.payload,
        isRecordPlaying: !action.payload,
      };

    case TOGGLE_RECORD_PLAY:
      return {
        ...state,
        isRecordPlaying: !state.isRecordPlaying,
        lessonPlay: false,
        isRecording: false,
        isSourcePlaying: false,
      };

    case SET_SOURCE_PLAY:
      return { ...state, isSourcePlaying: action.payload, lessonPlay: false };

    case SET_RECORD_PLAY:
      return { ...state, isRecordPlaying: action.payload };

    case UPDATE_POSITION:
      return {
        ...state,
        currentCard: action.payload,
        isRecording: false,
        isRecordPlaying: false,
        isSourcePlaying: false,
        lessonPlay: false,
      };

    case SET_RECORD_VOLUME:
      return { ...state, recordVolume: action.payload };

    case SET_SOURCE_VOLUME:
      return { ...state, sourceVolume: action.payload };

    case TOGGLE_LESSON_PLAY:
      return {
        ...state,
        lessonPlay: !state.lessonPlay,
        isSourcePlaying: !state.lessonPlay,
        isRecording: false,
        isRecordPlaying: false,
      };

    case STOP_ALL:
      return {
        ...state,
        lessonPlay: false,
        isSourcePlaying: false,
        isRecordPlaying: false,
        isRecording: false,
      };

    case STOP_RECORD_PLAY_AND_CONTINUE:
      return { ...state, isRecordPlaying: false, lessonPlay: false };

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
      toggleRecordPlay: hookDispatch(TOGGLE_RECORD_PLAY),
      updatePosition: hookDispatch(UPDATE_POSITION),
      setRecordPlay: hookDispatch(SET_RECORD_PLAY),
      setSourceVolume: hookDispatch(SET_SOURCE_VOLUME),
      setRecordVolume: hookDispatch(SET_RECORD_VOLUME),
      stopRecordPlayAndContinue: hookDispatch(STOP_RECORD_PLAY_AND_CONTINUE),
      toggleLessonPlay: hookDispatch(TOGGLE_LESSON_PLAY),
      stopAll: hookDispatch(STOP_ALL),

      stopSourcePlay: hookDispatch(STOP_SOURCE_PLAY),
      setRecording: hookDispatch(SET_RECORDING),
    };
  }

  const actions = useMemo(getActions, []);

  return [state, actions];
}

export default useMultiCard;
