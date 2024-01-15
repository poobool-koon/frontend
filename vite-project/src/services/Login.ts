export async function requestLogin(
  id: string,
  password: string
): Promise<string> {
  let session = "";
  fetch("http://127.0.0.1:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, password }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      session = data;
    })
    .catch((error) => {});
  return session;
}

export async function getUser(userid: string): Promise<User | null> {
  let user: User | null = null;
  await fetch("http://127.0.0.1:3000/users?userid=" + userid, {
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
      user = data as User;
      console.log(user);
    })
    .catch((error) => {});
  return user;
}

export async function requestRegister(
  user: User,
  password: string
): Promise<boolean> {
  let success: boolean = false;
  await fetch("http://127.0.0.1:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user, password }),
  })
    .then((response) => {
      if (!response.ok) {
        success = false;
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      success = true;
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {});
  return success;
}

export class User {
  userid?: string;
  username?: string;
}
