import React, { useState } from "react";
import ReactSwiper from "./components/ReactSwiper";
import Player from "./components/Player";
import words from "./words.json";
import ControlPanel from "./components/ControlPanel";
import useMultiCard from "./hooks/useMultiCard";

function App() {
  const [multiCardState, multiCardActions] = useMultiCard();

  // console.log(state);
  return (
    <div>
      <Player
        lesson={words[0]}
        multiCardActions={multiCardActions}
        multiCardState={multiCardState}
      />

      <ReactSwiper
        examples={words[0].data}
        multiCardActions={multiCardActions}
        multiCardState={multiCardState}
      />

      <ControlPanel
        multiCardActions={multiCardActions}
        multiCardState={multiCardState}
      />
    </div>
  );
}

export default App;
