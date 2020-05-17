import React, { useState } from "react";
import words from "./words.json";
import MultiCard from "./components/MultiCard";
import NewLesson from './components/NewLesson';
import MainPage from './components/MainPage';
import MainNavigation from './components/MainNavigation';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./sass/main.scss";

function App() {
  const lessons = words;
  return (
    <Router>
      <MainNavigation />
      <Switch>
        <Route path="/multicard/:lessonId">
          <MultiCard lessons={lessons}/>
        </Route>
        <Route path="/newlesson">
          <NewLesson />
        </Route>
        <Route path="/quick-practice">
          <NewLesson />
        </Route>
        <Route path="/">
          <MainPage lessons={lessons}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
