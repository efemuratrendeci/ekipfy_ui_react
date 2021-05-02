import { useState } from "react";
import {
  CssBaseline,
  Container,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  OutlinedInput,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import SnackbarController from "../Message/SnackbarController"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(25),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    textAlign: "center",
  },
}));

const Login = ({ method, outerError }) => {
  const classes = useStyles();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [error] = useState(outerError ? outerError : '');

  const handleSubmit = (e) => {
    e.preventDefault();

    method(credentials);
  };

  const handleClickShowPassword = () => {
    setShowPass(!showPass);
  };

  return (
    <>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <img className="ekipfy-login" src="./ekipfy.png" alt="" />
          <form onSubmit={handleSubmit}>
            <TextField
              error={error.length > 0 ? true : false}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Kullanıcı Adı"
              name="username"
              autoComplete="new-username"
              autoFocus
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              value={credentials.username}
            />
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="password">Şifre</InputLabel>
              <OutlinedInput
                error={error.length > 0 ? true : false}
                id="password"
                type={showPass ? "text" : "password"}
                autoComplete="new-password"
                label="Şifre"
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                value={credentials.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      className={error.length > 0 ? "c-r" : ""}
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPass ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Giriş
            </Button>
          </form>
          <SnackbarController outerOpen={error ? true : false} severity="error" message={error} duration={0} />
        </div>
      </Container>
    </>
  );
};

export default Login;
