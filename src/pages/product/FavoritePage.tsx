import React, { useContext, useEffect, useState } from "react";
import { LayoutProducts } from "../../components/layout/LayoutProducts";
import { ListProducts } from "../../components/products";
import { FavoriteContext } from "../../context/favorite";
import { useProducts } from "../../hooks";
import { Producto } from "../../interfaces/product";

export const FavoritePage = () => {
  const { favorites } = useContext(FavoriteContext);
  const {products}=useProducts();
  const [favorite, setFavorite] = useState<Producto[]>([]);
  const {getFavorites}=useContext(FavoriteContext);
  useEffect(()=>{
    getFavorites();
  },[]);
  useEffect(() => {
    setFavorite(products.filter((product) => favorites.includes(product._id)));
  }, [products]);

  return (
    <LayoutProducts>
      {favorite.length > 0 ? (
        <ListProducts title="Productos Favoritos" productsProps={favorite} />
      ) : (
        <div className="p-2 w-full min-h-[68vh] flex justify-center items-center">
          <div className="flex flex-col items-center opacity-60">
            <h1 className="font-extralight">No Has Añadido Favoritos</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
        </div>
      )}
    </LayoutProducts>
  );
};
