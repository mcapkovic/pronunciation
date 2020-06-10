import React, { useState } from "react";
import { Link } from "react-router-dom";

const defaultLink = "https://www.youtube.com/watch?v=IERJyt2qKh8";
function QuickPractice() {
  const [value, setValue] = useState("");

  const redirectTo = value
    ? `/quick-practice-player?url=${value}`
    : `/quick-practice-player?url=${defaultLink}`;
  return (
    <div style={{ textAlign: "center", marginTop: '5em' }}>
      <input
        style={{ width: "70%" }}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder={defaultLink}
      />
      <div>
        <Link to={redirectTo}>Load video</Link>
      </div>
    </div>
  );
}

export default QuickPractice;
