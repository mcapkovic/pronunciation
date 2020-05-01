import React, { useState, useRef, useCallback, useEffect } from "react";
import Swiper from "react-id-swiper";

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

  const changePosition = useCallback(
    () => updatePosition(swiper.realIndex),
    [swiper]
  );

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
              <button
                style={{ padding: "20px" }}
                onClick={() => toggleSourcePlay()}
                disabled={isRecording || isRecordPlaying}
              >
                {isSourcePlaying ? "stop" : "play"}
              </button>

              <div>
                <button
                  style={{ padding: "20px" }}
                  onClick={() => toggleRecording()}
                  disabled={isSourcePlaying || isRecordPlaying}
                >
                  {isRecording ? "stop" : "record"}
                </button>

                <button
                  style={{ padding: "20px" }}
                  onClick={() => toggleRecordPlay()}
                  disabled={isSourcePlaying || isRecording}
                >
                  {isRecordPlaying ? "stop" : "play record"}
                </button>
              </div>

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
