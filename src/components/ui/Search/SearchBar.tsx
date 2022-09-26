import React, { useContext, useRef } from 'react'
import { PlacesContext } from '../../../context/places/PlacesContext';
import { SearchResult } from './SearchResult';

export const SearchBar = () => {
    const {searchPlacesByTerm}=useContext(PlacesContext);
    const debounceRef=useRef<NodeJS.Timeout>();
    const onQueryChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const query=e.target.value;
        if(debounceRef.current){
            clearTimeout(debounceRef.current);
        }
        debounceRef.current=setTimeout(()=>{
            console.log(query);
            searchPlacesByTerm(query);
            // Eejecutar consulta
        },350);
    }
  return (
    <div className='search-container'>
        <input 
        type="text" 
        className='search-input border-2'
        placeholder='Buscar Bodega'
        onChange={onQueryChange}
        />
        <SearchResult/>
    </div>
  )
}
