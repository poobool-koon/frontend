import { Link } from "react-router-dom";
import "./Head.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { requestLogout } from "../services/Login";
function Head() {
  const [login, setLogin] = useState(false);
  useEffect(() => {
    console.log(Cookies.get("userid"));
    if (Cookies.get("userid")) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [login]);
  return (
    <div>
      <Link to="/" id="banner">
        <h1>푸불로그 (포폴용)</h1>
      </Link>
      {login ? (
        <div id="active">
          <div>
            <Link to="/write">글쓰기</Link>{" "}
            <Link
              to="/"
              onClick={async () => {
                await requestLogout();
                setLogin(false);
                alert("로그아웃 되었습니다.");
              }}
            >
              로그아웃
            </Link>{" "}
          </div>
          <label id="welcome">{`안녕하세요, ${Cookies.get(
            "username"
          )}(${Cookies.get("userid")})님`}</label>
        </div>
      ) : (
        <span>
          <Link to="/login">로그인</Link>
        </span>
      )}{" "}
    </div>
  );
}

export default Head;
