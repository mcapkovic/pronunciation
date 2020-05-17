import React, { useState } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";

function MainNavigation(props) {
  const { isExact: homePage } = useRouteMatch("/");
  const newLesson = useRouteMatch("/newlesson");
  const multiCard = useRouteMatch("/multicard");

  let history = useHistory();

  const isHrActive = homePage;
  return (
    <>
      {(newLesson || multiCard) && (
        <button onClick={() => history.goBack()}>back</button>
      )}
      {homePage && (
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/multicard/0">multicard</Link>
            </li>
            <li>
              <Link to="/newlesson">newlesson</Link>
            </li>
            <li>
              <Link to="/quick-practice">Quick practice</Link>
            </li>
          </ul>
        </nav>
      )}

      <hr
        className={`navbar__hr navbar__hr--${homePage ? "active" : "hidden"}`}
      />

      <div className="nav-hr">
        <div
          className={`nav-hr__line nav-hr__line--${
            isHrActive ? "active" : "hidden"
          }`}
        />
      </div>
    </>
  );
}

export default MainNavigation;
