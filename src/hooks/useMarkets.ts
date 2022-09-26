import { useEffect, useState } from "react";
import { fetchContoken } from "../helpers";
import { Market, MarketsResponse } from "../interfaces";

export const useMarkets = () => {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getMarkets = async () => {
    setLoading(true);
    const response = await fetchContoken("api/bodega", {}, "GET");
    const {bodegas}:MarketsResponse= await response?.json();
    setMarkets(bodegas);
    setLoading(false);
  };

  useEffect(() => {
    getMarkets();
  }, []);

  return { markets, loading };
};
