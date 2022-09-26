import { FC, useEffect, useReducer } from "react";
import { CartContext, CartReducer } from ".";
import { useStock } from "../../hooks";
import { ProductoCarrito } from "../../interfaces/product";
export interface Props {
  children: React.ReactNode;
}

export interface CartState {
  cart: ProductoCarrito[];
}

export const Cart_INITIAL_STATE: CartState = {
  cart: [],
};

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, Cart_INITIAL_STATE);

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      loadCartLocalStorage();
    }
  }, []);

  const { increment, decrement, updateStock } = useStock();

  const addToCart = (product: ProductoCarrito) => {
    if (state.cart.find((item) => item._id === product._id)) {
      console.log("ya existe");
      updateOrderLocalStorage(product._id, product);
      updateCart(product._id, product);
      return;
    }
    saveOrderLocalStorage(product);
    // incrementa el stock del producto en bd
    decrement(product._id,product.cantidad);
    console.log("bajo el stock");

    dispatch({
      type: "[Cart] - Add to cart",
      payload: {
        product,
      },
    });
  };

  const saveOrderLocalStorage = (producto: ProductoCarrito) => {
    const cart = [...state.cart, producto];
    // console.log(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const updateOrderLocalStorage = (id: string, product: ProductoCarrito) => {
    const cart = state.cart.map((item) => {
      // console.log(id,item._id);
      if (item._id === id) {
        return product;
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const deleteOrderLocalStorage = (id: string) => {
    const cart = state.cart.filter((item) => item._id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const loadCartLocalStorage = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    dispatch({
      type: "[Cart] - Load cart",
      payload: {
        cart,
      },
    });
  };

  const clearCartStorage = () => {
    localStorage.removeItem("cart");
  };

  const removeFromCart = (product: ProductoCarrito) => {
    const { _id: id, cantidad } = product;
    deleteOrderLocalStorage(id);
    // incrementar el stock del producto en bd
    increment(id, cantidad);
    dispatch({
      type: "[Cart] - Remove from cart",
      payload: {
        id,
      },
    });
  };
  const updateCart = (id: string, product: ProductoCarrito) => {
    // updateStock(id, product.cantidad);
    dispatch({
      type: "[Cart] - Update from cart",
      payload: {
        id,
        product,
      },
    });
  };

  const clearCart = () => {
    // reponer el stock de los productos en bd
    state.cart.forEach((item) => {
      increment(item._id, item.cantidad);
    });
    dispatch({
      type: "[Cart] - Clear cart",
    });
    clearCartStorage();
  };

  const removeUniteLocalStorage = (id: string) => {
    const cart = state.cart.map((item) => {
      if (item._id === id) {
        return { ...item, cantidad: item.cantidad - 1 };
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const addUniteLocalStorage = (id: string) => {
    const cart = state.cart.map((item) => {
      if (item._id === id) {
        return { ...item, cantidad: item.cantidad + 1 };
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const handleMore = (product: ProductoCarrito) => {
    const { _id: id } = product;
    addUniteLocalStorage(id);
    decrement(id, 1);
    dispatch({
      type: "[Cart] - Add Quantity cart",
      payload: {
        id,
      },
    });
  };

  const handleRemove = (product: ProductoCarrito) => {
    const { _id: id } = product;
    removeUniteLocalStorage(id);
    increment(id, 1);
    dispatch({
      type: "[Cart] - Remove Quantity cart",
      payload: {
        id,
      },
    });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateCart,
        clearCart,
        handleMore,
        handleRemove,
        saveOrderLocalStorage,
        loadCartLocalStorage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
