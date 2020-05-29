import React, { useState, useMemo, useEffect, useRef } from "react";
import NewLessonTable from "./NewLessonTable";
import Player from "./Player";
import useMultiCard from "../hooks/useMultiCard";
import Shortcuts from "./Shortcuts";

const emptyRow = { startTime: "", endTime: "", word: "" };

const emptyLesson = {
  title: "Common English Words",
  source: "youtube",
  data: [emptyRow],
};

function NewLesson(props) {
  const [multiCardState, multiCardActions] = useMultiCard();
  const [data, setData] = React.useState([emptyRow]);
  const firstRender = useRef(true);
  const [title, setTitle] = useState("");
  const [source, setSource] = useState("");

  const lesson = useMemo(() => {
    return {
      title: title,
      source: source,
      data: data,
    };
  }, [title, source, data]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      const loaded = JSON.parse(localStorage.getItem("newLessonTableTemp"));
      if (loaded) setData(loaded);
    } else {
      localStorage.setItem("newLessonTableTemp", JSON.stringify(data));
    }
  }, [data]);

  return (
    <>
      <Shortcuts
        multiCardActions={multiCardActions}
        multiCardState={multiCardState}
        source
      />

      <Player
        lesson={lesson}
        multiCardActions={multiCardActions}
        multiCardState={multiCardState}
        controls
        height={360}
        width="100%"
      />

      <NewLessonTable
        data={data}
        setData={setData}
        multiCardActions={multiCardActions}
        multiCardState={multiCardState}
      />
    </>
  );
}

export default NewLesson;
