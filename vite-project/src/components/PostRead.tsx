import {
  Link,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { BlogPost, readBlogPost, removeBlogPost } from "../services/BlogPost";
import "./PostRead.css";
export default function PostRead() {
  const { post } = useLoaderData() as { post: BlogPost };
  const navigate = useNavigate();
  return (
    <div>
      <p className="outline">
        제목:<label>{post.title}</label>
      </p>
      <p className="outline" id="content">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </p>
      <Link to={"/edit/" + post.id}>
        <button>수정하기</button>
      </Link>{" "}
      <button
        onClick={() => {
          if (window.confirm("정말로 삭제하시겠습니까?")) {
            removeBlogPost(post.id + "");
            navigate("/");
          }
        }}
      >
        삭제하기
      </button>
    </div>
  );
}
export async function postReadLoader({ params }: LoaderFunctionArgs) {
  const post = await readBlogPost(params.id as string);
  return { post };
}
