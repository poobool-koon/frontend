import Cookies from "js-cookie";
export class BlogPost {
  constructor(title: string, content: string) {
    this.content = content;
    this.title = title;
  }
  id: number | undefined;
  userid: string | undefined;
  title: string = "";
  content: string = "";
  timestamp: string | undefined;
  public toString() {
    return "{" + this.title + "," + this.content + "}";
  }
}

export async function createBlogPost(blogPost: BlogPost): Promise<boolean> {
  const response = await fetch("https://poobool1302.ddns.net/api/posts", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + Cookies.get("access_token"),
    },
    body: JSON.stringify(blogPost),
  });
  return response.ok;
}
export async function readBlogPost(id: string): Promise<BlogPost> {
  let post: BlogPost = new BlogPost("", "");
  await fetch("https://poobool1302.ddns.net/api/posts/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      post = data as BlogPost;
      console.log(post);
    })
    .catch((error) => {});
  return post;
}
export async function updateBlogPost(
  id: string,
  blogPost: BlogPost
): Promise<boolean> {
  const response = await fetch("https://poobool1302.ddns.net/api/posts/" + id, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blogPost),
  });
  return response.ok;
}
export async function removeBlogPost(id: string): Promise<boolean> {
  const response = await fetch("https://poobool1302.ddns.net/api/posts/" + id, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.ok;
}
export async function listBlogPost(): Promise<BlogPost[]> {
  let list: BlogPost[] = [];
  await fetch("https://poobool1302.ddns.net/api/posts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      list = data as BlogPost[];
    })
    .catch((error) => {});
  return list;
}
