import React, { useContext, useEffect } from "react";
import { LayoutProducts } from "../../components/layout/LayoutProducts";
import { MyMapComponent } from "../../components/ui/Map/Map";
import { PlacesContext } from "../../context/places";

export const SearchPage = () => {
  const { getMarkets } = useContext(PlacesContext);
  if (!navigator.geolocation) {
    return (
      <h1 className="text-yellow-300 font-semibold">
        La Geolocalización no es soportada por tú navgador
      </h1>
    );
  }
  useEffect(() => {
    getMarkets();
  }, []);
  // useEffect(() => {
  //   document.title = "Search";
  // }, []);
  return (
    <LayoutProducts>
      <div className="flex flex-col h-[90vh]">
        <div className="flex justify-center gap-2 py-2">
          <h1 className="font-bold text-2xl">Encuentre su Bodega Favorita</h1>
          <img
            src="https://cdn-icons-png.flaticon.com/512/862/862856.png"
            alt="bodega"
            className="w-10 h-10"
          />
        </div>
        <MyMapComponent />
      </div>
    </LayoutProducts>
  );
};
