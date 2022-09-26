import React from "react";
import { LayoutProducts } from "../../components/layout/LayoutProducts";
import { Accordion } from "../../components/ui";

export const FaqPage = () => {
  return (
    <LayoutProducts>
      <h1 className="text-xl font-bold py-4">Prguntas Frecuentes</h1>
      <div className="w-full px-4 space-y-2">
        <Accordion title="¿Qué es una alimentación saludable?">
          <ul className="pb-2 pr-2">
            <li className="text-left ml-8 list-disc">
              Una alimentación saludable es una comida que contiene alimentos
              que contienen menos grasas y proteínas que las que contienen
              muchas.
            </li>
            <li className="text-left ml-8 list-disc">
              Una alimentación saludable es una comida que contiene alimentos
              que contienen menos grasas y proteínas que las que contienen
              muchas.
            </li>
          </ul>
        </Accordion>
        <Accordion title="¿Cuándo los niños deben comer como un adulto?">
          <ul className="pb-2 pr-2">
            <li className="text-left ml-8 list-disc">
              A partir de los dos años la familia debería compartir el menú,
              pues el equilibrio dietético conviene a todos. Se puede establecer
              un menú diverso y sano sin hacer distinciones arbitrarias, aunque
              los trozos sean más menudos o se chafen algunos alimentos.
            </li>
          </ul>
        </Accordion>
        <Accordion title="¿Cómo pueden apreciar las verduras?">
          <ul className="pb-2 pr-2">
            <li className="text-left ml-8 list-disc">
            Las verduras han de formar parte de las primeras papillas, elaboradas en casa, para que reconozcan su diversidad de sabores y texturas. Se ofrecen con presentaciones simpáticas, en dosis moderadas y "sin complejos" para no provocar involuntariamente el rechazo.
            </li>
          </ul>
        </Accordion>
        <Accordion title="¿Por qué resultan valiosas las ensaladas?">
          <ul className="pb-2 pr-2">
            <li className="text-left ml-8 list-disc">
            Las hortalizas crudas aportan nutrientes que se pierden con el calor, como vitaminas, enzimas, algunos antioxidantes y ácidos orgánicos. Se puede empezar ofreciendo una zanahoria, ideal para la dentición, o medio tomate aderezado con unas gotas de aceite de oliva.
            </li>
          </ul>
        </Accordion>
        <Accordion title="¿Qué caracteriza a un desayuno equilibrado?">
          <ul className="pb-2 pr-2">
            <li className="text-left ml-8 list-disc">
            El cereal integral y una pieza de fruta. Para los que se despiertan con apetito, puede constar de un yogur vegetal con muesli y manzana rallada o tostadas integrales. Si se tiene menos hambre, un zumo recién exprimido con polen y jalea real; a media mañana, un bocadillo integral con unas almendras.
            </li>
          </ul>
        </Accordion>
        <Accordion title="¿Qué meriendas son las más saludables?">
          <ul className="pb-2 pr-2">
            <li className="text-left ml-8 list-disc">
            La merienda es idónea para tomar fruta, entera o en macedonia. O bien pan integral con aguacate o paté vegetal casero. Se pueden dar tortitas hinchadas de cereales enteros, así como magdalenas caseras. O recurrir a combinaciones de frutas y frutos secos, como higos con nueces o dátiles con almendras.
            </li>
          </ul>
        </Accordion>
        <Accordion title="¿Comer en la escuela influye en la cena?">
          <ul className="pb-2 pr-2">
            <li className="text-left ml-8 list-disc">
            Para equilibrar las ingestas del día hay que asesorarse dietéticamente además de conocer el menú escolar. Si al mediodía se ha tomado un alimento muy proteico como carne, por la noche se tomará un plato rico en carbohidratos, como arroz o sopa. Es buen momento para ofrecer ensaladas.
            </li>
          </ul>
        </Accordion>
      </div>
    </LayoutProducts>
  );
};
