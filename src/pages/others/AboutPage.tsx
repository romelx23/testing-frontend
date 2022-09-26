import React from "react";
import { LayoutProducts } from "../../components/layout";

export const AboutPage = () => {
  return (
    <LayoutProducts>
      {/* design about page Ecommerce */}
      <div className="flex flex-col items-center justify-center py-3 px-3">
        <h1 className="text-xl md:text-2xl font-pacifico">
          Acerca de Tú Mercado Favorito
        </h1>
        <p className="py-2">
          Tú Mercado Favorito es una plataforma que te permite comprar y vender
          en tiempo real.
          <br />
        </p>
        <img
          src="https://medicoplus.com/_next/image?url=https%3A%2F%2Fplustatic.com%2F7326%2Fconversions%2Ftipos-amigos-large.jpg&w=1024&q=75"
          alt="sobre-nosotros"
          className="w-auto h-56"
        />
        <ul
            className="flex flex-col items-center justify-center py-3"
        >
          <li>
            <p className="py-2 w-64 md:w-full md:max-w-2xl">
              Somos un grupo de estudiantes de la Universidad Nacional de
              Tecnología de Lima Sur, que trabajamos para que la comunidad de
              Lima sea más fácil de encontrar productos de calidad.
            </p>
          </li>
          <li>
            <p className="py-2 w-64 md:w-full md:max-w-2xl">
              Nuestra plataforma te permite comprar y vender en tiempo real, y
              también te permite buscar productos que te interesen.
            </p>
          </li>
          <li>
            <p className="py-2 w-64 md:w-full md:max-w-2xl">
              También te permite llevar un control de tus pedidos y tus gastos, todo en la palma de tu mano.
            </p>
          </li>
        </ul>
      </div>
    </LayoutProducts>
  );
};
