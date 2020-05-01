import React, { useState, useRef, useCallback, useEffect } from "react";
import Mic from "./Mic";

function ControlPanel(props) {
  const { multiCardActions, multiCardState } = props;
  return (
    <div>
      <Mic
        multiCardActions={multiCardActions}
        multiCardState={multiCardState}
      />

      <button>ddd</button>
      <button>aaaa</button>

      <input
        type="range"
        onChange={(e) => multiCardActions.setSourceVolume(e.target.value)}
        value={multiCardState.sourceVolume}
        min="0"
        max="1"
        step="0.1"
      />
      <input
        type="range"
        onChange={(e) => multiCardActions.setRecordVolume(e.target.value)}
        value={multiCardState.recordVolume}
        min="0"
        max="1"
        step="0.1"
      />
    </div>
  );
}

export default ControlPanel;
