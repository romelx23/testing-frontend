import { useState } from "react";
import { fetchContoken } from "../helpers";
import {
  DetallePedido,
  Order,
  OrderByIdResponse,
  PedidoResponse,
} from "../interfaces";

export const useOrderDetail = () => {
  const [detail, setDetail] = useState<DetallePedido[]>([]);
  const [orderDetail, setOrderDetail] = useState({
    _id: "",
    bodega: {},
    fecha: "",
    importe: 0,
    name: "",
    user: "",
    status: "ordenado",
  } as Order);
  // productos del pedido
  const getOrderDetails = async (id:string) => {
    try {
      // const {_id}=order;
      const resp = await fetchContoken(`api/pedido/${id}`, {}, "GET");
      const data: PedidoResponse = await resp?.json();
      // console.log(data);
      if (data.success) {
        setDetail(data.detallePedido);
      }
      if (orderDetail !== undefined) {
        getOrderDetail(id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // datos generales del pedido => bodega,cliente, status pedido,total
  const getOrderDetail = async (id:string) => {
    try {
      // const {_id}=order;
      const resp = await fetchContoken(`api/pedido/refresh/${id}`, {}, "GET");
      const data: OrderByIdResponse = await resp?.json();
      // console.log(data);
      if (data.success) {
        setOrderDetail(data.pedido);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      const response = await fetchContoken(`api/pedido/${id}`, {}, "DELETE");
      const data = await response!.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    detail,
    orderDetail,
    getOrderDetails,
    deleteOrder
  };
};
