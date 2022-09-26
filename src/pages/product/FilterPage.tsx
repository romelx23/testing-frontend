import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { LayoutProducts } from "../../components/layout/LayoutProducts";
import { ListProducts } from "../../components/products/ListProducts";
import {
  Accordion,
  FilterBrand,
  FilterCategory,
  FilterPrice,
  Loader,
} from "../../components/ui";
import { ProductContext } from "../../context/product";
import { useProducts } from "../../hooks";

export const FilterPage = () => {
  const { productFilter, productsFilter, clearFilter,filters } =
    useContext(ProductContext);
  const location = useLocation();
  // hook para obtener los productos
  const { products, loading } = useProducts();
  // estado para controlar los productos si se filtran o no
  const [productos, setProductos] = useState(products);
  // efecto para controlar los productos si se filtran o no
  
  const handleFilter =()=>{
    // if(filters.categories.length===0 && filters.brands.length===0  && filters.prices.min!==0){
    //   return;
    // }
    productFilter(products);
  }

  const cleanFilter = () => {
    setProductos(products);
    clearFilter();
  };

  useEffect(() => {
    setProductos(products);
  }, [products]);

  useEffect(() => {
    setProductos(productsFilter.length > 0 ? productsFilter : products);
    // setProductos(productsFilter);
  }, [productsFilter]);

  // si se cambia de ruta se limpia el filtro
  useEffect(() => {
    cleanFilter();
  }, [location]);

  return (
    <LayoutProducts>
      <div className="flex flex-col sm:flex-row">
        <div className="w-full min-h-full p-2 sm:w-96">
          <div className="flex flex-col">
            <div className="flex justify-between">
              <h1 className="text-2xl font-semibold">Filtros</h1>
              <button
                onClick={cleanFilter}
                className="text-base font-semibold
              btn hover:bg-blue-600"
              >
                Limpiar Filtros
                <i className="fas fa-filter"></i>
              </button>
            </div>
            <FilterCategory />
            <FilterBrand />
            <FilterPrice />
            {/* <Accordion title="Tamaño" active={active}>
              <h1>Chico</h1>
              <h1>Mediano</h1>
              <h1>Grande</h1>
            </Accordion> */}
          </div>
          <button
            onClick={handleFilter}
            className="btn w-full btn-add"
          >
            <h2>Filtrar Productos</h2>
          </button>
        </div>
        {loading ? (
          <div className="w-full flex justify-center">
            <Loader message="Cargando productos" />
          </div>
        ) : (
          <ListProducts title="Productos filtrados" productsProps={productos} />
        )}
      </div>
    </LayoutProducts>
  );
};
