import React, { useState, useEffect } from "react";
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
  Snackbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";

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

const Login = ({ method, error }) => {
  const classes = useStyles();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [_error, setError] = useState(error);

  const handleSubmit = (e) => {
    e.preventDefault();

    method(credentials);
  };

  const handleClickShowPassword = () => {
    setShowPass(!showPass);
  };

  const handleDelete = () => {
    setError({ message: undefined });
  };

  useEffect(() => {
    if (error) {
      setError(error);
    }
  }, [error]);

  return (
    <>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <img className="ekipfy-login" src="./ekipfy.png" alt="" />
          <form onSubmit={handleSubmit}>
            <TextField
              error={_error.message?.length > 0 ? true : false}
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
                error={_error.message?.length > 0 ? true : false}
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
                      className={_error.message?.length > 0 ? "c-r" : ""}
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
          {_error.message ? (
            <Snackbar
              open={_error.message ? true : false}
              autoHideDuration={6000}
              onClose={handleDelete}
            >
              <Alert onClose={handleDelete} severity="error">
                {_error.message}
              </Alert>
            </Snackbar>
          ) : (
            " "
          )}
        </div>
      </Container>
    </>
  );
};

export default Login;
