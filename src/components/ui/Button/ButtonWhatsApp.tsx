import React, { FC } from "react";
interface Props{
  number?:string;
  name?:string;
}

export const ButtonWhatsApp:FC<Props> = ({number,name}) => {
  return (
    <a
    title={`${name?name:"Me gustaría volverme bodeguero"}`}
      href={`https://wa.me/51${number?'932003987':'986661493'}?text=${name?`Me%20gustaría%20contactarme%20con%20el%20bodeguero%20a%20cargo%20${name}`:"Me%20gustaría%20volverme%20el%20bodeguero%20de%20tu%20empresa"}`}
      className="whatsapp print:hidden"
      target="_blank"
    >
      <i className="fab fa-whatsapp"></i>
    </a>
  );
};
