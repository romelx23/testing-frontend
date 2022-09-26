import { useEffect, useState } from "react";
import { CategoryI, CategoryResponse } from "../interfaces";
import { baseUrl } from "../utils";

export const useCategories = () => {
  const url = `${baseUrl}/api/categorias?desde=0&limit=20`;
  const [categories, setCategories] = useState<CategoryI[]>([]);
  const [loading, setLoading] = useState(false);
  const getCategories = async () => {
    setLoading(true);
    const response = await fetch(url);
    const { categorias }: CategoryResponse = await response.json();
    // console.log(categorias);
    setCategories(categorias);
    setLoading(false);
  };
  useEffect(() => {
    getCategories();
  }, []);
  return {
    categories,
    setCategories,
    loading,
    getCategories,
  };
};
