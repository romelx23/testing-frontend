import { useContext, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { PlacesContext } from '../../../context/places/PlacesContext';
import { MapContext } from '../../../context/map/MapContext';
import { ButtonLocation } from "../Button/ButtonLocation";
import { SearchBar } from "../Search/SearchBar";
import { UIContext } from "../../../context/ui";

mapboxgl.accessToken =
  "pk.eyJ1Ijoicm9tZWx4MjMiLCJhIjoiY2tzZHA2Y2M0MHQyMjJvbXNsMmVjZW41aCJ9.2As_5QylbPvQj6mFtsHD_g";

export const MyMapComponent = () => {
  const {isLoading}=useContext(PlacesContext);
  const {ToggleTheme} = useContext(UIContext);
  const {setMap}=useContext(MapContext);
  const mapContainer = useRef<HTMLDivElement>(null);
  // const map = useRef<Map<any, any>>(null);
  const [lng, setLng] = useState(-76.94289513030368);
  const [lat, setLat] = useState(-12.220197694900099);
  const [zoom, setZoom] = useState(14);
  useEffect(() => {
    if (!mapContainer.current) return;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: ToggleTheme?"mapbox://styles/mapbox/dark-v10":"mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    setMap(map);
  }, []);
  // if(isLoading){
  //   return <div>Cargando...</div>
  // }
  // Tareas de mañana: crear un array de bodegas

  return (
    <div className="relative">
      <SearchBar/>
      <div className="absolute bottom-0 right-0 flex flex-col text-left z-10 font-semibold p-2" style={{background:'#ffffff8a'}}>
        <h1 className="">
           Su Localización es : 
        </h1>
        <h1>
        {lng.toFixed(2)} {lat.toFixed(2)}
        </h1>
      </div>
      <ButtonLocation/>
      <div
        ref={mapContainer}
        className="map-container w-full h-[80vh] left-0 top-0 fixed"
      />
    </div>
  );
};
