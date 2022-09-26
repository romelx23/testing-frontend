import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../Logo/Logo";

export const Footer = () => {
  return (
    <footer className="mt-auto min-h- bg-blue-800 py-8 print:hidden">
      <div className="flex flex-col items-center justify-center gap-3">
          <Logo />
        <ul className="text-white text-center laptop:hidden flex space-x-4 flex-wrap justify-center">
          <li className="hover:underline">
            <Link to="/"  className="block" style={{textDecoration:'none',color:'#fff'}}>
              Home
            </Link>
          </li>
          <li className="hover:underline">
            <Link to="/home/sobre-nosotros"  className="block" style={{textDecoration:'none',color:'#fff'}}>
              Sobre nosotros
            </Link>
          </li>
          <li className="hover:underline">
            <Link to="/home/contactanos" className="block" style={{textDecoration:'none',color:'#fff'}}>
              Contactános
            </Link>
          </li>
          <li className="hover:underline">
            <Link to="/home/terminos-y-condiciones" className="block" style={{textDecoration:'none',color:'#fff'}}>
              Terminos y condiciones
            </Link>
          </li>
          <li className="hover:underline">
            <Link to="/home/descarga-la-app" className="block" style={{textDecoration:'none',color:'#fff'}}>
              Descarga la app
            </Link>
          </li>
        </ul>
        <p>
          © 2022. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};
