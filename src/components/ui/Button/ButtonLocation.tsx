import React, { useContext } from 'react'
import { MapContext } from '../../../context/map/MapContext';
import { PlacesContext } from '../../../context/places/PlacesContext';

export const ButtonLocation = () => {
    const {map,isMapReady}=useContext(MapContext);
    const {userLocation}=useContext(PlacesContext);
    const handleCLick=()=>{
        if(!isMapReady)throw new Error('El mapa no esta listo');
        if(!userLocation)throw new Error('No hay ubicación de usuario');
        map?.flyTo({
            zoom: 14,
            center: userLocation
        })
    }
  return (
    <button 
    type='button'
    onClick={handleCLick}
    className='btn-location absolute top-2 right-5 z-10'>
        <i className="fas fa-map-marker-alt"></i>
        Mi ubicación
    </button>
  )
}
