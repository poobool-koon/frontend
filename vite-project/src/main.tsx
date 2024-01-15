import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Head from "./components/Head.tsx";
import { render } from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PostWrite, {
  postWriteLoader,
  postWriteAction,
} from "./components/PostWrite.tsx";
import Root from "./components/Root.tsx";
import BlogMain from "./components/BlogMain.tsx";
import { postListLoader } from "./components/PostList.tsx";
import PostRead, { postReadLoader } from "./components/PostRead.tsx";
import {
  loader as LoginLoader,
  action as LoginAction,
} from "./components/Login.tsx";
import PostEdit, {
  postEditAction,
  postEditLoader,
} from "./components/PostEdit.tsx";
import Login from "./components/Login.tsx";
import Register from "./components/Register.tsx";
import {
  loader as registerLoader,
  action as registerAction,
} from "./components/Register.tsx";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    loader: LoginLoader,
    action: LoginAction,
  },
  {
    path: "/register",
    element: <Register />,
    loader: registerLoader,
    action: registerAction,
  },
  {
    path: "/",
    element: <Root />,
    //    errorElement: <div>잘못된 접근입니다.</div>,
    children: [
      {
        path: "/write",
        element: <PostWrite />,
        loader: postWriteLoader,
        action: postWriteAction,
      },
      {
        path: "/edit/:id",
        element: <PostEdit />,
        loader: postEditLoader,
        action: postEditAction,
      },
      {
        path: "",
        element: <BlogMain />,
        loader: postListLoader,
      },
      {
        path: ":id",
        element: <PostRead />,
        loader: postReadLoader,
      },
    ],
  },
]);
render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById("root")
);
/*
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Head />
    <span>
      <a href="write">글쓰기</a>
    </span>{" "}
    <span>
      <a href="write">방명록</a>
    </span>
    <App />
  </React.StrictMode>
);
*/
