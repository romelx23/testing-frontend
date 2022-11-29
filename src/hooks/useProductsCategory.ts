import { useState } from "react";
import { Producto, ProductsI } from "../interfaces";
import { baseUrl } from "../utils";

export const useProductsCategory = () => {
  const [products, setProducts] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(false);
  const handleProductsCategory = async (category: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${baseUrl}/api/products/categories/${category.toUpperCase()}`
      );
      const { products }: ProductsI = await response.json();
      console.log(response,'response 15');
      setProducts(products);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    products,
    loading,
    handleProductsCategory,
  };
};
