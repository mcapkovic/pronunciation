import React, { useState } from "react";
import { Link } from "react-router-dom";

function QuickPractice() {
  const [value, setValue] = useState(
    "https://www.youtube.com/watch?v=IERJyt2qKh8"
  );

  const redirectTo = value
    ? `/quick-practice-player?url=${value}`
    : "/quick-practice";
  return (
    <div>
      <input
        style={{ width: "70%" }}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <div>
        <Link to={redirectTo}>Load video</Link>
      </div>
    </div>
  );
}

export default QuickPractice;
