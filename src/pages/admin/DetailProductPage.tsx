import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { FormProducts } from '../../components/Admin/FormProducts';
import { LayoutProfile } from '../../components/layout'
import { Producto, ProductoId } from '../../interfaces';
import { baseUrl } from '../../utils';

export const DetailProductPage = () => {
  // Actualizar el producto
  const navigate = useNavigate();
  const { id } = useParams();
  const [producto, setProducto] = useState<Producto>({} as Producto);
  const getProductId = async () => {
    try {
      const url = `${baseUrl}/api/products/${id}`;
      const resp = await fetch(url);
      const { product }: ProductoId = await resp.json();
      if (product._id) {
        setProducto(producto);
      } else {
        navigate('/admin/products');
      }
    } catch (error) {
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
