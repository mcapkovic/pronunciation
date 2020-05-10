import React, { useState } from "react";
import words from "./words.json";
import MultiCard from "./components/MultiCard";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./sass/main.scss";

function Dashboard() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/multicard">multicard</Link>
        </li>
      </ul>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/multicard">
          <MultiCard lesson={words[0]} />
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
