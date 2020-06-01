import React, { useState } from "react";
import { Link, useRouteMatch, useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function QuickPracticePlayer() {
  const query = useQuery();
  const url = query.get("url");
  console.log(url);
return <div>{url}</div>;
}

export default QuickPracticePlayer;
