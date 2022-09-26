import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { LayoutProducts } from "../../components/layout/LayoutProducts";
import { formatPrice } from "../../helpers/format";
import { useCart, usePaginate } from "../../hooks";
import { ProductoCarrito } from "../../interfaces";

export const PaymentPage = () => {
  const {cart,removeFromCart,handleRemove,handleMore,handleOrder,handleCancel,total}=useCart();
  const { currentPage, items, nextPage, prevPage, numberPage, numberLastPage } =
    usePaginate(cart);
    const navigate=useNavigate();
  const handlePrint = () => {
    // imprime el contenido del div
    window.print();
  };
  
  useEffect(() => {
    console.log(cart);
  }, []);

  const handleAddItem=(producto:ProductoCarrito)=>{
    Swal.fire({
      title: "Ya esta en el carrito",
      text: "Si Desea agregar mas productos a su carrito, vaya al producto actual",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ir al producto actual",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.value) {
        navigate(`/home/${producto._id}`);
      }
    }
    );
  }

  return (
    <LayoutProducts>
      <h1 className="py-2 text-xl font-bold">Realice su Pedido</h1>
      <h1 className="text-left mb-2 text-xl font-bold ml-6">Lista de Pedido</h1>
      {cart.length > 0 ? (
        <div className="table-content">
          <div
            className="align-middle inline-block min-w-full shadow overflow-hidden bg-gray-900 shadow-dashboard 
        print:shadow-none px-8 pt-3 rounded-lg min-h-[55vh] print:bg-black print:px-0 print:pl-6 print:break-before-avoid-page"
          >
            <table className="min-w-full print:overflow-hidden">
              <thead>
                <tr>
                  <th className="th">ID</th>
                  <th className="th">Nombre</th>
                  <th className="th">Precio</th>
                  <th className="th">Descripción</th>
                  <th className="th">Imagen</th>
                  <th className="th">Bodega</th>
                  <th className="th">Cantidad</th>
                  {
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-white print:border-none">
                      <button
                        onClick={handlePrint}
                        className="btn border-cyan-500 text-cyan-500 hover:bg-cyan-700 print:hidden"
                      >
                        Imprimir Boleta
                      </button>
                    </th>
                  }
                </tr>
              </thead>
              <tbody className="">
                {items.map((producto, i) => (
                  <tr
                    className="font-semibold text-lg border-b border-gray-500 print:border-none"
                    key={producto._id}
                  >
                    <td className="px-6 py-4 whitespace-no-wrap">
                      <div className="flex items-center">
                        <div>
                          <div className=" leading-5 text-white">{i + 1}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-left">
                      <div className=" leading-5 text-white">
                        {producto.nombre}
                      </div>
                    </td>
                    <td
                      className="px-6 py-4 whitespace-no-wrap 
                  text-white print:border-none 
                    leading-5 text-left"
                    >
                      {formatPrice(producto.precio * producto.cantidad)}
                    </td>
                    <td
                      className="px-6 py-4 whitespace-no-wrap 
                   text-white leading-5 text-left"
                    >
                      {producto.descripcion}
                    </td>
                    <td
                      className="px-6 py-4 whitespace-no-wrap 
                   text-white leading-5"
                    >
                      <Link to={`/home/${producto._id}`}>
                      <img
                        src={producto.img}
                        alt={producto.nombre}
                        className="w-12 h-12 object-cover"
                      />
                      </Link>
                    </td>
                    <td className="leading-5 text-white w-10">
                      <div className="flex flex-col justify-center items-center flex-1">
                        <Link to={`/bodega/${producto.bodega._id}`}>
                          <img
                            src={producto.bodega.imagen}
                            alt={producto.bodega.nombre}
                            className="w-10 h-10 object-cover"
                          />
                        </Link>
                        <p className="font-medium text-sm">
                          {producto.bodega.nombre}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 space-x-2">
                      <div className="flex justify-center gap-2 items-center">
                        <button
                          onClick={() => {
                            handleRemove(producto);
                          }}
                          className="btn border-blue-500 text-blue-500 hover:bg-blue-700 print:hidden"
                        >
                          <i className="fas fa-minus"></i>
                        </button>
                        <h1 className="text-white">{producto.cantidad}</h1>
                        <button
                          onClick={() => {
                            handleAddItem(producto);
                          }}
                          className="btn border-blue-500 text-blue-500 hover:bg-blue-700 print:hidden"
                        >
                          <i className="fas fa-plus"></i>
                        </button>

                        <button
                          onClick={() => removeFromCart(producto)}
                          className="btn hover:bg-red-700 border-red-500 text-red-500 print:hidden"
                        >
                          <i className="fas fa-backspace"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="p-2 w-full min-h-[68vh] flex justify-center items-center">
          <div className="flex flex-col items-center opacity-60">
            <h1 className="font-extralight">
              No Has Añadido Productos al Carrito
            </h1>
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
      {cart.length > 0 && (
        <>
          <div className="">
            <h1 className="font-semibold text-xl">
              Total: {formatPrice(total)}
            </h1>
          </div>
          <nav aria-label="flex" className="print:hidden">
            <ul className="inline-flex -space-x-px">
              <li
                onClick={prevPage}
                className={`btn-prev
                ${currentPage > 0 && "disabled:bg-gray-300"}
                `}
              >
                Atrás
              </li>
              {/* número de página */}
              <li className="text-center flex items-center px-2">
                {numberPage} de{" "}
                {numberLastPage}
              </li>
              <li className="btn-next" onClick={nextPage}>
                Adelante
              </li>
            </ul>
          </nav>
          <div className="w-full my-2">
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleOrder}
                className="btn border-gray-500 text-gray-500 hover:bg-gray-700 py-2 px-2
          rounded-lg mb-2"
              >
                <h1 className="text-lg font-semibold">Generar Pedido</h1>
              </button>
              {/* cancelar pedido */}
              <button
                onClick={handleCancel}
                className="btn border-gray-500 text-gray-500 hover:bg-gray-700 py-2 px-2
          rounded-lg mb-2"
              >
                <h1 className="text-lg font-semibold">Cancelar Pedido</h1>
              </button>
            </div>
            {/* <h1>Comuniquese con el bodeguero</h1>
            <p>Número de Teléfono: 593486364</p> */}
          </div>
        </>
      )}
    </LayoutProducts>
  );
};
