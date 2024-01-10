import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { BlogPost, readBlogPost } from "../services/BlogPost";
import "./PostRead.css";
export default function PostRead() {
  const { post } = useLoaderData() as { post: BlogPost };
  return (
    <div>
      정말로 삭제하시겠습니까?
      <Link to={"/edit/" + post.id}>수정하기</Link>
    </div>
  );
}
export async function postReadLoader({ params }: LoaderFunctionArgs) {
  const post = await readBlogPost(params.id as string);
  return { post };
}
