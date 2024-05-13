import {
  Link,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { BlogPost, readBlogPost, removeBlogPost } from "../services/BlogPost";
import "./PostRead.css";
import { User, getUser } from "../services/Login";
import Cookies from "js-cookie";
export default function PostRead() {
  const { post, user } = useLoaderData() as { post: BlogPost; user: User };
  const navigate = useNavigate();
  return (
    <div>
      <p className="outline">
        제목:<label>{post.title}</label>
      </p>
      작성자:{user.username}
      <p className="outline" id="content">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </p>
      <Link to={"/edit/" + post.id}>
        <button
          onClick={(e) => {
            if (user.userid != Cookies.get("userid")) {
              window.alert("자신의 글만 수정할 수 있습니다.");
              e.preventDefault();
            }
          }}
        >
          수정하기
        </button>
      </Link>{" "}
      <button
        onClick={async () => {
          if (window.confirm("정말로 삭제하시겠습니까?")) {
            if (await removeBlogPost(post.id + "")) {
              window.alert("삭제되었습니다.");
              navigate("/");
            } else {
              window.alert("자신이 작성한 게시글만 삭제할 수 있습니다.");
            }
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
  const user = await getUser(post.userid);
  return { post, user };
}
