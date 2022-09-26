import React from "react";
import { Link } from "react-router-dom";
import { LayoutProducts } from "../../components/layout";
import { Loader } from "../../components/ui";
import { useMarkets } from "../../hooks";

export const MarketsPage = () => {
  const { loading, markets } = useMarkets();
  return (
    <LayoutProducts>
        <div className="grid-products">
          {loading ? (
            <Loader
              message="Cargando Tiendas"
            />
          ) : (
            markets.map((market) => (
              <Link 
              to={`/bodega/${market._id}`}
              className="card__product w-[260px] sm:w-[332px] py-4" key={market._id}>
                <div className="card-image">
                  <figure className="image">
                    <img src={market.imagen} alt={market.nombre} className="img-product"/>
                  </figure>
                </div>
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <p className="title">{market.nombre}</p>
                      <p className="subtitle">{market.descripcion}</p>
                      <p className="subtitle">{market.direccion}</p>
                      <p className="subtitle">{market.nombrePropietario}</p>
                      <p className="subtitle">{market.telefono}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
    </LayoutProducts>
  );
};
