import "./PostWrite.css";
import { useState, useEffect } from "react";
import {
  Form,
  Link,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
} from "react-router-dom";
import Head from "./Head";
import EditorComponent from "./EditorComponent";

class User {
  id: number | undefined;
  firstName: string = "";
  lastName: string = "";
  isActive: boolean = false;
}

export default function PostWrite() {
  const { msg } = useLoaderData() as { msg: string };
  return (
    <div>
      <Form method="post">
        <label htmlFor="title">제목:</label>
        <input type="text" id="title" name="title" required></input>
        <br></br>
        <label htmlFor="content">내용:</label>
        <EditorComponent></EditorComponent>
        <button type="submit">글 올리기</button>
      </Form>
    </div>
  );
}
export function postWriteLoader() {
  return {};
}
export async function postWriteAction({ request, params }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  alert(data.title);
  return redirect("/post");
}
