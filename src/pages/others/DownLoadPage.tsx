import React, { useEffect, useState } from "react";
import { LayoutProducts } from "../../components/layout";

export const DownLoadPage = () => {

  return (
    <LayoutProducts>
      <div className="flex flex-col items-center justify-center gap-3 min-h-[50vh]">
        <h1 className="text-2xl font-semibold">Descarga la Aplicación, es gratis</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={()=>{}}
        >
          desacargar
        </button>
      </div>
    </LayoutProducts>
  );
};
