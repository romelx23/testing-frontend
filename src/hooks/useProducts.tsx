import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth";
import { Producto, ProductsI } from "../interfaces/product";
import { baseUrl } from "../utils";

export const useProducts = () => {
  const {user}=useContext(AuthContext);
  const url =`${baseUrl}/api/productos?limite=5`;
  const urlMarket = `${baseUrl}/api/productos/user/${user.uid}`;
  const [products, setProducts] = useState<Producto[]>([]);
  const [productsMarket, setProductsMarket] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
   try {
    setLoading(true);
    const response = await fetch(url);
    const { productos }: ProductsI = await response.json();
    // console.log(productos);
    setProducts(productos);
    setLoading(false);
   } catch (error) {
    console.log(error);
   }
  };
  const fetchDataMarket = async () => {
   try {
    setLoading(true);
    const response = await fetch(urlMarket);
    const { productos }: ProductsI = await response.json();
    // console.log(productos);
    setProductsMarket(productos);
    setLoading(false);
   } catch (error) {
    console.log(error);
   }
  }

  useEffect(() => {
    fetchData();
    fetchDataMarket();
  }, [])
  return {
    products,
    setProducts,
    loading,
    fetchData,
    productsMarket,
    setProductsMarket,
    fetchDataMarket
  }
};
