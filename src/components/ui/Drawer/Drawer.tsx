import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import { UIContext } from "../../../context/ui/UIContext";
import { ButtonToggle } from "../Button/ButtonToggle";
import { AuthContext } from "../../../context/auth";

export const Drawer = () => {
  const { ToggleMenu, toggleMenu } = useContext(UIContext);
  const { user } = useContext(AuthContext);
  // if screen is mobile, then hide the drawer

  return (
    <div
      className={`container-drawer ${ ToggleMenu ? "drawer-show" : "drawer-hidden"
        } z-20 overflow-y-auto`}
    >
      <div className="flex w-full justify-between sm:justify-center sm:space-x-4">
        <Logo />
        <div className="block sm:hidden text-white">
          <ButtonToggle />
        </div>
      </div>
      <h1
        className="text-white font-semibold mt-3 w-full text-left
      "
      >
        Usuario
      </h1>
      <NavLink
        to="/user/profile"
        title="Perfil"
        id="perfil"
        className="drawer-item"
        style={{ textDecoration: "none" }}
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
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="font-bold">Usuario</p>
      </NavLink>
      <NavLink
        to="/user/dashboard"
        title="Dashboard"
        id="Dashboard"
        className="drawer-item"
        style={{ textDecoration: "none" }}
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
            d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
          />
        </svg>
        <p className="font-bold">Menú</p>
      </NavLink>
      <NavLink
        to="/user/orders"
        title="Boletas"
        id="boletas"
        className="drawer-item"
        style={{ textDecoration: "none" }}
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
            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p className="font-bold">Pedidos</p>
      </NavLink>

      {/* {user.role.name === "ADMIN_ROLE" && ( */}
      <>
        <h1
          className="text-white font-semibold mt-3 w-full text-left
      "
        >
          Admin
        </h1>
        <NavLink

          to="/admin"
          title="Admin"
          id="admin"
          className="drawer-item items-center"
          style={{ textDecoration: "none" }}
        >
          <i className="fas fa-user-shield"></i>
          <p className="font-bold">Admin</p>
        </NavLink>
        <NavLink

          to="/admin/products"
          title="Admin Productos"
          id="admin-productos"
          className="drawer-item items-center"
          style={{ textDecoration: "none" }}
        >
          <i className="fas fa-user-shield"></i>
          <p className="font-bold text-overflow w-32">Admin Productos</p>
        </NavLink>
        <NavLink

          to="/admin/category"
          title="Admin Categorias"
          id="admin-categorias"
          className="drawer-item items-center"
          style={{ textDecoration: "none" }}
        >
          <i className="fas fa-user-shield"></i>
          <p className="font-bold text-overflow w-32">Admin Categorias</p>
        </NavLink>
        <NavLink

          to="/admin/marcas"
          title="Gestionar Marcas"
          id="gestionar-marcas"
          className="drawer-item items-center"
          style={{ textDecoration: "none" }}
        >
          <i className="fas fa-user-shield"></i>
          <p className="font-bold text-overflow w-32">Admin Marcas</p>
        </NavLink>
        <NavLink

          to="/admin/proveedores"
          title="Admin Usuarios"
          id="admin-usuarios"
          className="drawer-item items-center"
          style={{ textDecoration: "none" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
          </svg>

          <p className="font-bold text-overflow w-32">Admin Proovedores</p>
        </NavLink>
        <NavLink

          to="/admin/ordenes"
          title="Admin Usuarios"
          id="admin-usuarios"
          className="drawer-item items-center"
          style={{ textDecoration: "none" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
          </svg>

          <p className="font-bold text-overflow w-32">Admin Ordenes</p>
        </NavLink>
        <NavLink

          to="/admin/user"
          title="Admin Usuarios"
          id="admin-usuarios"
          className="drawer-item items-center"
          style={{ textDecoration: "none" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
          </svg>

          <p className="font-bold text-overflow w-32">Admin Usuarios</p>
        </NavLink>
      </>
      {/* )} */}
      {user.role.name === "BODEGUERO_ROLE" && (
        <>
          <h1
            className="text-white font-semibold mt-3 w-full text-left
      "
          >
            Bodeguero
          </h1>
          <NavLink
            onClick={() => {
              toggleMenu(false);
            }}
            to="/gestion/productos"
            title="Gestionar Productos"
            id="gestionar-productos"
            className="drawer-item items-center"
            style={{ textDecoration: "none" }}
          >
            <i className="fas fa-user-shield"></i>
            <p className="font-bold text-overflow w-32 text-left">G. Productos</p>
          </NavLink>
          <NavLink
            onClick={() => {
              toggleMenu(false);
            }}
            to="/gestion/categorias"
            title="Gestionar Categorias"
            id="gestionar-categorias"
            className="drawer-item items-center"
            style={{ textDecoration: "none" }}
          >
            <i className="fas fa-user-shield"></i>
            <p className="font-bold text-overflow w-32 text-left">G. Categorias</p>
          </NavLink>
          <NavLink
            onClick={() => {
              toggleMenu(false);
            }}
            to="/gestion/marcas"
            title="Gestionar Marcas"
            id="gestionar-marcas"
            className="drawer-item items-center"
            style={{ textDecoration: "none" }}
          >
            <i className="fas fa-user-shield"></i>
            <p className="font-bold text-overflow w-32 text-left">G. Marcas</p>
          </NavLink>
          <NavLink
            onClick={() => {
              toggleMenu(false);
            }}
            to="/gestion/bodega"
            title="Gestionar Bodega"
            id="gestionar-bodega"
            className="drawer-item items-center"
            style={{ textDecoration: "none" }}
          >
            <i className="fas fa-user-shield"></i>
            <p className="font-bold text-overflow w-32 text-left">G. Bodega</p>
          </NavLink>
          <NavLink
            onClick={() => {
              toggleMenu(false);
            }}
            to="/gestion/pedidos"
            title="Gestionar Pedidos"
            id="gestionar-pedidos"
            className="drawer-item items-center"
            style={{ textDecoration: "none" }}
          >
            <i className="fas fa-user-shield"></i>
            <p className="font-bold text-overflow w-32 text-left">G. Pedidos</p>
          </NavLink>
          <NavLink
            onClick={() => {
              toggleMenu(false);
            }}
            to="/dashboard/pedidos"
            title="Boletas"
            id="Boletas"
            className="drawer-item"
            style={{ textDecoration: "none" }}
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
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="font-bold">Dashboard Pedidos</p>
          </NavLink>
        </>
      )}

      <h1
        className="text-white font-semibold mt-3 w-full text-left
      "
      >
        General
      </h1>
      <NavLink
        to="/user/configure"
        title="Configuracion"
        className="drawer-item"
        style={{ textDecoration: "none" }}
      >
        <svg
          fill="#ffffff"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24px"
          height="24px"
        >
          <path d="M 9.6660156 2 L 9.1757812 4.5234375 C 8.3516137 4.8342536 7.5947862 5.2699307 6.9316406 5.8144531 L 4.5078125 4.9785156 L 2.171875 9.0214844 L 4.1132812 10.708984 C 4.0386488 11.16721 4 11.591845 4 12 C 4 12.408768 4.0398071 12.832626 4.1132812 13.291016 L 4.1132812 13.292969 L 2.171875 14.980469 L 4.5078125 19.021484 L 6.9296875 18.1875 C 7.5928951 18.732319 8.3514346 19.165567 9.1757812 19.476562 L 9.6660156 22 L 14.333984 22 L 14.824219 19.476562 C 15.648925 19.165543 16.404903 18.73057 17.068359 18.185547 L 19.492188 19.021484 L 21.826172 14.980469 L 19.886719 13.291016 C 19.961351 12.83279 20 12.408155 20 12 C 20 11.592457 19.96113 11.168374 19.886719 10.710938 L 19.886719 10.708984 L 21.828125 9.0195312 L 19.492188 4.9785156 L 17.070312 5.8125 C 16.407106 5.2676813 15.648565 4.8344327 14.824219 4.5234375 L 14.333984 2 L 9.6660156 2 z M 11.314453 4 L 12.685547 4 L 13.074219 6 L 14.117188 6.3945312 C 14.745852 6.63147 15.310672 6.9567546 15.800781 7.359375 L 16.664062 8.0664062 L 18.585938 7.40625 L 19.271484 8.5917969 L 17.736328 9.9277344 L 17.912109 11.027344 L 17.912109 11.029297 C 17.973258 11.404235 18 11.718768 18 12 C 18 12.281232 17.973259 12.595718 17.912109 12.970703 L 17.734375 14.070312 L 19.269531 15.40625 L 18.583984 16.59375 L 16.664062 15.931641 L 15.798828 16.640625 C 15.308719 17.043245 14.745852 17.36853 14.117188 17.605469 L 14.115234 17.605469 L 13.072266 18 L 12.683594 20 L 11.314453 20 L 10.925781 18 L 9.8828125 17.605469 C 9.2541467 17.36853 8.6893282 17.043245 8.1992188 16.640625 L 7.3359375 15.933594 L 5.4140625 16.59375 L 4.7285156 15.408203 L 6.265625 14.070312 L 6.0878906 12.974609 L 6.0878906 12.972656 C 6.0276183 12.596088 6 12.280673 6 12 C 6 11.718768 6.026742 11.404282 6.0878906 11.029297 L 6.265625 9.9296875 L 4.7285156 8.59375 L 5.4140625 7.40625 L 7.3359375 8.0683594 L 8.1992188 7.359375 C 8.6893282 6.9567546 9.2541467 6.6314701 9.8828125 6.3945312 L 10.925781 6 L 11.314453 4 z M 12 8 C 9.8034768 8 8 9.8034768 8 12 C 8 14.196523 9.8034768 16 12 16 C 14.196523 16 16 14.196523 16 12 C 16 9.8034768 14.196523 8 12 8 z M 12 10 C 13.111477 10 14 10.888523 14 12 C 14 13.111477 13.111477 14 12 14 C 10.888523 14 10 13.111477 10 12 C 10 10.888523 10.888523 10 12 10 z" />
        </svg>
        <p className="font-bold">Configuración</p>
      </NavLink>
    </div>
  );
};
