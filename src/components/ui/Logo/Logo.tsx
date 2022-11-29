import React from "react";
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link
      to="/user/profile"
      tabIndex={0}
      title="Spencer and Williams"
      style={{ textDecoration: "none", color: "#fff" }}
    >
      <img
        className="w-full max-w-xs h-20"
        src="https://media.discordapp.net/attachments/789940470578544682/1024054584131461241/unknown.png"
        alt="logo"
      />
    </Link>
  );
};
