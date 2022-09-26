import { createContext } from 'react';
import { ProductoCarrito } from '../../interfaces/product';

interface ContextProps{
        cart: ProductoCarrito[];
        addToCart: (product: ProductoCarrito) => void;
        removeFromCart: (product: ProductoCarrito) => void;
        updateCart: (id: string, product: ProductoCarrito) => void;
        clearCart: () => void;
        handleMore:(product: ProductoCarrito)=>void;
        handleRemove:(product: ProductoCarrito)=>void;
        saveOrderLocalStorage: (producto: ProductoCarrito) => void;
        loadCartLocalStorage: () => void;
}

export const CartContext=createContext({} as ContextProps)