import Cookies from "js-cookie";
export async function requestLogin(
  userid: string,
  password: string
): Promise<boolean> {
  const response = await fetch("https://poobool1302.ddns.net/api/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userid, password }),
  });
  if (response.ok) {
    const user = await getUser(userid.toString());
    Cookies.set("userid", user.userid);
    Cookies.set("username", user.username);
    console.log(response.headers);
  } else {
    window.alert("로그인 정보가 일치하지 않습니다.");
  }
  return response.ok;
}
export async function requestLogout() {
  await fetch("https://poobool1302.ddns.net/api/logout", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      Cookies.remove("userid");
      Cookies.remove("username");
      return response.json();
    })
    .then((data) => {})
    .catch((error) => {});
}
export async function getUser(userid: string): Promise<User | null> {
  let user: User | null = null;
  await fetch("https://poobool1302.ddns.net/api/users?userid=" + userid, {
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
  await fetch("https://poobool1302.ddns.net/api/users", {
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
