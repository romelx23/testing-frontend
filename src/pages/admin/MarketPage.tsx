import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { LayoutProfile } from "../../components/layout";
import { useMarket } from "../../hooks/useMarket";

export const MarketPage = () => {
  const { id } = useMarket();
  const navigate = useNavigate();
  const handleMarket = () => {
    // validación si el usuario ya tiene una tienda
    if (id) {
      Swal.fire({
        title: "Ya tienes una tienda",
        text: "Puedes editarla en la sección de tiendas",
        icon: "warning",
        confirmButtonText: "Ir a tiendas",
      }).then((result) => {
        if (result.value) {
          navigate("/gestion/bodega");
        }
      });
    } else {
      navigate("/gestion/bodega/agregar");
    }
  };
  const handleEditMarket = () => {
    // validación si el usuario no tiene una tienda
    if (!id) {
      Swal.fire({
        title: "No tienes una tienda",
        text: "Puedes crear una nueva en la sección de tiendas",
        icon: "warning",
        confirmButtonText: "Ir a tiendas",
      }).then((result) => {
        if (result.value) {
          navigate("/gestion/bodega");
        }
      });
    } else {
      navigate("/gestion/bodega/actualizar");
    }
  };
  return (
    <LayoutProfile>
      <div className="min-h-[85vh] flex justify-around flex-wrap gap-2">
        <button onClick={handleMarket} className="card-admin">
          <h1>Agregar Bodega</h1>
          <img
            src="https://cdn-icons-png.flaticon.com/512/706/706164.png"
            alt="market"
            className="w-12 h-12"
          />
        </button>
        <button onClick={handleEditMarket} className="card-admin">
          <h1>Editar Bodega</h1>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2920/2920100.png"
            alt="market"
            className="w-12 h-12"
          />
        </button>
      </div>
    </LayoutProfile>
  );
};
