import { Link } from "react-router-dom";
import "./Head.css";
import { useState, useEffect } from "react";

function Head() {
  return (
    <div>
      <Link to="/" id="banner">
        <h1>푸불로그 (포폴용)</h1>
      </Link>
      <span>
        <Link to="/write">글쓰기</Link>
      </span>{" "}
      <span>
        <Link to="/login">로그인</Link>
      </span>
    </div>
  );
}

export default Head;
