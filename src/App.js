import Main from "./components/Main";
import Login from "./components/Login";
import { useState } from "react";

const App = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    let token = localStorage.getItem("token"), status;

    if (token) {
      fetch("http://localhost:8080/auth/verify_jwt", {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((res) => {
          status = res.status;
          return res.json()
        })
        .then((res) => {
          setIsLoggedIn(status === 200 ? true : false);

          setUser({ ...res.content.user });
          return status === 200 ? true : false
        });
    }
  });

  const _login = async (creadentials) => {
    let response = await fetch("http://localhost:8080/auth/connect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creadentials),
    });

    let status = response.status;

    response = await response.json();

    if (status === 200) {
      localStorage.setItem("token", response.content.token);
      setIsLoggedIn({ isLoggedIn: true });
      setUser({ ...response.content.user });
    } else {
      setError({ message: response.message });
    }
  };

  return (
    <>{isLoggedIn ? <Main user={user} /> : <Login method={_login} error={error} />}</>
  );
};

export default App;
