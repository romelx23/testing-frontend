import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { LayoutProducts } from "../../components/layout";

export const FeedBackPage = () => {
  const [searchParams] = useSearchParams();
  const estado = searchParams.get("status");
  console.log(estado);
  return (
    <LayoutProducts>
      {estado === "realizado" && (
        <div className="flex flex-col items-center justify-center gap-4 mt-4">
          <h1 className="text-3xl font-bold">
            Se Realizó correctamente su pedido
          </h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 fill-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <Link to="/">
            <button className="btn btn-primary">Volver al Inicio</button>
          </Link>
        </div>
      )}
      {estado!=='realizado' && estado!=='cancelado' && (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">Aún no gernerá un pedido</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 fill-yellow-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <Link to="/">
            <button className="btn btn-primary">Volver al Inicio</button>
          </Link>
        </div>
      )}
      {estado === "cancelado" && (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">El Pedido fue Cancelado</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 fill-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <Link to="/">
            <button className="btn btn-primary">Volver al Inicio</button>
          </Link>
        </div>
      )}
    </LayoutProducts>
  );
};
