import React, { useContext, useEffect, useRef, useState } from "react";
import { ModalOrderMarket } from "../../components/Admin";
import { LayoutProfile } from "../../components/layout";
import { AuthContext } from "../../context/auth";
import { UIContext } from "../../context/ui";
import { fetchContoken } from "../../helpers";
import { usePaginate,useOrderDetail } from "../../hooks";
import {
  Order,
  OrderResponse,
} from "../../interfaces";

export const OrderPage = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filterOrders, setFilterOrders] = useState<Order[]>([]);
  const { toggleModal } = useContext(UIContext);
  const [mode, setMode] = useState("tabla");
  const {detail,getOrderDetails,orderDetail}=useOrderDetail();
  const {
    currentPage,
    nextPage,
    prevPage,
    items,
    quantity,
    search,
    searchItemsInput,
    numberPage,
    numberLastPage
  } = usePaginate(filterOrders);
  
  const loadOrders = async () => {
    const resp = await fetchContoken(`api/pedido/user`, {}, "GET");
    const data: OrderResponse = await resp?.json();
    console.log(data);
    if (data.success) {
      const { data: ordenes } = data;
      setOrders(ordenes);
      setFilterOrders(ordenes);
    }
  };

  // abrir un modal para mostrar el detalle de la orden
  const handleDetail = (order: Order) => {
    toggleModal(true);
    const {_id}=order;
    getOrderDetails(_id);
  };

  const handleFilterByDate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const filtered = orders
      .filter((order) => {
        const { fecha } = order;
        const date = new Date(fecha).toLocaleDateString();
        return date.includes(value);
      })
      .reverse();
    if (value === "seleccione") {
      setFilterOrders(orders);
    } else {
      setFilterOrders(filtered);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleMode = (modo: string) => {
    setMode(modo);
  };

  return (
    <LayoutProfile>
      <div className="flex justify-end space-x-2">
        <select
          className="w-52 h-12 p-2 border border-gray-300 rounded-lg mb-4"
          onChange={handleFilterByDate}
        >
          <option value="seleccione">Mostrar todo</option>
          {orders
            .sort(
              (a, b) =>
                new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
            )
            .map((order) => (
              <option
                key={order._id}
                value={new Date(order.fecha).toLocaleDateString()}
              >
                {new Date(order.fecha).toLocaleDateString()}
              </option>
            ))}
        </select>
        <button
          title="cuadricula"
          className={`btn_model h-10 ${
            mode === "cuadricula" && "btn_model_selected"
          }`}
          onClick={() => handleMode("cuadricula")}
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
              d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
            />
          </svg>
        </button>
        <button
          title="tabla"
          className={`btn_model h-10 ${
            mode === "tabla" && "btn_model_selected"
          }`}
          onClick={() => handleMode("tabla")}
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
              d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </button>
      </div>
      <div className="min-h-[85vh] flex justify-around flex-wrap gap-2">
        <>
          {mode === "cuadricula" && (
            <>
              {orders.length !== 0 ? (
                filterOrders.map((item, i) => (
                  <div
                    className="w-64 h-40 bg-indigo-600 text-white rounded-2xl flex flex-col justify-between p-3 text-center text-2xl relative"
                    key={i}
                  >
                    <div className="flex justify-between">
                      <h1>{i}.</h1>
                      <h1>{item.nombre}</h1>
                    </div>
                    <h1 className="flex justify-center font-semibold">
                      S/.{item.importe.toFixed(2)}
                    </h1>
                    <div className="flex justify-between">
                      <h1 className="text-lg">
                        {new Date(item.fecha).toLocaleDateString()}
                      </h1>
                      <button
                        onClick={() => handleDetail(item)}
                        className="btn btn-detalle"
                      >
                        ver detalle
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-64 h-40 bg-indigo-600 text-white rounded-2xl flex flex-col justify-between p-3 text-center text-2xl">
                  <h1 className="flex justify-center font-semibold">
                    No hay pedidos
                  </h1>
                </div>
              )}
            </>
          )}

          {mode === "tabla" && (
            <>
              {orders.length !== 0 ? (
                <div className="table-content">
                  <div className="flex justify-between mx-6">
                    <h1 className="text-left mb-2 text-xl font-bold">
                      Tabla Pedidos
                    </h1>
                    <input
                      type="text"
                      name="search"
                      id="search"
                      value={search}
                      onChange={searchItemsInput}
                      className="input-search"
                      placeholder="Buscar pedidos"
                      autoComplete="off"
                    />
                  </div>
                  <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-gray-900 shadow-dashboard px-8 pt-3 rounded-lg min-h-[55vh] print:bg-black print:px-0 print:pl-6 print:break-before-avoid-page">
                    <table className="min-w-full print:overflow-hidden">
                      <thead>
                        <tr>
                          <th className="th">ID</th>
                          <th className="th">Nombre</th>
                          <th className="th">Fecha</th>
                          <th className="th">Estado</th>
                          <th className="th">Bodega</th>
                          <th className="th">Imagen</th>
                          <th className="th">Cantidad</th>
                          {
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-white">
                              <button
                                onClick={handlePrint}
                                className="btn border-cyan-500 text-cyan-500 hover:bg-cyan-700 print:hidden"
                              >
                                Imprimir Productos
                              </button>
                            </th>
                          }
                        </tr>
                      </thead>
                      <tbody className="">
                        {items.map((item, i) => (
                          <tr className="font-semibold text-lg" key={item._id}>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 print:border-none">
                              <div className="flex items-center">
                                <div>
                                  <div className=" leading-5 text-white">
                                    {i + currentPage + 1}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="td">
                              <div className="text-white text-left">
                                {item.nombre}
                              </div>
                            </td>
                            <td className="td">
                              {new Date(item.fecha).toLocaleDateString()}
                            </td>
                            <td className="td text-left">
                              {item.status}
                            </td>
                            <td className="td w-40">
                              {item.bodega.nombre}
                            </td>
                            <td className="td">
                              <img
                                src={
                                  item
                                    ? item.bodega.imagen
                                    : "https://www.giulianisgrupo.com/wp-content/uploads/2018/05/nodisponible.png"
                                }
                                className="w-12 h-12 object-cover"
                              />
                            </td>
                            <td className="td">
                              S/.{item.importe.toFixed(2)}
                            </td>
                            <td className="td">
                              <button
                                onClick={() => handleDetail(item)}
                                className="btn btn-detalle flex"
                              >
                                <span>ver detalle</span>
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
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                  />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                        {items.length <= 0 && (
                          <tr className="font-semibold text-lg columns-4">
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 print:border-none">
                              <p className="text-white"> No hay pedidos</p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <nav aria-label="flex" className="relative">
                    <ul className="inline-flex -space-x-px">
                      <li onClick={prevPage}>
                        <a
                          href="#"
                          className={`btn-prev
                ${currentPage > 0 && "disabled:bg-gray-300"}
                `}
                        >
                          Atrás
                        </a>
                      </li>
                      <li className="px-2">
                        {
                          <p className="text-white">
                            {numberPage} de {numberLastPage}
                          </p>
                        }
                      </li>
                      <li onClick={nextPage}>
                        <a href="#" className="btn-next">
                          Adelante
                        </a>
                      </li>
                    </ul>
                    <div className="flex justify-end">
                      <p>Total Páginas {quantity}</p>
                    </div>
                  </nav>
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center opacity-60 min-h-[50vh]">
                  <h1 className="font-extralight">
                    No se encontraron pedidos
                  </h1>
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              )}
            </>
          )}
        </>
      </div>
      <ModalOrderMarket orderDetail={orderDetail} detail={detail} handleDetail={handleDetail}/>
    </LayoutProfile>
  );
};
