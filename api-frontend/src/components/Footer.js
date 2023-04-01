import React from "react";
import "./Footer.css";
import { useAuthStore } from "../services/GlobalState";
import axios from "axios";

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
