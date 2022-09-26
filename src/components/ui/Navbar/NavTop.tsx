import React, { useContext } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { CartContext } from "../../../context/cart";
import { UIContext } from "../../../context/ui";
import { Badge } from "../Badge/Badge";

export const NavTop = () => {
  const { toggleCart, ToggleCart, logoMarket, toggleMenu } =
    useContext(UIContext);
  const { cart } = useContext(CartContext);
  const { pathname } = useLocation();
  // console.log(pathname.split('/')[1]==='bodega');
  return (
    <div className="flex justify-between flex-wrap md:flex-nowrap">
      <div className="flex flex-1">
        <Link to="/" className="link-navbar">
          {logoMarket != "" && pathname.split("/")[1] === "bodega" ? (
            <img src={logoMarket} alt="logo" className="h-16" />
          ) : (
            <h1 className="text-xl md:text-2xl font-pacifico">
              Tú Mercado Favorito
            </h1>
          )}
          {/* <h1 className="text-2xl font-bold">La Esquina de Chente</h1> */}
        </Link>
      </div>
      <div className="flex justify-center items-center">
        <NavLink
          title="Preguntas Frecuentes"
          to="/home/preguntas-frecuentes"
          className="flex justify-center items-center gap-2 p-2 h-9 link-top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M19 14v4h-2v-4h2M7 14v4H6c-.55 0-1-.45-1-1v-3h2m5-13a9 9 0 00-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h4v1h-7v2h6c1.66 0 3-1.34 3-3V10a9 9 0 00-9-9z"></path>
          </svg>
          <p className="hidden md:block">Soporte</p>
        </NavLink>
        <NavLink
          title="Encuentre su Bodega"
          to="/home/buscar"
          className="flex justify-center items-center gap-2 p-2 h-9 link-top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 stroke-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="hidden md:block">Encuentre una tienda</p>
        </NavLink>
      </div>
      <div className="flex justify-center items-center">
        {/* Favorito */}
        <NavLink title="Inicio" to="/" className="h-9 p-2 link-top">
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
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </NavLink>
        <NavLink title="Perfiles de las Bodegas" to="/home/tiendas" className="h-9 p-2 link-top">
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
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </NavLink>
        <NavLink
          title="Favoritos"
          to="/home/favoritos"
          className="h-9 p-2 link-top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"></path>
          </svg>
        </NavLink>
        {/* Usuario */}
        <NavLink
          title="Mi Cuenta"
          onClick={() => toggleMenu(false)}
          to="/user/profile"
          className="h-9 p-2 link-top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
          </svg>
        </NavLink>
        {/* Carrito */}
        <button
          title="Carrito"
          onClick={() => toggleCart(!ToggleCart)}
          className="h-9 p-2 relative"
        >
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
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <Badge content={cart.length} className="bg-red-600" />
        </button>
      </div>
    </div>
  );
};
