import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../../context/auth";
import { CartContext } from "../../../context/cart";
import { ButtonToggle } from "../Button/ButtonToggle";
const routesName = [
  {
    name: "Admin General",
    path: "/admin",
  },
  {
    name: "Productos",
    path: "/admin/products",
  },
  {
    name: "Dashboard",
    path: "/user/dashboard",
  },
  {
    name: "Usuarios",
    path: "/admin/user",
  },
  {
    name: "Categorias",
    path: "/admin/category",
  },
  {
    name: "Perfil del Usuario",
    path: "/user/profile",
  },
  {
    name: "Pedidos",
    path: "/user/orders",
  },
  {
    name: "Configuración",
    path: "/user/configure",
  },
  {
    name: "Gestionar Pedidos",
    path: "/gestion/pedidos",
  },
  {
    name: "Gestionar Bodega",
    path: "/gestion/bodega",
  },
  {
    name: "Agregar Bodega",
    path: "/gestion/bodega/agregar",
  },
  {
    name: "Actualizar Bodega",
    path: "/gestion/bodega/actualizar",
  },
  {
    name: "Gestión Productos",
    path: "/gestion/productos",
  },
  {
    name: "Gestión Marcas",
    path: "/gestion/marcas",
  },
  {
    name: "Gestión Categorías",
    path: "/gestion/categorias",
  },
  {
    name: "Gestión Usuarios",
    path: "/admin/user",
  },
  {
    name: "Gestión Pedidos",
    path: "/dashboard/pedidos",
  }
];
export const NavAdmin = () => {
  const { user, logOut } = useContext(AuthContext);
  const { clearCart } = useContext(CartContext);
  const [toggle, setToggle] = useState(false);
  const { pathname } = useLocation();
  const [title, setTitle] = useState("");
  const LogOut = () => {
    logOut();
    clearCart();
  }

  useEffect(() => {
    if (routesName)
      routesName.map((item) => {
        if (pathname.includes(item.path)) {
          setTitle(item.name);
        }
      });
  }, [pathname]);

  return (
    <nav className="p-4 w-full flex justify-between print:hidden">
      <div className="flex items-center space-x-2">
        <ButtonToggle />
        <h1 className="font-bold text-2xl">{title}</h1>
      </div>
      <div
        className="flex justify-center items-center space-x-2"
        style={{ minWidth: "48px" }}
      >
        <p className="font-semibold hidden sm:block">
          {user.email ? user.email : "admin@gmail.com"}
        </p>
        <div className="relative">
          <img
            src={
              user.image.length !== 0
                ? user.image
                : "https://aztecsolar.com/wp-content/uploads/2020/05/placeholder-user.jpg"
            }
            alt="avatar"
            className="border-2 border-gray-300 rounded-full h-12 w-12 object-cover nav-admin hover:cursor-pointer"
            style={{ width: "48px", height: "48px" }}
            onClick={() => setToggle(!toggle)}
          />
          {toggle && (
            <div className="menu-admin">
              <Link
                to={`/user/profile/edit/${user.uuid}`}
                className="btn-admin"
              >
                Actualizar Perfil
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </Link>
              <button
                onClick={LogOut}
                className="btn-admin"
              >
                Cerrar Sesión
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
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
