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
    lessonAutoplay,
  } = props.multiCardState;
  const {
    setSourcePlay,
    toggleRecordPlay,
    toggleSourcePlay,
    updatePosition,
    setRecording,
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
    <Swiper
      {...params}
      noSwiping
      getSwiper={updateSwiper}
      // containerClass='swiper-container '
      // wrapperClass='aaaaaaaaaaaaaaaaaa'
      // slideClass='bbbbbbbbbbbbbbb'
      // pagination= {{
      //   el: '.swiper-pagination',
      //   clickable: true,
      //   dynamicBullets: true
      // }}

      //   navigation={
      //   //   {
      //   //   // nextEl: lessonPlay ? "" : ".swiper-button-next",
      //   //   // prevEl: lessonPlay ? "" :".swiper-button-prev",
      //   //   // nextEl:".swiper-button-next",
      //   //   // prevEl:".swiper-button-prev",
      //   // }

      //   lessonPlay? null: {

      //     nextEl:".swiper-button-next",
      //     prevEl:".swiper-button-prev",
      //   }

      // }
    >
      {props.examples.map((example, index) => (
        <div key={index}>
          <p className="swiper-slide__text">{example.word}</p>
          {swiper && swiper.realIndex === index && (
            <>
              {true ? (
                <div className="swiper-slide__controls">
                  <div className="swiper-slide__controls__source">
                    <ButtonCircle
                      onClick={() => toggleSourcePlay()}
                      disabled={isRecording || isRecordPlaying || lessonPlay}
                      icons={sourceIcons}
                    />
                    <span className="swiper-slide__controls__source__label">
                      {" "}
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
                  {isSourcePlaying && "listen"}
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
                  {isRecordPlaying && "compare"}
                </div>
              )}
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
