import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LayoutProducts } from "../../components/layout/LayoutProducts";
import { Loader, Star, Toast, Zoom } from "../../components/ui";
import { CartContext } from "../../context/cart";
import { formatPrice } from "../../helpers";
import {
  ProductoId,
  Producto,
  ProductoCarrito,
} from "../../interfaces/product";
import { baseUrl } from "../../utils";
import { Market, MarketResponse } from "../../interfaces/market";
import { useStock } from "../../hooks";
import Swal from "sweetalert2";

const initMarket: Market = {
  _id: "",
  nombre: "",
  descripcion: "",
  nombrePropietario: "",
  telefono: 79846513,
  latitudDeBodega: 123456,
  longitudDeBodega: 132456465,
  h_inicio: "",
  h_final: "",
  youtube: "",
  Twitter: "",
  imagen: "",
  email: "",
  usuario: "",
  direccion: "",
};

export const DetailPage = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState<Producto>({} as Producto);
  const { addToCart, cart } = useContext(CartContext);
  const { increment, decrement, updateStock } = useStock();
  const currentProduct = cart.find((item) => item._id === id);
  const [cantidad, setCantidad] = useState(currentProduct?.cantidad || 1);
  const [showToast, setShowToast] = useState(false);
  const [market, setMarket] = useState(initMarket as Market);
  const addQuantity = () => {
    setCantidad(cantidad + 1);
    setProducto((producto) => ({ ...producto, stock: producto.stock - 1 }));
  };
  const removeQuantity = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
      setProducto((producto) => ({ ...producto, stock: producto.stock + 1 }));
    }
  };

  const addToCartHandler = (producto: Producto) => {
    // validar si el producto ya esta en el carrito
    if (currentProduct) {
      return Swal.fire({
        title: "Ya esta en el carrito",
        text: "Si Desea agregar mas productos a su carrito, retire el producto actual",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    }

    // validar que las bodegas sean iguales
    const bodegas = cart.filter((item) => item.bodega.nombre !== market.nombre);
    // console.log(bodegas);
    if (bodegas.length > 0) {
      return Swal.fire({
        title: "Aviso",
        text: "Los productos debe ser de la misma bodega",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    }
    if (cantidad > 0 && producto.stock >= cantidad) {
      setShowToast(true);
      const productoCarrito: ProductoCarrito = {
        ...producto,
        bodega: {
          ...market,
        },
        cantidad,
      };
      addToCart(productoCarrito);
      // actualiza el stock del carrito
      // updateStock(producto.stock - cantidad);
    }
  };

  const getProductId = async () => {
    try {
      const product = `${baseUrl}/api/products/${id}`;
      const resp = await fetch(product);
      const { producto, bodega }: ProductoId = await resp.json();
      if (producto.name) setProducto(producto);
      console.log(producto);
      if (bodega.nombre) setMarket(bodega);
      return producto;
    } catch (error) {
      console.log(error);
    }
  };

  const zoomArea = React.useRef<HTMLDivElement>(null);
  const zoomImg = React.useRef<HTMLImageElement>(null);
  const zoomAreaMove = (e: any) => {
    if (zoomArea.current) {
      let x = e.clientX - zoomArea.current.offsetLeft;
      let y = e.clientY - zoomArea.current.offsetTop;
      let mWidth = zoomArea.current.offsetWidth;
      let mHeight = zoomArea.current.offsetHeight;
      let clientX = (x / mWidth) * 200;
      let clientY = (y / mHeight) * 200;
      if (zoomImg.current) {
        zoomImg.current.style.transform = `translate(-${clientX}px, -${clientY}px) scale(1.3)`;
      }
    }
  };
  const zoomAreaOut = () => {
    // validar modo mobile
    if (zoomImg.current) {
      zoomImg.current.style.transform = `translate(0px, 0px) scale(1)`;
    }
  };

  useEffect(() => {
    getProductId();
  }, []);

  return (
    <LayoutProducts>
      <div className="py-3 flex flex-col lg:flex-row  min-h-[600px]">
        <div
          className="flex justify-center items-center w-full lg:w-1/2 min-h-full bg-[#23263b] overflow-hidden relative pointer-events-none md:pointer-events-auto"
          ref={zoomArea}
          onMouseMove={(e) => zoomAreaMove(e)}
          onMouseLeave={() => zoomAreaOut()}
        >
          <Zoom />
          <img
            src={
              producto.img
                ? producto.img
                : "https://www.giulianisgrupo.com/wp-content/uploads/2018/05/nodisponible.png"
            }
            alt="producto"
            placeholder="producto"
            loading="lazy"
            className="object-cover w-2/3 h-full"
            ref={zoomImg}
            width={300}
            height={300}
          />
        </div>
        {market.nombre ? (
          <div className="flex-1 flex flex-col items-start px-3 text-left">
            <h1 className="font-semibold text-xl">{producto.name}</h1>
            <p>
              {producto.description
                ? producto.description
                : "no hay descripcion"}
            </p>
            {/* <h2>raiting</h2> */}
            <Star start={4.5} />
            <div className="my-2 py-1 px-2 bg-[#3f52e8] text-white rounded-lg">
              {producto.category
                ? producto.category.name
                : "no hay categoria"}
            </div>
            <h2 className="text-red-700 font-bold text-xl">
              {formatPrice(producto.price)}
            </h2>
            <div className="w-full flex flex-wrap gap-2 my-2">
              <button
                onClick={() => removeQuantity()}
                className="btn hover:text-black"
              >
                -
              </button>
              <input
                type="number"
                className="text-center w-32"
                value={cantidad}
                readOnly={true}
                min={1}
                max={producto.stock ? producto.stock : 10}
                onChange={(e) => setCantidad(parseInt(e.target.value))}
              />
              <button
                onClick={() => addQuantity()}
                className="btn hover:text-black"
              >
                +
              </button>
            </div>
            {cantidad <= 0 && (
              <h1 className="text-red-600 font-semibold">
                La cantidad debe ser mayor que 0
              </h1>
            )}
            {producto.stock <= 0 && (
              <h1 className="text-red-600 font-semibold">
                El producto no esta disponible
              </h1>
            )}
            {producto.stock < cantidad && (
              <h1 className="text-red-600 font-semibold">
                No hay suficientes productos en stock para la cantidad
                solicitada
              </h1>
            )}
            <div className="w-full flex flex-wrap gap-2">
              <h1 className="font-semibold text-xl">
                cantidad de productos: {producto.stock}
              </h1>
            </div>
            <button
              onClick={() => addToCartHandler(producto)}
              className="btn-producto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <p className="font-semibold">Agregar al Carrito</p>
            </button>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-start px-3 text-left">
            <Loader message="Cargando Producto" width="w-full" />
          </div>
        )}
      </div>
      <div className="flex justify-between">
        <h1 className="font-semibold text-xl">
          Bodega {market ? market.nombre.toLocaleLowerCase() : "no hay bodega"}
        </h1>
        <Link to={market ? "/bodega/" + market._id : "/"}>
          <img
            src={
              market
                ? market.imagen
                : "https://www.giulianisgrupo.com/wp-content/uploads/2018/05/nodisponible.png"
            }
            alt={market ? market.nombre : "bodega"}
            title={market ? market.nombre : "bodega"}
            placeholder="bodega"
            loading="lazy"
            className="object-cover h-12 cursor-pointer"
          // onClick={() => navigate(`${market?'/bodega/'+ market._id:'/'}`)}
          />
        </Link>
      </div>
      <Toast
        show={showToast}
        onClose={(show: boolean) => setShowToast(show)}
        message="Se agrego al carrito"
        icon="fas fa-info-circle"
        positionY="bottom-3"
      />
    </LayoutProducts>
  );
};
