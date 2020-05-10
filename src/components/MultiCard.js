import React, { useState } from "react";
import ReactSwiper from "./ReactSwiper";
import Player from "./Player";
import words from "./../words.json";
import ControlPanel from "./ControlPanel";
import Display from "./Display";
import useMultiCard from "../hooks/useMultiCard";

function MultiCard(props) {
  const [multiCardState, multiCardActions] = useMultiCard();

  return (
    <div className="multi-card">
      <Player
        lesson={props.lesson}
        multiCardActions={multiCardActions}
        multiCardState={multiCardState}
      />

      <ReactSwiper
        examples={words[0].data}
        multiCardActions={multiCardActions}
        multiCardState={multiCardState}
      />

      <Display
        multiCardActions={multiCardActions}
        multiCardState={multiCardState}
      />

      <ControlPanel
        multiCardActions={multiCardActions}
        multiCardState={multiCardState}
        total={words[0].data.length}
      />
    </div>
  );
}

export default MultiCard;
