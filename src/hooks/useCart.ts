import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../context/auth";
import { CartContext } from "../context/cart";
import { fetchContoken } from "../helpers";
import {
  OrderResponse,
  PedidoByIdResponse,
  ProductoCarrito,
} from "../interfaces";

export const useCart = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    handleMore,
    handleRemove,
    addToCart,
    clearCart,
  } = useContext(CartContext);
  const getProductsCart = async () => {
    try {
      const resp = await fetchContoken(`api/pedido/status/carrito`, {}, "GET");
      const {
        success,
        data: { productos, pedido },
      }: PedidoByIdResponse = await resp?.json();
      const { bodega } = pedido[0];
      if (success) {
        productos.map((product) => {
          const { cantidad, producto } = product;
          const productoCarrito: ProductoCarrito = {
            ...producto,
            bodega: {
              ...bodega,
            },
            cantidad,
          };
          // cart.push(productoCarrito);
          addToCart(productoCarrito);
        }),
          Swal.fire({
            icon: "success",
            title: "¡Listo!",
            text: "¡Tu carrito se ha actualizado!",
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const generateOrder = async () => {
    console.log(user.name,total,cart);
    // actualiza el estado del pedido a ordenado
    const resp = await fetchContoken(
      `api/pedido`,
      {
        nombre: user.name,
        importe: total,
        fecha: new Date(),
        productos: cart,
        status: "ordenado",
      },
      "POST"
    );
    const data: OrderResponse = await resp!.json();
    console.log(data, "data");
    if (data.success) {
      Swal.fire({
        title: "Pedido generado",
        text: "El pedido se ha generado correctamente",
        icon: "success",
        confirmButtonText: "Ok",
      });
    }
    if (data.success === false) {
      Swal.fire({
        title: "Error",
        text: "El pedido no se ha generado correctamente",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    }
  };

  const handleOrder = () => {
    // validar que las bodegas sean iguales
    const bodega = cart.map((item) => item.bodega.nombre);
    // console.log(bodega);
    const bodegaUnica = [...new Set(bodega)];
    if (bodegaUnica.length > 1) {
      Swal.fire({
        title: "Error",
        text: "Los productos debe ser de la misma bodega",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    }
    if (bodegaUnica.length === 1) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Deseas generar el pedido?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, generar pedido",
        cancelButtonText: "No, cancelar",
      })
        .then((result) => {
          if (result.value) {
            generateOrder();
            clearCart();
            navigate("/home/respuesta?status=realizado");
          }
        })
        .catch(() => {
          Swal.fire({
            title: "Cancelado",
            text: "El pedido no se ha generado",
            icon: "warning",
            confirmButtonText: "Ok",
          });
        });
    }
  };
  const total = cart.reduce(
    (total, product) => total + product.price * product.cantidad,
    0
  );

  const handleCancel = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas cancelar el pedido?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, cancelar pedido",
      cancelButtonText: "No, cancelar",
    })
      .then((result) => {
        if (result.value) {
          clearCart();
          navigate("/home/respuesta?status=cancelado");
        }
      })
      .catch(() => {
        Swal.fire({
          title: "Cancelado",
          text: "El pedido no se ha cancelado",
          icon: "warning",
          confirmButtonText: "Ok",
        });
      });
  };

  return {
    cart,
    removeFromCart,
    handleMore,
    handleRemove,
    handleOrder,
    total,
    getProductsCart,
    handleCancel,
  };
};
