import React, { useState } from "react";
import ReactSwiper from "./ReactSwiper";
import Player from "./Player";
import { useParams } from "react-router-dom";
import ControlPanel from "./ControlPanel";
import Display from "./Display";
import useMultiCard from "../hooks/useMultiCard";

function MultiCard(props) {
  const [multiCardState, multiCardActions] = useMultiCard();
  let { lessonId } = useParams();

  const lesson = props.lessons[lessonId];
  const data = lesson && lesson.data ? lesson.data : null;

  return (
    <div className="multi-card">
      {!data && <div>no lesson found</div>}
      {data && <>
        <Player
          lesson={lesson}
          multiCardActions={multiCardActions}
          multiCardState={multiCardState}
        />

        <ReactSwiper
          examples={data}
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
          total={data.length}
        />
      </>}
      
    </div>
  );
}

export default MultiCard;
