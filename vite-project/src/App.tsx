import "./App.css";
import { useState, useEffect } from "react";

class User {
  id: number | undefined;
  firstName: string = "";
  lastName: string = "";
  isActive: boolean = false;
}

function App() {
  const [data, setData] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const refresh = () => {
    console.log("Refresh");
    fetch("http://127.0.0.1:3000/cats")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("GET 성공:", data);
        setData(data);
      })
      .catch((error) => {
        console.error("GET 실패:", error);
      });
  };
  useEffect(() => {
    refresh();
  }, [data]);

  return (
    <div>
      당신의 데이터:
      <p>{JSON.stringify(data)}</p>
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={firstName}
        placeholder="First Name..."
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
        required
      />
      <br />
      <input
        type="text"
        id="lastName"
        name="lastName"
        placeholder="Last Name..."
        value={lastName}
        onChange={(e) => {
          setLastName(e.target.value);
        }}
        required
      />
      <br />
      <button
        id="submit"
        onClick={() => {
          submit({ firstName: firstName, lastName: lastName } as User);
          refresh();
        }}
      >
        제출
      </button>
    </div>
  );
  function submit(user: User) {
    alert(JSON.stringify(user));

    fetch("http://127.0.0.1:3000/cats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("POST 성공:", data);
        setData(data);
      })
      .catch((error) => {
        console.error("POST 실패:", error);
      });
  }
}

export default App;
