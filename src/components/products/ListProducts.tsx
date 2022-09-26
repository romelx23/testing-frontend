import React, { FC, useContext, useEffect, useState } from "react";
import { Product } from "./Product";
import { Producto } from "../../interfaces/product";
import { useProducts } from "../../hooks";
interface Props {
  title?: string;
  productsProps?: Producto[];
  quantity?: number;
  topTitle?: string;
}

export const ListProducts: FC<Props> = ({
  title,
  productsProps,
  quantity,
  topTitle,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [numberPage, setNumberPage] = useState(1);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const { products } = useProducts();
  const [productos, setProductos] = useState(products);
  const quantityForPage = quantity ? quantity : 10;

  const nextPage = () => {
    if (productsProps) {
      if (
        productsProps.filter((producto) =>
          producto.nombre.toLowerCase().includes(search.toLowerCase())
        ).length >
        currentPage + quantityForPage
      ) {
        setCurrentPage(currentPage + quantityForPage);
        setNumberPage(numberPage + 1);
      }
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - quantityForPage);
      setNumberPage(numberPage - 1);
      // console.log("prevPage");
    }
  };

  const filteredProducts = () => {
    if (productsProps !== undefined) {
      if (search.length === 0) {
        return productsProps.slice(currentPage, currentPage + quantityForPage);
      }
      const filtered = productsProps.filter((producto) =>
        producto.nombre.toLowerCase().includes(search.toLowerCase())
      );
      return filtered.slice(currentPage, currentPage + quantityForPage);
    }
  };

  const searchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCurrentPage(0);
    setNumberPage(1);
    setInput(value);
    // setSearch(value);
  };

  useEffect(() => {
    setProductos(filteredProducts() || []);
    // console.log("filterProducts");
  }, [currentPage, search, productsProps]);

  useEffect(() => {
    setCurrentPage(0);
    setNumberPage(1);
    // console.log("currentPage");
  }, [productsProps]);

  return (
    <div className="w-full pt-2">
      {
        topTitle && (
          <h1 className="text-2xl font-semibold text-left pb-2">{topTitle}</h1>
        )
      }
      <div className="flex justify-between md:flex-row flex-col">
        {!topTitle && (
          <h1 className="text-2xl font-bold text-left mb-3 ml-3">
            {title ? title : "Nuevos Productos"}
          </h1>
        )}
        <div className={`flex justify-end mb-2 ${topTitle&&'w-full'}`}>
          <input
            className="w-full py-2 px-3 rounded-lg border-2 border-gray-300"
            type="text"
            placeholder="Buscar"
            value={input}
            onChange={searchProduct}
            onKeyDown={(e: any) => {
              if (e.key === "Enter") {
                setSearch(e.target.value);
              }
            }}
          />
          {/* fontawesome icon search */}
          <button
            onClick={() => {
              setSearch(input);
            }}
            className="bg-blue-800 rounded-full ml-1"
          >
            <i className="fas fa-search text-gray-500 m-auto p-3.5"></i>
          </button>
        </div>
        <p className="text-sm text-blue-600 sm:hidden">
          <b>Nota:</b> para listar todos los productos, borre la busqueda y haga
          enter
        </p>
      </div>
      <div className="grid-products">
        {productsProps
          ? productos.map((product) => (
              <Product key={product._id} product={product} />
            ))
          : productos.map((product) => (
              <Product key={product._id} product={product} />
            ))}
        {productos.length > 0 ? (
          <></>
        ) : (
          <div className="flex flex-col justify-center items-center opacity-60 min-h-[50vh]">
            <h1 className="font-extralight">No se encontraron productos</h1>
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="mt-4"></div>
      <nav aria-label="flex">
        <ul className="inline-flex -space-x-px">
          <li
            onClick={prevPage}
            className={`btn-prev
                ${currentPage > 0 && "disabled:bg-gray-300"}
                `}
          >
            Atrás
          </li>
          {/* número de página */}
          <li className="text-center flex items-center px-2">
            { numberPage } de {Math.ceil(productsProps?productsProps?.length / quantityForPage:0)}
          </li>
          <li className="btn-next" onClick={nextPage}>
            Adelante
          </li>
        </ul>
      </nav>
    </div>
  );
};
