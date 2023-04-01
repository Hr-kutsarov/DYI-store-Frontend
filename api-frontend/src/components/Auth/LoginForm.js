import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "./LoginForm.css";
import { useAuthStore } from "../../services/GlobalState";

export const LoginForm = (props) => {
  // set login and username state globally
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logIn = useAuthStore((state) => state.logIn);
  const logout = useAuthStore((state) => state.logout);
  const username = useAuthStore((state) => state.username);
  const setUsername = useAuthStore((state) => state.setUsername);
  const registered = useAuthStore((state) => state.wantToRegister);
  const wantToRegister = useAuthStore((state) => state.wantToRegister);
  // local state
  const [pwd, setPassword] = useState("");
  const [err, setErr] = useState("");

  // set the state for the current username
  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  //set the state for the current password
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // submit the entire form with the current state of the input fields
  const handleSubmit = async (e) => {
    e.preventDefault();

    //axios uses the current values of the input fields and sends the data
    axios
      .post(
        "http://localhost:8000/api_auth/login/",
        {
          username: username,
          password: pwd,
        },

        // TODO: add token
        { headers: {} }
      )
      .then(function (response) {
        if (response.status === 200) {
          console.log("Logged in!");

          logIn();
          setErr(response.statusText);
        }
      })
      .catch(function (error) {
        setErr(error.message);
      });

    setPassword("");
    setErr("");
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api_auth/logout/", {})
      .then(function (response) {
        if (response.status === 200) {
          console.log(
            `${response.status} status code. You have successfully logged out. Congratulations!`
          );
          logout();
          setErr("");
        }
      })
      .catch(function (error) {});
  };

  const handleRegisterBtn = () => {
    wantToRegister();
  };

  return (
    <div id="login-form-box" onSubmit={handleSubmit}>
      <form className="login-form" onS>
        {!isLoggedIn && (
          <>
            <div className="error">{err}</div>
            <label id="login-form-label">Login</label>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={onUsernameChange}
            ></input>

            <input
              type="password"
              placeholder="password"
              value={pwd}
              onChange={onPasswordChange}
            ></input>
            <button onClick={handleSubmit}>Submit</button>
            <nav onClick={handleRegisterBtn}>Register here.</nav>
          </>
        )}

        {isLoggedIn && (
          <button id="logout" onClick={handleLogout}>
            Logout
          </button>
        )}
      </form>
    </div>
  );
};
