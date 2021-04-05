import React, { useState } from "react";

const Login = ({ method, error }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();

    method(credentials);
  };

  return (
    <div className="container center-vertical">
      <div className="m-5 card shadow">
        <div className="card-body p-5">
          <img className="ekipfy-login mb-3" src="./ekipfy.png" alt="" />
          <form onSubmit={submitHandler} autoComplete="off">
            <div className="form-group">
              <label htmlFor="username">
                <h2>Kullanıcı Adı</h2>
              </label>
              <input
                name="username"
                autoComplete="off"
                className="form-control input-lg"
                id="username"
                type="text"
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
                value={credentials.username}
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">
                <h2>Şifre</h2>
              </label>
              <input
                name="password"
                autoComplete="off"
                className="form-control input-lg"
                id="password"
                type="password"
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                value={credentials.password}
              />
            </div>
            <br />
            <button className="btn btn-success btn-block btn-lg"> Giriş </button>
            {error.message ? (
              <div className="alert alert-danger mt-3" role="alert">
                {error.message}
              </div>
            ) : (
              ""
            )}
          </form>
        </div>

      </div>
    </div>
  );
};

export default Login;
