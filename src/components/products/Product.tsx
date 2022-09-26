import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ProductI, Producto, ProductoCarrito } from "../../interfaces/product";
import { formatPrice } from "../../helpers/format";
import { FavoriteContext } from "../../context/favorite";
import { AuthContext } from "../../context/auth";
import { CartContext } from "../../context/cart";
import Swal from "sweetalert2";
interface Props {
  // product: ProductI;
  product: Producto;
}

export const Product: FC<Props> = ({ product }) => {
  const { nombre, precio, descripcion, img, _id, bodega, stock } = product;
  const { addFavorite, favorites} = useContext(FavoriteContext);
  const { addToCart,cart } = useContext(CartContext);
  const [favorite, setFavorite] = useState(false);
  const { user } = useContext(AuthContext);
  const { pathname } = useLocation();
  const path = `/${pathname.split("/")[1]}/${pathname.split("/")[2]}/${
    pathname.split("/")[3]
  }`;
  // console.log(path);
  const toggleFavorite = () => {
    // si esta incluido en los favoritos pintar el icono de favorito
    setFavorite(!favorite);
    addFavorite(_id);
  };
  useEffect(() => {
    if (favorites.includes(_id)) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  }, []);

  const handleAddTocart = () => {
    // validar que las bodegas sean iguales
    const bodegas = cart.filter((item) => item.bodega.nombre!==bodega.nombre);
    // console.log(bodegas);
    if (bodegas.length > 0) {
      return Swal.fire({
        title: "Aviso",
        text: "Los productos debe ser de la misma bodega",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    }
    // generar el pedido y actualizarlo 
    if (stock > 0) {
      Swal.fire({
        title: "¿Desea agregar este producto al carrito?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.value) {
          const productoCarrito: ProductoCarrito = {
            ...product,
            bodega: {
              ...bodega,
            },
            cantidad: 1,
          };
          addToCart(productoCarrito);
          Swal.fire("Producto agregado", "", "success");
        }
      });
    } else {
      Swal.fire({
        title: "No hay stock",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="btn-product relative" title={nombre}>
      {user.rol == "BODEGUERO_ROLE" &&
      path === "/gestion/pedidos/actualizar" ? (
        <input
          type="checkbox"
          className="checkbox"
          id={_id}
          onChange={() => {}}
        />
      ) : (
        <button onClick={toggleFavorite} className="btn-favorite">
          {favorite ? (
            <i className="fas fa-heart"></i>
          ) : (
            <i className="far fa-heart"></i>
          )}
        </button>
      )}
      <button onClick={handleAddTocart} className="btn-cart">
        <i className="fas fa-shopping-cart"></i>
      </button>
      <label htmlFor={_id} className="btn-select-label">
        <Link
          to={`/home/${_id}`}
          className={`card__product w-[260px] ${
            user.rol == "BODEGUERO_ROLE" &&
            path === "/gestion/pedidos/actualizar"
              ? "sm:w-[260px] pointer-events-none"
              : "sm:w-[332px]"
          } p-5 py-8`}
        >
          <img
            src={
              img
                ? img
                : "https://www.giulianisgrupo.com/wp-content/uploads/2018/05/nodisponible.png"
            }
            alt="producto"
            className="img-product"
            style={{ width: "" }}
          />
          <div className="w-full text-left pt-2">
            <h1 className="font-bold text-xl">{nombre}</h1>
            <p>{descripcion}</p>
            <p>{formatPrice(precio)}</p>
          </div>
          <div className="w-full text-left pt-2 flex items-center">
            <img
              alt={bodega.nombre}
              src={bodega.imagen}
              className="h-10 object-cover mr-2"
            />
            <p>{bodega.nombre}</p>
          </div>
        </Link>
      </label>
    </div>
  );
};
