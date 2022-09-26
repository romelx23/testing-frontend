import { CartState } from "./CartProvider";
import { ProductoCarrito } from "../../interfaces/product";

type CartActionType =
  | { type: "[Cart] - Add to cart"; payload: { product: ProductoCarrito } }
  | { type: "[Cart] - Remove from cart"; payload: { id: string } }
  | { type: "[Cart] - Add Quantity cart"; payload: { id: string } }
  | { type: "[Cart] - Remove Quantity cart"; payload: { id: string } }
  | {
      type: "[Cart] - Update from cart";
      payload: { id: string; product: ProductoCarrito };
    }
  | { type: "[Cart] - Clear cart" }
  | { type: "[Cart] - Load cart"; payload: { cart: ProductoCarrito []} };

export const CartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case "[Cart] - Add to cart":
      return {
        ...state,
        cart: [...state.cart, action.payload.product],
      };
    case "[Cart] - Remove from cart":
      return {
        ...state,
        cart: state.cart.filter((product) => product._id !== action.payload.id),
      };
    case "[Cart] - Update from cart":
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id === action.payload.id) {
            return action.payload.product;
          }
          return product;
        }),
      };
    case "[Cart] - Clear cart":
      return {
        ...state,
        cart: [],
      };
    case "[Cart] - Add Quantity cart":
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id === action.payload.id) {
            product.cantidad += 1;
            console.log(product)
          }
          return product;
        }),
      };
    case "[Cart] - Remove Quantity cart":
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id === action.payload.id) {
            if (product.cantidad === 1) {
              return product;
            } else {
              console.log(product)
              product.cantidad -= 1;
              console.log(product)
            }
          }
          return product;
        }),
      };
    case "[Cart] - Load cart":
      return {
        ...state,
        cart: action.payload.cart,
      };

    default:
      return state;
  }
};
