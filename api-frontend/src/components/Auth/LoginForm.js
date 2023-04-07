import React, { useState } from "react";
import api from "../../Api/utils.js";
import "./LoginForm.css";
import { useAuthStore } from "../../services/GlobalState";

export const LoginForm = (props) => {
  // set login and username state globally
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logIn = useAuthStore((state) => state.logIn);

  const username = useAuthStore((state) => state.username);
  const setUsername = useAuthStore((state) => state.setUsername);
  const setToken = useAuthStore((state) => state.setToken);
  const onRegister = useAuthStore((state) => state.onRegister);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // uses the globally stored username and locally stored state password
    api
      .post(
        "api_auth/login/",
        {
          username: username,
          password: pwd,
        },
        {
          headers: {},
        }
      )
      .then(function (response) {
        if (response.status === 200) {
          setToken(response.data.token);
          // sets the global state of Logged in to True, Logging in hides the Register and Login panels and displays the Logout button
          logIn();
          // using the field where errors are shown to display the status code as a form of visual confirmation
          // TODO: remove this
          setErr(response.statusText);
        }
      })
      .catch(function (error) {
        setErr(error.message);
      });

    // logging in resets the state of the password and message fields
    setPassword("");
    setErr("");
  };

  const handleRegisterBtn = () => {
    // sets the registered state to True, wanting to register triggers the Register panel
    onRegister();
  };

  return (
    <div id="login-form-box" onSubmit={handleSubmit}>
      <form className="login-form">
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
            <div className="button-box">
              <button onClick={handleSubmit}>Submit</button>
              <button onClick={handleRegisterBtn}>Register here.</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};
