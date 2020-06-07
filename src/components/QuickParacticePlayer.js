import React, { useState, useMemo } from "react";
import { Link, useRouteMatch, useLocation } from "react-router-dom";
import useMultiCard from "../hooks/useMultiCard";
import BasicPlayer from "./BasicPlayer";
import Mic from "./Mic";
import Shortcuts from "./Shortcuts";
import  BasicControls from './BasicControls';
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function QuickPracticePlayer() {
  const [multiCardState, multiCardActions] = useMultiCard();

  const query = useQuery();
  const url = query.get("url");

  return (
    <div>
      <Shortcuts
        multiCardActions={multiCardActions}
        multiCardState={multiCardState}
        source
        recording
        record
      />
      <BasicPlayer
        url={url}
        multiCardActions={multiCardActions}
        multiCardState={multiCardState}
        controls
        height={360}
        width="100%"
      />

     <BasicControls
      multiCardActions={multiCardActions}
      multiCardState={multiCardState}
     />

      <Mic
        multiCardActions={multiCardActions}
        multiCardState={multiCardState}
      />
    </div>
  );
}

export default QuickPracticePlayer;
