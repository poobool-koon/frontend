import { useLoaderData } from "react-router-dom";
import { BlogPost, listBlogPost } from "../services/BlogPost";
import Head from "./Head";
import "./PostWrite.css";
import PostList from "./PostList";
//  Awaited<ReturnType<typeof postListLoader>>

export default function BlogMain() {
  const data = useLoaderData() as { list: BlogPost[] };
  console.log(data);
  return (
    <div>
      <div>블노그 대문</div>
      <PostList />
    </div>
  );
}
