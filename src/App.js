import React, { useState } from "react";
import words from "./words.json";
import MultiCard from "./components/MultiCard";
import NewLesson from './components/NewLesson';
import MainPage from './components/Dashboard';
import RecorderPage from './components/RecorderPage';
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
        <Route path="/multicard">
          <MainPage lessons={lessons}/>
        </Route>
        <Route path="/quick-practice">
          <MainPage />
        </Route>
        <Route path="/recorder">
          <RecorderPage />
        </Route>
        <Route path="/">
          <MainPage lessons={lessons}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;


// 0: {startTime: "88", endTime: "89", word: "have"}
// 1: {startTime: "92", endTime: "92.5", word: "to"}
// 2: {startTime: "96", endTime: "96.6", word: "it"}
// 3: {startTime: "101", endTime: "101.5", word: "I"}
// 4: {startTime: "105", endTime: "105.8", word: "for"}
// 5: {startTime: "109.6", endTime: "110.2", word: "you"}
// 6: {startTime: "114", endTime: "114.5", word: "he"}
// 7: {startTime: "118.3", endTime: "118.7", word: "with"}
// 8: {startTime: "122.7", endTime: "123.2", word: "do"}
// 9: {startTime: "127", endTime: "127.4", word: "say"}