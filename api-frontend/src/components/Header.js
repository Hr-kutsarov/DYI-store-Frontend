import React from "react";
import "./Header.css";
import { useAuthStore } from "../services/GlobalState";

export const Header = (props) => {
  const username = useAuthStore((state) => state.username);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <header>
      {isLoggedIn && (
        <>
          <h1>Welcome back {username}!</h1>
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
