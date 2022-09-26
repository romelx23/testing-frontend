import React from "react";
import { LayoutProducts } from "../../components/layout/LayoutProducts";
import { ListProducts } from "../../components/products";
import { Banner, Loader } from "../../components/ui";
import { useProducts } from "../../hooks";

export const ProductsPage = () => {
  const { products, loading } = useProducts();
  return (
    <LayoutProducts>
      <Banner
        title="Abarrotes"
        description="20% de descuento en abarrotes en la tienda don pepito"
      />
      {loading ? (
        <Loader message="Cargando Productos" />
      ) : (
        <ListProducts title="Nuevos Productos" productsProps={products} />
      )}
    </LayoutProducts>
  );
};
