import React from "react";
import "./Footer.css";

export const Footer = () => {
  const handleOnClickContacts = () => {
    console.log("Contacts");
  };

  const handleOnClickInfo = () => {
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
