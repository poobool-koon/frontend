import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Head from "./ContentArea/Head.tsx";
import { render } from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PostWrite, {
  postWriteLoader,
  postWriteAction,
} from "./ContentArea/PostWrite.tsx";
import BlogMain from "./ContentArea/BlogMain.tsx";
import Root from "./ContentArea/Root.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <div>잘못된 접근입니다.</div>,
    children: [
      {
        path: "/:id",
        element: <PostWrite />,
        loader: postWriteLoader,
        action: postWriteAction,
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
