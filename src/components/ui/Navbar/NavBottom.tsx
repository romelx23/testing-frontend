import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { UIContext } from "../../../context/ui";
import { getCategories } from "../../../helpers/products";
import { Categoria } from "../../../interfaces";
import { Modal } from "../Modal/Modal";

export const NavBottom = () => {
  const [categories, setCategories] = useState<Categoria[]>([]);
  const { toggleModal } = useContext(UIContext);
  useEffect(() => {
    getCategories()
      .then((res) => {
        setCategories(res.categorias);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
    <div className="flex gap-3 relative flex-wrap sm:flex-nowrap">
      <NavLink
      title="Buscar Productos"
        to="/home/categorias"
        className="link-category text-sm md:text-base w-full text-center sm:w-72 sm:h-10"
      >
        Buscar Productos
      </NavLink>
      <div className="w-full h-9 md:h-auto">
        <div className="navbottom-cateogries w-full sm:w-auto">
          <button
            onClick={() => {
              toggleModal(true);
            }}
            className="p-2 md:hidden mb-1 text-sm md:text-base w-full"
          >
            Categorías
          </button>
          {categories.map((category) => (
            <NavLink
              key={category._id}
              title={category.nombre}
              to={`/home/categoria/${category.nombre.toLocaleLowerCase()}`}
              className="link-category"
              onClick={() => {
                toggleModal(false);
              }}
            >
              {category.nombre}
            </NavLink>
          ))}
          {/* <Link
            to="/home/categoria/diario"
            className="link-category"
            style={{ color: "#000", textDecoration: "none" }}
          >
            Alimentos del Día
          </Link>
          */}
        </div>
      </div>
    </div>
    <div className="md:hidden">
    <Modal>
      <div className="flex flex-col h-64 overflow-y-auto w-60">
        {categories.map((category) => (
          <NavLink
            key={category._id}
            title={category.nombre}
            to={`/home/categoria/${category.nombre.toLocaleLowerCase()}`}
            className="link-category"
          >
            {category.nombre}
          </NavLink>
        ))}
      </div>
    </Modal>
    </div>
    </>
  );
};
