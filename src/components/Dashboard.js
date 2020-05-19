import React, { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";

function Dashboard(props) {
  const {lessons=[]}=props
  // console.log(props);
  return (
    <div className="dashboard">
      {lessons.map((lesson, index) => (
        <Link key={index} className="dashboard__card" to={`/multicard/${index}`}>
          <span className="dashboard__card__text">{lesson.title}</span>
        </Link>
      ))}

      <Link className="dashboard__card dashboard__card--dashed" to={`/newlesson/`}>
        <span className="dashboard__card__text">New lesson</span>
      </Link>

    </div>
  );
}

export default Dashboard;
