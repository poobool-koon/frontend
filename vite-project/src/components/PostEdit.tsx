import "./PostWrite.css";
import {
  BlogPost,
  createBlogPost,
  readBlogPost,
  updateBlogPost,
} from "../services/BlogPost";
import {
  Form,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
} from "react-router-dom";
import EditorComponent from "./EditorComponent";
import { useEffect, useState } from "react";

export default function PostEdit() {
  const { data } = useLoaderData() as { data: BlogPost };
  return (
    <div>
      <Form method="put">
        <label htmlFor="title">제목:</label>
        <input
          type="text"
          name="title"
          defaultValue={data.title}
          required
        ></input>
        <br></br>
        <label htmlFor="content">내용:</label>
        <EditorComponent value={data.content} />
        <button type="submit">글 수정</button>
        <textarea name="id" className="hidden" value={data.id}></textarea>
      </Form>
    </div>
  );
}
export async function postEditLoader({ params }: LoaderFunctionArgs) {
  const data = await readBlogPost(params.id as string);
  return { data };
}
export async function postEditAction({ request, params }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const blogpost = new BlogPost(data.title.toString(), data.content.toString());
  await updateBlogPost(data.id.toString(), blogpost);
  return redirect("/");
}
