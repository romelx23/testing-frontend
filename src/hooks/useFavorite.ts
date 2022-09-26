import { useContext, useState } from "react";
import { AuthContext } from "../context/auth";
import { fetchContoken } from "../helpers";
import { FavoriteI, Producto } from "../interfaces";

// hook para obtener los favoritos del usuario y guardarlos en la base de datos
export const useFvorite = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState<Producto[]>([]);
  const addFavorite = async (id: string) => {
    try {
      const res = await fetchContoken(`api/productos/favorite/${id}`, {}, "POST");
    } catch (error) {
      console.log(error);
    }
  };

  const getFavorites = async () => {
    try {
      const response = await fetchContoken(
        `api/productos/favorite/${user.uid}`,
        {},
        "GET"
      );
      const { productos }: FavoriteI = await response?.json();
      setFavorites(productos);
    } catch (error) {
      console.log(error);
    }
  };
  
  return {
    favorites,
    getFavorites,
    addFavorite,
  };
};
