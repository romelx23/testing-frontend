import React, { FC, useContext, useEffect } from "react";
import { Carrito } from "../products";
import { Footer } from "../ui";
import { ButtonTop } from "../ui/Button/ButtonTop";
import { Header } from "../ui/Header/Header";
interface Props {
  children: React.ReactNode;
}

export const LayoutProducts: FC<Props> = ({ children }) => {
  return (
    <div className="layout-products">
      <div className="p-4 w-full">
      <Carrito/>
        <Header />
        {children}
      </div>
      <ButtonTop/>
      <Footer />
    </div>
  );
};
