import React, { useState } from "react";
import { Link} from "react-router-dom";

function QuickPractice() {
  const [value, setValue] = useState("");

  const redirectTo = value? `/quick-practice-player?url=${value}`: '/quick-practice';
  return (
    <div>
      <input onChange={(e) => setValue(e.target.value)} value={value} />
      <Link to={redirectTo}>Load video</Link>
    </div>
  );
}

export default QuickPractice;
