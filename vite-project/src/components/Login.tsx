import Cookies from "js-cookie";
import {
  ActionFunctionArgs,
  Form,
  Link,
  LoaderFunctionArgs,
  redirect,
} from "react-router-dom";
import "./Head.css";
import { useState, useEffect } from "react";
import { getUser, requestLogin } from "../services/Login";

function Login() {
  return (
    <div>
      로그인
      <Form method="post">
        <input type="text" name="userid" placeholder="userid" required />
        <input
          type="password"
          name="password"
          placeholder="password"
          required
        />
        <button type="submit">로그인</button>
        <Link to="/register">
          <button>회원가입</button>
        </Link>
      </Form>
    </div>
  );
}

export default Login;

export async function loader({ params }: LoaderFunctionArgs) {
  return {};
}
export async function action({ params, request }: ActionFunctionArgs) {
  const form = await request.formData();
  const data = Object.fromEntries(form);
  const success = await requestLogin(
    data.userid.toString(),
    data.password.toString()
  );
  if (success) return redirect("/");
  else return {};
}
