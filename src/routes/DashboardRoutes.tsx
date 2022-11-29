import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { NotFound } from "../pages/others/NotFound";
import {
  ProductsPage,
  ProductPage,
  DetailPage,
  LoginPage,
  RegisterPage,
  SalesPage,
  AdminPage,
  ProfilePage,
  UpadateProfilePage,
  ConfigurePage,
  CategoryPage,
  FilterPage,
  DashBoardPage,
  FaqPage,
  PaymentPage,
  SearchPage,
  FavoritePage,
  DetailProductPage,
  AddProductPage,
  DetailUserPage,
  UserPage,
  CategoryAdminPage,
  OrderPage,
  OrderManagementPage,
  MarketAddPage,
  MarketPage,
  MarketDetailPage,
  BrandAdminPage,
  UpdatePassPage,
  FeedBackPage,
  DashboardOrderPage,
  OrderEditPage,
  MarketsPage,
  ContactPage,
  AboutPage,
  ConditionPage,
  DownLoadPage,
  ProvidersPage,
  ProviderActionPage,
} from "../pages";
import { AuthContext } from "../context/auth";
import { UIContext } from "../context/ui";
export const DashboardRoutes = () => {
  const { user } = useContext(AuthContext);
  const { ToggleTheme } = useContext(UIContext);
  return (
    <>
      <div className={`${ToggleTheme ? 'dark' : ''}`}>
        <Routes>
          {/* Products Page */}
          {/* <Route path="/home" element={<ProductsPage />} />
          <Route path="/home/:id" element={<DetailPage />} />
          <Route path="/home/categoria/:category" element={<CategoryPage />} />
          <Route path="/home/categorias" element={<FilterPage />} />
          <Route path="/home/pagos" element={<PaymentPage />} />
          <Route path="/home/favoritos" element={<FavoritePage />} />
          <Route path="/home/buscar" element={<SearchPage />} />
          <Route path="/home/tiendas" element={<MarketsPage />} />
          <Route path="/home/terminos-y-condiciones" element={<ConditionPage />} />
          <Route path="/home/descarga-la-app" element={<DownLoadPage />} />
          <Route path="/bodega/:id" element={<MarketDetailPage />} /> */}
          {/* Auth Page */}
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          {/* Sales Page */}
          {/* <Route path="/sales" element={<SalesPage />} /> */}
          {/* Admin Page */}
          {/* {user && user.role.name === "ADMIN_ROLE" && ( */}
          <>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/products" element={<ProductPage />} />
            <Route
              path="/admin/product/:id"
              element={<DetailProductPage />}
            />
            <Route path="/admin/product/add" element={<AddProductPage />} />
            <Route path="/admin/user" element={<UserPage />} />
            <Route path="/admin/user/detail" element={<DetailUserPage />} />
            <Route path="/admin/category" element={<CategoryAdminPage />} />
            <Route path="/admin/marcas" element={<BrandAdminPage />} />
            <Route path="/admin/proveedores" element={<ProvidersPage />} />
            <Route path="/admin/proveedores/agregar" element={<ProviderActionPage />} />
            <Route path="/admin/proveedores/editar/:id" element={<ProviderActionPage />} />
            <Route path="/admin/ordenes" element={<OrderPage />} />
          </>
          {/* )} */}
          {/* {
            user && user.role.name === "BODEGUERO_ROLE" && ( */}
          <>
            <Route path="/gestion/productos" element={<ProductPage />} />
            <Route
              path="/gestion/producto/:id"
              element={<DetailProductPage />}
            />
            <Route path="/gestion/producto/agregar" element={<AddProductPage />} />
            <Route path="/gestion/categorias" element={<CategoryAdminPage />} />
            <Route path="/gestion/marcas" element={<BrandAdminPage />} />
            <Route path="/gestion/bodega" element={<MarketPage />} />
            <Route path="/gestion/bodega/agregar" element={<MarketAddPage />} />
            <Route path="/gestion/bodega/actualizar" element={<MarketAddPage />} />
            <Route path="/gestion/pedidos" element={<OrderManagementPage />} />
            <Route path="/dashboard/pedidos" element={<DashboardOrderPage />} />
            <Route path="/gestion/pedidos/actualizar/:id" element={<OrderEditPage />} />
          </>
          {/* )
           } */}
          {/* User Page */}
          <Route path="/user/profile" element={<ProfilePage />} />
          <Route path="/user/profile/edit/:id" element={<UpadateProfilePage />} />
          <Route path="/user/profile/edit/password" element={<UpdatePassPage />} />
          <Route path="/user/configure" element={<ConfigurePage />} />
          <Route path="/user/dashboard" element={<DashBoardPage />} />
          <Route path="/user/orders" element={<OrderPage />} />
          {/* Other Page */}
          <Route path="/home/preguntas-frecuentes" element={<FaqPage />} />
          <Route path="/home/contactanos" element={<ContactPage />} />
          <Route path="/home/sobre-nosotros" element={<AboutPage />} />
          <Route path="/home/respuesta" element={<FeedBackPage />} />

          <Route path="/" element={<ProductsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};
