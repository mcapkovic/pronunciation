import React, { useState, useRef, useCallback, useEffect } from "react";
import logo from "./logo.svg";
// import './App.css';
import ReactPlayer from "react-player";
import Swiper from "react-id-swiper";

const params = {
  slidesPerView: 3,
  spaceBetween: 30,
  centeredSlides: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  }
}

function App() {
  const [play, setPlay] = useState(false);
  const [played, setPlayed] = useState(0);
  const player = useRef();
  const [swiper, updateSwiper] = useState(null);
  const [currentIndex, updateCurrentIndex] = useState(0);

  const handleSeekMouseUp = (e) => {
    player.current.seekTo(parseFloat(e.target.value));
  };

  const updatePosition = () =>{
    // console.log()
    const a = swiper.realIndex/5
    player.current.seekTo(parseFloat(a));
    console.log(a)
    setPlayed(parseFloat(a))
    updateCurrentIndex(swiper.realIndex)
  }

  const updateIndex = useCallback(() => updatePosition(), [
    swiper,
  ]);
  // Add event listeners for swiper after initializing
  useEffect(() => {
    if (swiper !== null) {
      swiper.on("slideChange", updateIndex);
    }


    return () => {
      if (swiper !== null) {
        swiper.off("slideChange", updateIndex);
      }
    };
  }, [swiper, updateIndex]);

  console.log('sss');
  return (
    <div className="App">
      <ReactPlayer
        ref={player}
        playing={play}
        url="https://www.youtube.com/watch?v=jNgP6d9HraI"
      />

      <button onClick={() => setPlay(true)}>play</button>
      <button onClick={() => setPlay(false)}>stop</button>

      <input
        type="range"
        min={0}
        max={0.999999}
        step="any"
        value={played}
        // onMouseDown={this.handleSeekMouseDown}
        onChange={(e) => setPlayed(parseFloat(e.target.value))}
        onMouseUp={handleSeekMouseUp}
      />

      <Swiper {...params} getSwiper={updateSwiper}>
        <div style={{ backgroundColor: "blue" }}>Slide #1</div>
        <div style={{ backgroundColor: "green" }}>Slide #2</div>
        <div style={{ backgroundColor: "orange" }}>Slide #3</div>
        <div style={{ backgroundColor: "purple" }}>Slide #4</div>
        <div style={{ backgroundColor: "pink" }}>Slide #5</div>
      </Swiper>
      currentIndex {currentIndex}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
