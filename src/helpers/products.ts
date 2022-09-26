import { CategoriaGeneralI } from '../interfaces';
import { fetchSintoken } from './';

export const getCategories= async ()=>{
    const resp=await fetchSintoken('api/categorias?desde=0&limit=20',{},'GET');
    const data:CategoriaGeneralI=await resp!.json();
    return data;
}