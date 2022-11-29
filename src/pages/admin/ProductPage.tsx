import React, { useContext, useEffect } from 'react'
import { TableProducts } from '../../components/Admin'
import { LayoutProfile } from '../../components/layout'
import { Loader } from '../../components/ui';
import { AuthContext } from '../../context/auth';
import { useProducts } from '../../hooks';

export const ProductPage = () => {
  const { user } = useContext(AuthContext);
  const { products, loading } = useProducts();
  return (
    <LayoutProfile>
      <div className="min-h-[85vh]">
        {
          loading ? (
            <Loader
              message="Cargando Productos"
            />
          ) : (
            <TableProducts products={products} />
          )
        }
      </div>
    </LayoutProfile>
  )
}
