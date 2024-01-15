import {
  ActionFunctionArgs,
  Form,
  Link,
  LoaderFunctionArgs,
  redirect,
} from "react-router-dom";
import "./Head.css";
import { useRef, useState } from "react";
import { User, getUser, requestRegister } from "../services/Login";

function Register() {
  const [nameCheck, setNameCheck] = useState("");
  const [PWCheck, setPWCheck] = useState("");
  const [name, setName] = useState("");
  const refPW = useRef<HTMLInputElement>(null);
  const refPWAgain = useRef<HTMLInputElement>(null);
  const checkPW = () => {
    if (refPW.current?.value == "" || refPWAgain.current?.value == "") {
      setPWCheck("");
    } else if (refPW.current?.value == refPWAgain.current?.value) {
      setPWCheck("비밀번호가 일치합니다");
    } else {
      setPWCheck("비밀번호가 일치하지 않습니다");
    }
  };
  const checkDuplicate = async (e: any) => {
    if (name.length < 4) {
      window.alert("아이디는 4글자 이상 입력해주세요");
    } else {
      const user = await getUser(name);
      if (user == null) {
        setNameCheck("사용 가능한 아이디입니다.");
      } else {
        setNameCheck("이미 존재하는 아이디입니다.");
      }
    }
  };
  return (
    <div>
      <p>회원가입</p>
      <Form method="post">
        <label>아이디</label>
        <input
          type="text"
          onChange={(e) => {
            const newName = e.target.value;
            if (/^[A-Za-z0-9]+$/.test(newName) || newName == "") {
              setName(newName);
              setNameCheck("");
            }
          }}
          value={name}
          name="userid"
          placeholder="userid"
          maxLength={15}
          required
        />
        {nameCheck}
        <button type="button" onClick={checkDuplicate} formNoValidate>
          아이디 중복 확인
        </button>
        <label>닉네임</label>
        <input type="text" name="username" placeholder="username" required />
        <label>비밀번호</label>
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={checkPW}
          ref={refPW}
          required
        />
        <label>비밀번호 재입력</label>
        <input
          type="password"
          placeholder="password"
          onChange={checkPW}
          ref={refPWAgain}
          required
        />
        {PWCheck}

        <button
          type="submit"
          onClick={(e) => {
            if (nameCheck != "사용 가능한 아이디입니다.") {
              e.preventDefault();
              window.alert("아이디 중복확인을 해주세요.");
            } else if (PWCheck != "비밀번호가 일치합니다") {
              e.preventDefault();
              window.alert("비밀번호가 일치하지 않습니다.");
            }
          }}
        >
          회원가입
        </button>
      </Form>
    </div>
  );
}

export default Register;

export async function loader({ params }: LoaderFunctionArgs) {
  return {};
}
export async function action({ request, params, context }: ActionFunctionArgs) {
  console.log(context);
  const form = Object.fromEntries(await request.formData());
  const user: User = { userid: form.userid, username: form.username } as User;
  if (await requestRegister(user, form.password.toString())) {
    window.alert("회원가입 되었습니다.");
    return redirect("/login");
  } else {
    window.alert("입력을 확인해주세요");
  }
  return {};
}
