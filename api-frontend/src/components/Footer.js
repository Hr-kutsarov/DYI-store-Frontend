import React from "react";
import "./Footer.css";
import axios from "axios";
import { useAuthStore } from "../services/GlobalState";
export const Footer = () => {
  const handleOnClickContacts = () => {
    console.log("Contacts");
  };

  const handleOnClickInfo = () => {
    axios.get("");
    console.log("More info");
  };

  return (
    <footer>
      <div>Back to top </div>
      <ul>
        <li onClick={handleOnClickContacts}>Contacts</li>
        <li onClick={handleOnClickInfo}>More Info</li>
      </ul>
    </footer>
  );
};
