export class BlogPost {
  constructor(title: string, content: string) {
    this.content = content;
    this.title = title;
  }
  id: number | undefined;
  userid: number | undefined;
  title: string = "";
  content: string = "";
  timestamp: string | undefined;
  public toString() {
    return "{" + this.title + "," + this.content + "}";
  }
}

export async function createBlogPost(blogPost: BlogPost) {
  fetch("http://127.0.0.1:3000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blogPost),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {})
    .catch((error) => {});
}
export async function readBlogPost(id: string): Promise<BlogPost> {
  let post: BlogPost = new BlogPost("", "");
  await fetch("http://127.0.0.1:3000/posts/" + id, {
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
export async function updateBlogPost(id: string, blogPost: BlogPost) {
  fetch("http://127.0.0.1:3000/posts/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blogPost),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {})
    .catch((error) => {});
}
export async function removeBlogPost(id: string) {
  fetch("http://127.0.0.1:3000/posts/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      window.alert("삭제되었습니다.");
      return response.json();
    })
    .then((data) => {})
    .catch((error) => {});
}
export async function listBlogPost(): Promise<BlogPost[]> {
  let list: BlogPost[] = [];
  await fetch("http://127.0.0.1:3000/posts", {
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
