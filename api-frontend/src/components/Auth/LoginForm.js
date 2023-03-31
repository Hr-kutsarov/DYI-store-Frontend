import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "./LoginForm.css";

export const LoginForm = (props) => {
  const [isLogged, setLogged] = useState(false);
  const [usr, setUsername] = useState("");
  const [pwd, setPassword] = useState("");
  const [err, setErr] = useState("");

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:8000/api_auth/login/",
        {
          username: usr,
          password: pwd,
        },
        { headers: {} }
      )
      .then(function (response) {
        if (response.status === 200) {
          console.log("Logged in!");
          setLogged(true);
          setErr(response.statusText);
        }
      })
      .catch(function (error) {
        setErr(error.message);
      });

    setUsername("");
    setPassword("");
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api_auth/logout/", {})
      .then(function (response) {
        if (response.status === 200) {
          console.log("You have successfully logged out!");
          setLogged(false);
        }
      })
      .catch(function (error) {});
  };

  return (
    <div id="login-form-box" onSubmit={handleSubmit}>
      {!isLogged && (
        <form className="login-form" onS>
          <div className="error">{err}</div>
          <label id="login-form-label">Login</label>
          <input
            type="text"
            placeholder="username"
            value={usr}
            onChange={onUsernameChange}
          ></input>

          <input
            type="password"
            placeholder="password"
            value={pwd}
            onChange={onPasswordChange}
          ></input>
          <button onClick={handleSubmit}>Submit</button>
        </form>
      )}
      {isLogged && (
        <button id="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
};
