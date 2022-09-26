import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ListProducts } from "../../components/products";
import { LayoutProducts } from "../../components/layout/LayoutProducts";
import { Banner, Loader } from "../../components/ui";
import { fetchSintoken } from "../../helpers";
import { Producto, ProductsI } from "../../interfaces/product";
import { useProducts, useProductsCategory } from "../../hooks";
const routesName = [
  {
    name: "Golosinas",
    path: "/categoria/golosinas",
  },
  {
    name: "Verduras",
    path: "/categoria/verduras",
  },
  {
    name: "Bebidas",
    path: "/categoria/bebidas",
  },
  {
    name: "Lejías",
    path: "/categoria/lejías",
  },
  {
    name: "Limpieza",
    path: "/categoria/limpieza",
  },
  {
    name: "Escobas",
    path: "/categoria/escobas",
  },
  {
    name: "Papeles",
    path: "/categoria/papeles",
  },
  {
    name: "Menestras",
    path: "/categoria/menestra",
  },
  {
    name: "Shampoos",
    path: "/categoria/Shampoo",
  },
  {
    name: "Cereales",
    path: "/categoria/cereales",
  },
  {
    name: "Frutas",
    path: "/categoria/frutas",
  },
];

export const CategoryPage = () => {
  // get the category from react-router-dom
  const category = useParams().category || "";
  const { pathname } = useLocation();
  const [title, setTitle] = useState("");
  const { products, loading, handleProductsCategory } = useProductsCategory();

  useEffect(() => {
    if (routesName)
      routesName.map((item) => {
        if (pathname.includes(item.path)) {
          setTitle(item.name);
        }
      });
  }, [pathname]);
  useEffect(() => {
    handleProductsCategory(category);
  }, [category]);
  return (
    <LayoutProducts>
      <Banner
        title={`Oferta del día`}
        description={`10% de descuento en ${title} en la tienda don pepito`}
      />
      {loading ? (
        <Loader message="Cargando productos" />
      ) : (
        <ListProducts
          productsProps={products}
          title={`Productos de la categoria: ${title}`}
        />
      )}
    </LayoutProducts>
  );
};
