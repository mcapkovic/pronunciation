import React, { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";

function MainPage(props) {
  // console.log(props);
  return (
    <>
      {props.lessons.map((lesson, index) => (
        <div>
          <Link to={`/multicard/${index}`}>{lesson.title}</Link>
        </div>
      ))}
    </>
  );
}

export default MainPage;
