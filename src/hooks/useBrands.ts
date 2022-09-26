import { useEffect, useState } from "react";
import { MarcaI , MarcaGeneralI, MarcaByIdI} from "../interfaces";
import { baseUrl } from "../utils";

export const useBrands = () => {
  const url = `${baseUrl}/api/marca?desde=0&limit=40`;
  const [brands, setBrands] = useState<MarcaI[]>([]);
  const [brandById, setBrand] = useState({} as MarcaI);
  const [loading, setLoading] = useState(false);
  const getBrands = async () => {
    setLoading(true);
    const response = await fetch(url);
    const { marcas }: MarcaGeneralI = await response.json();
    // console.log(categorias);
    setBrands(marcas);
    setLoading(false);
  };
  const getBrandsById = async (id: string) => {
    setLoading(true);
    const response = await fetch(`${baseUrl}/api/marca/${id}`);
    const {marca}: MarcaByIdI = await response.json();
    setBrand(marca);
    setLoading(false);
  }
  useEffect(() => {
    getBrands();
  }, []);
  
  return {
    brands,
    setBrands,
    loading,
    getBrands,
    getBrandsById,
    brandById,
  };
};
