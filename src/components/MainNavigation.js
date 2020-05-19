import React, { useState } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CustomMenuLink({
  className = "",
  children,
  to,
  activeOnlyWhenExact = false,
}) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact,
  });

  const modifier = match ? "--active" : "";

  return (
    <Link
      className={`${className} ${className ? className + modifier : ""}`}
      to={to}
    >
      {children}
    </Link>
  );
}

function MainNavigation(props) {
  const { isExact: homePage } = useRouteMatch("/");
  const newLesson = useRouteMatch("/newlesson");
  // const multiCard = useRouteMatch("/multicard");

  let multiCard = useRouteMatch({
    path: "/multicard",
    exact: true,
  });

  const quickPractice = useRouteMatch("/quick-practice");

  let history = useHistory();

  const isNavActive = homePage || quickPractice || multiCard;
  return (
    <>
      <div className={`navbar navbar--${isNavActive ? "links" : "buttons"}`}>
        <button onClick={() => history.goBack()} className="navbar__back">
          <FontAwesomeIcon size="2x" color="gray" icon={faChevronLeft} />
        </button>
        <nav className="navbar__links">
          <ul>
            <li>
              <CustomMenuLink className="navbar__links__link" to="/multicard">
                Lessons
              </CustomMenuLink>
            </li>
            <li>
            <CustomMenuLink className="navbar__links__link" to="/quick-practice">
            Quick practice
              </CustomMenuLink>

            </li>

            {/* <li>
          

              <Link to="/newlesson">newlesson</Link>
            </li> */}
          </ul>
        </nav>
      </div>
      <div className="nav-hr">
        <div
          className={`nav-hr__line nav-hr__line--${
            isNavActive ? "active" : "hidden"
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
