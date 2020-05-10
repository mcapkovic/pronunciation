import React, { useState, useRef, useCallback, useEffect } from "react";
import Swiper from "react-id-swiper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faStop,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import ButtonCircle from "./ButtonCircle";

const params = {
  slidesPerView: 3,
  spaceBetween: 30,
  centeredSlides: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // pagination: {
  //   el: ".swiper-pagination",
  //   clickable: true,
  // },
  breakpoints: {
    1200: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 2.2,
      spaceBetween: 30,
    },
    640: {
      slidesPerView: 1.8,
      spaceBetween: 30,
    },
    320: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
  },
};

function ReactSwiper(props) {
  const {
    currentCard,
    isRecordPlaying,
    isSourcePlaying,
    isRecording,
    lessonPlay,
  } = props.multiCardState;
  const {
    toggleRecordPlay,
    toggleSourcePlay,
    updatePosition,
    setRecording,
  } = props.multiCardActions;

  const [swiper, updateSwiper] = useState(null);

  const changePosition = useCallback(
    () =>
      currentCard !== swiper.realIndex
        ? updatePosition(swiper.realIndex)
        : null,
    [swiper, currentCard]
  );

  const goNext = () => {
    if (swiper !== null) {
      swiper.slideNext();
    }
  };
  const goPrev = () => {
    if (swiper !== null) {
      swiper.slidePrev();
    }
  };

  // Add event listeners for swiper after initializing
  useEffect(() => {
    if (swiper !== null) {
      swiper.on("slideChange", changePosition);
    }

    return () => {
      if (swiper !== null) {
        swiper.off("slideChange", changePosition);
      }
    };
  }, [swiper, changePosition]);

  useEffect(() => {
    if (swiper !== null && swiper.realIndex > currentCard) goPrev();
    if (swiper !== null && swiper.realIndex < currentCard) goNext();
  }, [currentCard]);

  const sourceIcons = [
    {
      icon: faPlay,
      isVisible: isSourcePlaying,
    },
    {
      icon: faPause,
      isVisible: !isSourcePlaying,
    },
  ];

  const recordIcons = [
    {
      icon: faStop,
      isVisible: !isRecording,
    },
    {
      icon: faMicrophone,
      isVisible: isRecording,
    },
  ];

  const recordPlayerIcons = [
    {
      icon: faPlay,
      isVisible: isRecordPlaying,
    },
    {
      icon: faStop,
      isVisible: !isRecordPlaying,
    },
  ];
  return (
    <Swiper {...params} noSwiping getSwiper={updateSwiper}>
      {props.examples.map((example, index) => (
        <div key={index}>
          <p className="swiper-slide__text">{example.word}</p>
          {swiper && swiper.realIndex === index && (
            <>
              {!lessonPlay ? (
                <div className="swiper-slide__controls">
                  <div className="swiper-slide__controls__source">
                    <ButtonCircle
                      onClick={() => toggleSourcePlay()}
                      disabled={isRecording || isRecordPlaying || lessonPlay}
                      icons={sourceIcons}
                    />
                    <span className="swiper-slide__controls__source__label">
                      source
                    </span>
                  </div>

                  <div className="swiper-slide__controls__record">
                    <ButtonCircle
                      onClick={() => setRecording(!isRecording)}
                      disabled={isSourcePlaying || isRecordPlaying}
                      icons={recordIcons}
                    />
                    <ButtonCircle
                      onClick={() => toggleRecordPlay()}
                      disabled={isSourcePlaying || isRecording || lessonPlay}
                      icons={recordPlayerIcons}
                    />
                    <span className="swiper-slide__controls__record__label">
                      record
                    </span>
                  </div>
                </div>
              ) : (
                <div>
                  {/* {isSourcePlaying && "listen"}
                  {isRecording && (
                    <div>
                      repeat
                      <ButtonCircle
                        onClick={() => setRecording(!isRecording)}
                        disabled={isSourcePlaying || isRecordPlaying}
                        icons={recordIcons}
                      />
                    </div>
                  )}
                  {isRecordPlaying && "compare"} */}
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </Swiper>
  );
}

export default ReactSwiper;
