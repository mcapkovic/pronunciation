import React, { useState, useRef, useCallback, useEffect } from "react";
import Swiper from "react-id-swiper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faStop,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";

const params = {
  slidesPerView: 3,
  spaceBetween: 30,
  centeredSlides: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
};

function ReactSwiper(props) {
  const {
    currentCard,
    cardAutoplay,
    isRecordPlaying,
    isSourcePlaying,
    isRecording,
    lessonPlay,
  } = props.multiCardState;
  const {
    setSourcePlay,
    setCardAutoplay,
    toggleRecordPlay,
    toggleRecording,
    toggleSourcePlay,
    updatePosition,
  } = props.multiCardActions;

  const [swiper, updateSwiper] = useState(null);

  const changePosition = useCallback(() => updatePosition(swiper.realIndex), [
    swiper,
  ]);

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

  // useEffect(()=>{

  //   if(cardAutoplay){
  //     setSourcePlay(true)
  //   }

  //   console.log('NEW position')

  // }, [currentCard, cardAutoplay])

  // console.log("22");
  return (
    <Swiper
      {...params}
      noSwiping
      getSwiper={updateSwiper}
      navigation={{
        nextEl: isSourcePlaying ? "" : ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
    >
      {props.examples.map((example, index) => (
        <div key={index} style={{ backgroundColor: "blue" }}>
          <h2 style={{ color: "white" }}>{example.word}</h2>
          {swiper && swiper.realIndex === index && (
            <>
              {!lessonPlay ? (
                <div>
                  <button
                    onClick={() => toggleSourcePlay()}
                    disabled={isRecording || isRecordPlaying}
                  >
                    {isSourcePlaying ? (
                      <FontAwesomeIcon size="4x" icon={faPause} />
                    ) : (
                      <FontAwesomeIcon size="4x" icon={faPlay} />
                    )}
                  </button>

                  <button
                    onClick={() => toggleRecording()}
                    disabled={isSourcePlaying || isRecordPlaying}
                  >
                    {isRecording ? (
                      <FontAwesomeIcon size="4x" icon={faStop} />
                    ) : (
                      <FontAwesomeIcon size="4x" icon={faMicrophone} />
                    )}
                  </button>

                  <button
                    onClick={() => toggleRecordPlay()}
                    disabled={isSourcePlaying || isRecording}
                  >
                    {isRecordPlaying ? (
                      <FontAwesomeIcon size="4x" icon={faStop} />
                    ) : (
                      <FontAwesomeIcon size="4x" icon={faPlay} />
                    )}
                  </button>
                </div>
              ) : (
                <div>
                  {isSourcePlaying && "listen"}
                  {isRecording && (
                    <div>
                      repeat
                      <button
                        onClick={() => toggleRecording()}
                        disabled={isSourcePlaying || isRecordPlaying}
                      >
                        stop
                      </button>
                    </div>
                  )}
                  {isRecordPlaying && "compare"}
                </div>
              )}

              <button
                disabled={cardAutoplay}
                onClick={() => setCardAutoplay(!cardAutoplay)}
                style={{ padding: "20px" }}
              >
                {cardAutoplay ? "cardAutoplay on" : "cardAutoplay off"}
              </button>
            </>
          )}
        </div>
      ))}
      {/* <div style={{ backgroundColor: "green" }}>Slide #2</div>
      <div style={{ backgroundColor: "orange" }}>Slide #3</div>
      <div style={{ backgroundColor: "purple" }}>Slide #4</div>
      <div style={{ backgroundColor: "pink" }}>Slide #5</div> */}
    </Swiper>
  );
}

export default ReactSwiper;
