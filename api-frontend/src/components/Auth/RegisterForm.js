import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "./RegisterForm.css";

export const RegisterForm = (props) => {
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
        "http://localhost:8000/api_auth/register/",
        {
          username: usr,
          password: pwd,
        },
        { headers: {} }
      )
      .then(function (response) {
        if (response.status === 201) {
          setErr(response.statusText + " Successfully");
        }
      })
      .catch(function (error) {
        setErr(error.message);
      });

    setUsername("");
    setPassword("");
  };

  return (
    <div id="register-form-box" onSubmit={handleSubmit}>
      <form className="register-form" onS>
        <div className="error">{err}</div>
        <label id="register-form-label">Register</label>
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
    </div>
  );
};
