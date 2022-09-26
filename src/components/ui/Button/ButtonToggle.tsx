import React, { useContext } from "react";
import { UIContext } from "../../../context/ui";

export const ButtonToggle = () => {
  const { toggleMenu, ToggleMenu } = useContext(UIContext);
  return (
    <button
      onClick={() => toggleMenu(!ToggleMenu)}
      className="flex border-none hover:opacity-70 transition"
      style={{ outline: "none" }}
    >
      {ToggleMenu ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 5l7 7-7 7M5 5l7 7-7 7"
          />
        </svg>
      )}
    </button>
  );
};
