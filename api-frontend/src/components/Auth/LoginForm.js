import React, { useState } from "react";
import axios from "axios";
import "./LoginForm.css";
import { useAuthStore } from "../../services/GlobalState";

export const LoginForm = (props) => {
  // set login and username state globally
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logIn = useAuthStore((state) => state.logIn);
  const logout = useAuthStore((state) => state.logout);
  const username = useAuthStore((state) => state.username);
  const setUsername = useAuthStore((state) => state.setUsername);
  const token = useAuthStore((state) => state.token);
  const setToken = useAuthStore((state) => state.setToken);
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

    // axios uses the current values of the input fields and sends the data
    // uses the globally stored username and locally stored state password
    axios
      .post(
        "http://localhost:8000/api_auth/login/",
        {
          username: username,
          password: pwd,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data.token);
          setToken(response.data.token);
          console.log("Logged in!");
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

  const handleLogout = async (e) => {
    e.preventDefault();
    console.log(token);

    axios
      .get("http://localhost:8000/api_auth/logout/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        if (response.status === 200) {
          console.log(
            `${response.status} status code. You have successfully logged out. Congratulations!`
          );
          // logging out sets the login state to False and clears the error fields
          logout();
          setErr("");
        }
      })
      .catch(function (error) {
        // TODO: Catch errors
      });
  };

  const handleRegisterBtn = () => {
    // sets the registered state to True, wanting to register triggers the Register panel
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
