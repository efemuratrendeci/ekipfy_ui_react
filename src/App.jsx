import Main from "./components/Main.jsx";
import Login from "./components/Auth/Login.jsx";
import Loading from "./components/Loading.jsx";
import { useState, useEffect, useMemo } from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { io } from 'socket.io-client';
import { sendRequest } from "./helpers/ekipfy_api";

const socket = io(process.env.REACT_APP_API_URL);

const App = () => {
  const [content, setContent] = useState({});
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isJWTVerified, setIsJWTVerified] = useState(false);
  const [prefersDarkMode, setPrefersDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');

  const verifyJWT = async () => {
    try {
      let response = await sendRequest({
        controller: '/auth/verify_jwt',
        method: 'GET'
      });

      socket.emit('login', { username: response.user.username });
      setContent(response);
      setIsLoggedIn(true);

    } catch (error) {
      setError(error.message);

    } finally {
      setIsJWTVerified(true);
    }
  }

  useEffect(() => {
    verifyJWT()
  }, [])

  const login = async (creadentials) => {
    try {
      let response = await sendRequest({
        controller: '/auth/connect',
        method: 'POST',
        body: creadentials
      });

      localStorage.setItem("token", response.token);

      socket.emit('login', { username: response.user.username });
      setContent(response);
      setIsLoggedIn(true);

    } catch (error) {
      setError(error.message);
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
        {isLoggedIn && isJWTVerified ?
          <Main
            user={content.user}
            theme={setTheme}
            themePref={prefersDarkMode}
            socket={socket}
            verifyJWT={verifyJWT} />
          : !isLoggedIn && isJWTVerified ?
            <Login
              method={login}
              outerError={error} />
            : <Loading />}
      </ThemeProvider>

    </>
  );
};

export default App;
