import React, { useState } from "react";
import words from "./words.json";
import MultiCard from "./components/MultiCard";

function App() {
  return (
    <div>
      <MultiCard lesson={words[0]} />
    </div>
  );
}

export default App;
