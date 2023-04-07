import React from "react";
import "./Header.css";
import { useAuthStore } from "../services/GlobalState";
import { FaBeer } from "react-icons/fa";
import api from "../Api/utils.js";
export const Header = () => {
  const username = useAuthStore((state) => state.username);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  // let token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const handleLogout = async (e) => {
    e.preventDefault();

    api
      .get("api_auth/logout/", {
        headers: {},
      })
      .then(function (response) {
        if (response.status === 200) {
          console.log(
            `${response.status} status code. You have successfully logged out. Congratulations!`
          );
          // logging out sets the login state to False and clears the error fields
          logout();
        }
      })
      .catch(function (error) {
        // TODO: Catch errors
      });
  };
  return (
    <header>
      {isLoggedIn && (
        <>
          <h1>
            Welcome back {username} <FaBeer />!
          </h1>

          <button id="logout" onClick={handleLogout}>
            Logout
          </button>
        </>
      )}

      {!isLoggedIn && (
        <>
          <h1>Welcome, stranger!</h1>
        </>
      )}
    </header>
  );
};
