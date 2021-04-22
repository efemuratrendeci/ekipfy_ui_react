import Main from "./components/Main.jsx";
import Login from "./components/Login.jsx";
import { useState, useEffect, useMemo } from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8080');

const App = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isJWTVerified, setIsJWTVerified] = useState(false);
  const [prefersDarkMode, setPrefersDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');

  const verifyJWT = async () => {
    let token = localStorage.getItem("token");

    if (token) {
      const options = {
        method: "GET",
        timeout: 1000,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }, url = "http://localhost:8080/auth/verify_jwt";

      let response = await fetch(url, options);

      if (response.status === 200) {
        response = await response.json();

        setUser({ ...response.content.user });

        socket.emit('login', { username: response.content.user.username });

        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }

    setIsJWTVerified(true)
  }

  useEffect(() => {
    verifyJWT()
  }, [])

  const _login = async (creadentials) => {
    try {
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

        socket.emit('login', { username: response.content.user.username });
      } else {
        setError({ message: status !== 500 ? response.message : 'Server responded with 500. Make sure your backend stil on run' });
      }
    } catch (error) {
      setError({ message: error.message });
    }
  };

  const setTheme = (pref) => {
    if (pref !== undefined && pref !== prefersDarkMode)
      setPrefersDarkMode(p => !p);


    localStorage.setItem('darkMode', !prefersDarkMode);

    return createMuiTheme({
      palette: {
        type: prefersDarkMode ? 'light' : 'dark',
      },
    })
  };

  const theme = useMemo(
    setTheme,
    [prefersDarkMode],
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {isLoggedIn && isJWTVerified ? <Main user={user} theme={setTheme} themePref={prefersDarkMode} socket={socket} /> : !isLoggedIn && isJWTVerified ? <Login method={_login} error={error} /> : 'Loading...'}
      </ThemeProvider>

    </>
  );
};

export default App;
