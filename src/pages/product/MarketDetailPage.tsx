import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LayoutProducts } from "../../components/layout";
import { ListProducts } from "../../components/products";
import { ButtonWhatsApp } from "../../components/ui";
import { UIContext } from "../../context/ui";
import { fetchSintoken } from "../../helpers";
import {
  Market,
  MarketResponse,
  Producto,
  ProductoBodega,
} from "../../interfaces";

export const MarketDetailPage = () => {
  const [products, setProducts] = useState<Producto[]>([]);
  const [market, setMarket] = useState<Market>({} as Market);
  const [title, setTitle] = useState("");
  const { id } = useParams();
  const { SetLogo } = useContext(UIContext);
  const getProductsByMarket = async () => {
    const resp = await fetchSintoken(`api/bodega/productos/${ id }`, {}, "GET");
    const data: ProductoBodega = await resp?.json();
    const { products } = data;
    setProducts(products);
    console.log(data);
  };
  const getMarketData = async () => {
    try {
      const resp = await fetchSintoken(`api/bodega/${ id }`, {}, "GET");
      const data: MarketResponse = await resp?.json();
      const { bodega } = data;
      setMarket(bodega);
      if (bodega.nombre) {
        const name = bodega.nombre.toLowerCase()
        const titleCapitlize = name.charAt(0).toUpperCase() + name.slice(1);
        setTitle(titleCapitlize)
        SetLogo(bodega.imagen)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMarketData();
    getProductsByMarket();
  }, []);

  return (
    <LayoutProducts>
      <ListProducts title={`Productos Bodega ${ title }`} productsProps={products} />
      <ButtonWhatsApp
        number={market?.telefono?.toString()}
        name={market?.nombre}
      />
    </LayoutProducts>
  );
};
