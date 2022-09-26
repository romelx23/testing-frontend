import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { FormProducts } from '../../components/Admin/FormProducts';
import { LayoutProfile } from '../../components/layout'
import { Producto, ProductoId } from '../../interfaces';
import { baseUrl } from '../../utils';

export const DetailProductPage = () => {
  // Actualizar el producto
  const navigate= useNavigate();
  const { id } = useParams();
  const [producto, setProducto] = useState<Producto>({} as Producto);
  const getProductId = async () => {
     try{
      const product = `${baseUrl}/api/productos/${id}`;
      const resp = await fetch(product);
      const { producto }: ProductoId = await resp.json();
      if(producto._id){
        setProducto(producto);
      }else{
        navigate('/admin/products');
      }
     }catch(error){
        console.log(error);
      }
   };

 useEffect(() => {
     getProductId();
   }, []);
    
  return (
    <LayoutProfile>
      <FormProducts producto={producto} />
    </LayoutProfile>
  )
}
