import React, { useContext, useState } from "react";
import { MapContext } from "../../../context/map";
import { PlacesContext } from "../../../context/places";
import { Feature } from "../../../interfaces/places";

export const SearchResult = () => {
  const { places, isLoadingPlaces } = useContext(PlacesContext);
  const [activeId, setActiveId] = useState("")
  const {map}=useContext(MapContext);
  const onPlaceClick=(place:Feature)=>{
    console.log(place);
    const [lng,lat]=place.center;
    setActiveId(place.id);
    map?.flyTo({
        zoom: 15,
        center: [lng,lat],
    });
  }
  if(places.length===0){
        return <></>
    }
  return (
    <ul className="flex flex-col">
      {isLoadingPlaces ? (
        <li className="text-yellow-300 font-semibold">Cargando...</li>
      ) : (
        places.map((place) => (
          <li 
          onClick={()=>onPlaceClick(place)}
          className={`hover:cursor-pointer hover:bg-gray-100 p-1 ${activeId===place.id && 'bg-gray-300'}`} key={place.id}>
            <h6 className="font-semibold text-black">{place.text_es}</h6>
            <p className="text-sm text-gray-400">{place.place_name}</p>
            <button className="btn w-full text-blue-600 font-semibold hover:bg-blue-600">
              Direcciones
            </button>
          </li>
        ))
      )}
    </ul>
  );
};
