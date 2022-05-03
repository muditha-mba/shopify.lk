import React from "react";
import { Link } from "react-router-dom";
import "./PageNotFound.css";

function PageNotFound() {
  return (
    <div className="container">
      <h1>404</h1>
      <div class="cloak__wrapper">
        <div class="cloak__container">
          <div class="cloak"></div>
        </div>
      </div>
      <div class="info">
        <h2>We can't find that page</h2>
        <p>🔎</p>
        <Link to={"/"}>
          <button href="/">Home</button>
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
