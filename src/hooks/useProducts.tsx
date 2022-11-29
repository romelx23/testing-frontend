import { useEffect, useState } from "react";
import { Producto, ProductsI } from "../interfaces/product";
import { baseUrl } from "../utils";

export const useProducts = () => {
  const url = `${baseUrl}/api/products?limit=10`;
  const [products, setProducts] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const { products }: ProductsI = await response.json();
      console.log(products, "response 14");
      // console.log(productos);
      setProducts(products);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchData();
  }, [])
  return {
    products,
    setProducts,
    loading,
    fetchData
  }
};
