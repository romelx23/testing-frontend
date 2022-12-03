import React, { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchContoken } from "../../../helpers";
import { DetallePedido, Order } from "../../../interfaces";
import { Loader, Modal } from "../../ui";
type Estado = "ordenado" | "pendiente" | "atendido" | "cancelado";

interface Props {
  orderDetail: Order;
  detail: DetallePedido[];
  handleDetail: (order: Order) => void;
}

export const ModalOrderMarket: FC<Props> = ({
  orderDetail,
  detail,
  handleDetail,
}) => {
  const { pathname } = useLocation();
  // estado para mostrar si esta en el pedido o en el estado del pedido
  const [show, setShow] = useState(true);
  const initialState: Estado = orderDetail.status
    ? orderDetail.status
    : "ordenado";
  const [estado, setEstado] = useState<Estado>(initialState);

  const statusChange = async (order: Order, status: Estado) => {
    const { _id } = order;
    const resp = await fetchContoken(
      `api/pedido/status/${ _id }`,
      {
        status,
      },
      "PUT"
    );
    const data = await resp!.json();
    console.log(data);
  };
  const handleStatus = (status: Estado, order: Order) => {
    if (pathname === "/gestion/pedidos") {
      setEstado(status);
      statusChange(order, status);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    setEstado(orderDetail.status);
    console.log(estado);
    // setShow(true);
  }, [orderDetail.status]);

  // refrescar el componente cuando se presione el boton refrescar
  const refreshOrder = () => {
    console.log("refresh");
    // getOrderDetails(orderDetail);
    handleDetail(orderDetail);
  };

  return (
    <Modal>
      <div className="w-screen md:w-full h-full flex justify-center">
        <div className="modal_page">
          <div className="modal_page_header print:hidden">
            <button onClick={() => setShow(true)} className="btn_modal_header">
              <p className="font-semibold">Pedido</p>
              <i className="far fa-clipboard"></i>
            </button>
            <button onClick={() => setShow(false)} className="btn_modal_header">
              <p className="font-semibold">Estado</p>
              <i className="fas fa-search-location"></i>
            </button>
          </div>
          {show ? (
            <>
              <h1 className="font-semibold text-2xl">Detalle Pedido</h1>
              <div className="text-left ml-6 py-2">
                <span className="font-semibold">Datos de la Bodega</span>
                <hr />
              </div>
              <p className="text-left ml-6">
                <span className="font-semibold">Bodega:</span>{" "}
                {orderDetail.bodega.nombre}
              </p>
              <p className="text-left ml-6">
                <span className="font-semibold">Telefono:</span>{" "}
                {orderDetail.bodega.telefono}
              </p>
              <p className="text-left ml-6">
                <span className="font-semibold">Dirección:</span>{" "}
                {orderDetail.bodega.direccion}
              </p>
              <div className="text-left ml-6 py-2">
                <img
                  className="h-12 object-cover"
                  src={orderDetail.bodega.imagen}
                  alt="logo_bodega"
                />
              </div>
              <div className="text-left ml-6 py-2">
                <span className="font-semibold">Datos del Pedido</span>
                <hr />
              </div>
              {orderDetail.bodega.nombre?.length > 0 ? (
                <>
                  <p className="text-left ml-6">
                    <span className="font-semibold">Cliente:</span>{" "}
                    {orderDetail.name}
                  </p>
                  <p className="text-left ml-6">
                    <span className="font-semibold">Total:</span>{" "}
                    {orderDetail.importe.toFixed(2)}
                  </p>
                  <p className="text-left ml-6">
                    <span className="font-semibold">Fecha:</span>{" "}
                    {new Date(orderDetail.fecha).toLocaleDateString()}
                  </p>
                  <p className="text-left ml-6">
                    <span className="font-semibold">Estado:</span>{" "}
                    {orderDetail.status}
                  </p>
                </>
              ) : (
                <Loader message="Cargando datos de la bodega" heigth="200px" />
              )}
              <div className="flex flex-col">
                <table>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th>Imagen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detail.map((item, i) => {
                      return (
                        <tr key={item._id}>
                          <td>
                            <p className="font-semibold">{i + 1}.-</p>
                          </td>
                          <td>
                            <p className="text-left">{item.producto.name}</p>
                          </td>
                          <td>
                            <p>S/.{item.precio.toFixed(2)}</p>
                          </td>
                          <td>
                            <p>x{item.cantidad}</p>
                          </td>
                          <td className="flex justify-center items-center">
                            <img
                              className="w-12 h-12 border"
                              alt={item.producto.name}
                              src={item.producto.img}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <>
              <h1 className="font-semibold text-2xl">Estado del Pedido</h1>
              <div className="estado-pedido-container">
                <button
                  // onClick={() => setEstado("ordenado")}
                  onClick={() => handleStatus("ordenado", orderDetail)}
                  className={`estado-circle ${ estado === "ordenado" ? "bg-green-600" : ""
                    }`}
                >
                  <i className="fas fa-shopping-basket"></i>
                  <p className="absolute -bottom-8">Ordenado</p>
                </button>
                <div className="h-4 w-16 bg-white"></div>
                <button
                  onClick={() => handleStatus("pendiente", orderDetail)}
                  className={`estado-circle ${ estado === "pendiente" ? "bg-blue-600" : ""
                    }`}
                >
                  <i className="fas fa-dolly"></i>
                  <p className="absolute -bottom-8">Pendiente</p>
                </button>
                <div className="h-4 w-16 bg-white"></div>
                <button
                  onClick={() => handleStatus("atendido", orderDetail)}
                  className={`estado-circle ${ estado === "atendido" ? "bg-orange-600" : ""
                    }`}
                >
                  <i className="fas fa-check-circle"></i>
                  <p className="absolute -bottom-8">Atendido</p>
                </button>
              </div>
              <div className="estado-pedido-container mt-8">
                <button
                  onClick={() => handleStatus("cancelado", orderDetail)}
                  className={`estado-circle ${ estado === "cancelado" ? "bg-red-600" : ""
                    }`}
                >
                  <i className="fas fa-times"></i>
                  <p className="absolute -bottom-8">Cancelado</p>
                </button>
              </div>
            </>
          )}
          {/* boton descargar pedido */}
          <div className="flex justify-center mt-8">
            <button className="btn_download print:hidden" onClick={handlePrint}>
              <p className="font-semibold">Descargar Pedido</p>
              <i className="fas fa-download"></i>
            </button>
          </div>
          <div className="flex justify-center mt-8">
            <button
              className="btn_download print:hidden"
              onClick={refreshOrder}
            >
              <p className="font-semibold">Actualizar Pedido</p>
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
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          </div>
          {/* <p>Total: {detail.reduce((total,item)=>total+item.precio)}</p> */}
        </div>
      </div>
    </Modal>
  );
};
