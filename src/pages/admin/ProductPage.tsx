import React, { useContext, useEffect } from 'react'
import { TableProducts } from '../../components/Admin'
import { LayoutProfile } from '../../components/layout'
import { Loader } from '../../components/ui';
import { AuthContext } from '../../context/auth';
import { useProducts } from '../../hooks';

export const ProductPage = () => {
  const {user}=useContext(AuthContext);
  const { productsMarket,products,loading } = useProducts();
  const productsByRole = user.rol === 'ADMIN_ROLE' ? products : productsMarket;
  return (
    <LayoutProfile>
      <div className="min-h-[85vh]">
        {
          loading ? (
            <Loader
              message="Cargando Productos"
            />
          ) : (
            <TableProducts products={productsByRole}/>
          )
        }
      </div>
    </LayoutProfile>
  )
}
