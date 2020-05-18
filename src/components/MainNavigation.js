import React, { useState } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MainNavigation(props) {
  const { isExact: homePage } = useRouteMatch("/");
  const newLesson = useRouteMatch("/newlesson");
  const multiCard = useRouteMatch("/multicard");

  let history = useHistory();

  const isHrActive = homePage;
  return (
    <>
      <div className={`navbar navbar--${isHrActive ? "links" : "buttons"}`}>
          <button onClick={() => history.goBack()} className="navbar__back">
            <FontAwesomeIcon size="2x" color="gray" icon={faChevronLeft} />
          </button>
          <nav className="navbar__links">
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
      </div>
      <div className="nav-hr">
        <div
          className={`nav-hr__line nav-hr__line--${
            isHrActive ? "active" : "hidden"
          }`}
        />
      </div>

      {/* <hr
        className={`navbar__hr navbar__hr--${homePage ? "active" : "hidden"}`}
      /> */}
    </>
  );
}

export default MainNavigation;
