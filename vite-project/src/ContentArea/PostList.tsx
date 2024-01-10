import { Link, useLoaderData } from "react-router-dom";
import { BlogPost, listBlogPost } from "../services/BlogPost";

export default function PostList() {
  const { list } = useLoaderData() as { list: BlogPost[] };

  return (
    <div>
      <ul>
        {list.map((item, index) => (
          <Link to={"/" + item.id}>
            <li key={index}>{item.title}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export async function postListLoader() {
  const list = await listBlogPost();
  return { list };
}
