import React from "react";
import { LayoutProducts } from "../../components/layout";

export const ConditionPage = () => {
  return (
    <LayoutProducts>
      <div className="flex flex-col items-center justify-center gap-3">
        {/* information about term and coditions */}
        <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-center text-2xl font-bold">
            Terminos y condiciones
          </h1>
          <p className="text-center text-xl max-w-xl">
          Al comprar un artículo, aceptas que: (i) eres responsable de leer el listado completo del artículo antes de comprometerte a comprarlo: (ii) celebras un contrato legalmente vinculante para comprar un artículo cuando te comprometed a comprar un artículo y completar el proceso de check-out.
          </p>

          <p className="text-center text-xl max-w-xl">
          Los precios que cobramos por usar nuestros servicios / para nuestros productos se enumeran en  la página web. Nos reservamos el derecho de cambiar nuestros precios para los productos que se muestran en cualquier momento y de corregir los errores de precios que pueden ocurrir inadvertidamente. Información adicional sobre precios e impuestos sobre las ventas está disponible en la página de pagos. 
          </p>
          <p className="text-center text-xl max-w-xl">
          La tarifa por los servicios y cualquier otro cargo que pueda incurrir en relación con tu uso del servicio, como los impuestos y las posibles tarifas de transacción, se cobrarán mensualmente a tu método de pago
          </p>
            <p className="text-center text-xl max-w-xl">
            Para cualquier producto no dañado, simplemente devuélvelo  con los accesorios y el paquete incluidos junto con el recibo original (o recibo de regalo) dentro de los 14 días posteriores a la fecha que recibiste el producto, y lo cambiaremos o te ofreceremos un reembolso basado en el método de pago original . Además, ten en cuenta lo siguiente: (i) Los productos solo se pueden devolver en el país en el que se compraron originalmente; y (ii) los siguientes productos no son elegibles para la devolución: [lista de artículos].
            </p>
        </div>
      </div>
    </LayoutProducts>
  );
};
