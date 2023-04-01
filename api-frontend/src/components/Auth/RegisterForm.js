import React, { useState } from "react";
import axios from "axios";
import "./RegisterForm.css";
import { useAuthStore } from "../../services/GlobalState";

export const RegisterForm = (props) => {
  const logIn = useAuthStore((state) => state.logIn);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setGlobalUsername = useAuthStore((state) => state.setUsername);
  const wantsToRegister = useAuthStore((state) => state.registered);
  const dontWantToRegister = useAuthStore((state) => state.dontWantToRegister);

  const [usr, setUsername] = useState("");
  const [pwd, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleRegisterState = () => {
    dontWantToRegister();
  };
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
          logIn();
          // hides the register form
          dontWantToRegister();
          setGlobalUsername(usr);
        }
      })
      .catch(function (error) {
        setErr(`Whoops, wrong data. ${error.message}`);
      });

    setUsername("");
    setPassword("");
  };

  return (
    <>
      {wantsToRegister && !isLoggedIn && (
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
            <button className="btn" onClick={handleSubmit}>
              Submit
            </button>
            <button className="btn" onClick={handleRegisterState}>
              I dont want to register.
            </button>
          </form>
        </div>
      )}
    </>
  );
};
