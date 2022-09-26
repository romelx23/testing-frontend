import { useEffect, useState } from "react";
import { fetchContoken } from "../helpers";
import { Order, OrderResponse } from "../interfaces";

export const useOrders = () => {
  const url = `api/pedido`;
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const getOrders = async () => {
    setLoading(true);
    const response = await fetchContoken(url);
    const { data }: OrderResponse = await response!.json();
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    getOrders();
  }, []);
  return {
    orders,
    setOrders,
    loading,
    getOrders,
  };
};
