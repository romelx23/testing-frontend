import { FC, useReducer } from "react";
import { FavoriteContext, FavoriteReducer } from ".";
import { useProducts } from "../../hooks";
import { Producto } from '../../interfaces/product';
import { products } from '../../data/products';

interface Props {
  children: React.ReactNode;
}

export interface FavoriteState {
  favorites: string[];
  products:Producto[]
}

export const Favorite_INITIAL_STATE: FavoriteState = {
  favorites: [],
  products:[]
};

export const FavoriteProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(FavoriteReducer, Favorite_INITIAL_STATE);
  const getProducts=(products:Producto[])=>{
    // obtener productos favoritos de la base de datos
    dispatch({
      type: '[Favorite] - Get Products',
      payload: products
    });
  }
  const getFavorites = () => {
    const favorites:string[]=JSON.parse(localStorage.getItem("favorites")||"[]");
    dispatch({ type: "[Favorite] - Get favorite", payload: favorites });

  };
  const addFavorite = (id: string) => {
    if (state.favorites.includes(id)) {
      // filter productos que tengan el mismo id
      removeFavorite(id);
      return;
    }
    dispatch({
      type: "[Favorite] - Add to favorite",
      payload: { id },
    });
    // add local
    localStorage.setItem("favorites", JSON.stringify([...state.favorites, id]));
  };
  const removeFavorite = (id: string) => {
    const favorites:string[]=JSON.parse(localStorage.getItem("favorites")||"[]");
    dispatch({
      type: "[Favorite] - Remove from favorite",
      payload: { id },
    });
    // remove local
    localStorage.setItem("favorites", JSON.stringify(favorites.filter(f=>f!==id)));
    // localStorage.setItem("favorites", JSON.stringify(state.favorites));
  }
  return (
    <FavoriteContext.Provider
      value={{
        ...state,
        addFavorite,
        getFavorites,
        getProducts
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
