import { createContext } from 'react';
import { Producto } from '../../interfaces/product';

interface ContextProps{
    favorites:string[];
    products:Producto[];
    addFavorite: (id:string)=>void;
    getFavorites:()=>void;
    getProducts:(products:Producto[])=>void;
}

export const FavoriteContext=createContext({} as ContextProps)