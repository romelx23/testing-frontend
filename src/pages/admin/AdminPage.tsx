import React from "react";
import { useLocation } from "react-router-dom";
import { LayoutProfile } from "../../components/layout/LayoutProfile";
import { CardAdmin } from "../../components/ui/Card/CardAdmin";
import { cardsAdminGeneral, cardsAdminShop } from "../../data/cardsAdmin";

export const AdminPage = () => {
  return (
    <LayoutProfile>
      <div className="p-2 h-full">
        <h1 className="text-left mx-4 font-semibold">Admin General</h1>
        <div className="p-2 flex justify-around flex-wrap gap-2">
          {cardsAdminGeneral.map((item) => {
            return <CardAdmin key={item.id} item={item} />;
          })}
        </div>
        <h1 className="text-left mx-4 font-semibold">Admin Bodeguero</h1>
        <div className="p-2 flex justify-around flex-wrap gap-2">
          {cardsAdminShop.map((item) => {
            return <CardAdmin key={item.id} item={item} />;
          })}
        </div>
      </div>
    </LayoutProfile>
  );
};
