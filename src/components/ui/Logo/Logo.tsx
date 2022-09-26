import React from "react";
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link
      to="/"
      tabIndex={0}
      title="Spencer and Williams"
      style={{ textDecoration: "none", color: "#fff" }}
    >
      <h1 className="text-xl md:text-2xl font-bold font-pacifico">"Tú Mercado Favorito"</h1>
    </Link>
  );
};
