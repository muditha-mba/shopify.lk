import React from "react";
import { useLocation } from "react-router-dom";

function Success() {
  const location = useLocation();
  //reference props.location.state.data
  console.log(location.state.data);
  return <div>success</div>;
}

export default Success;
