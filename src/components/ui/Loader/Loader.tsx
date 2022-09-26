import React, { FC } from "react";
import { Spinner } from "../Spinner/Spinner";

interface Props{
    message?: string;
    width?: string;
    heigth?: string;
}

export const Loader:FC<Props> = ({message,width,heigth}) => {
  return (
    <div className={`flex flex-col justify-center items-center opacity-60 ${heigth?`min-h-${heigth}`:'min-h-[50vh]'} ${width?width:'w-auto'}`}>
      <h1 className="font-extralight">{message?message:'cargando'}</h1>
      <Spinner />
    </div>
  );
};
