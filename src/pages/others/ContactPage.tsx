import React, { useRef, useState } from "react";
import { LayoutProducts } from "../../components/layout";
import { useForm } from "../../hooks";

export const ContactPage = () => {
  const link = useRef<HTMLAnchorElement>(null);
  const [touch, setTosuch] = useState({
    name: false,
    email: false,
    message: false,
  });
  const { values, handleInputChange, setValues } = useForm({
    name: "",
    email: "",
    message: "",
  });
  const { name, email, message } = values;
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
    if (values.name.trim() === "") {
      return;
    }
    if (values.email.trim() === "") {
      return;
    }
    if (values.message.trim() === "") {
      return;
    }
    link.current?.click();
  };

  return (
    <LayoutProducts>
      <section className="pb-20 relative block bg-slate-800">
        <div className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20">
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-slate-800 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
          <div className="flex flex-wrap text-center justify-center">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-semibold text-white">Contactanos</h2>
              <p className="text-lg leading-relaxed mt-4 mb-4 text-slate-400">
                Acerquece a sus clientes, conviertase en su propio jefe y
                comience a ganar dinero.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap mt-12 justify-center">
            <div className="w-full lg:w-3/12 px-4 text-center">
              <div className="text-slate-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                <i className="fas fa-medal text-xl"></i>
              </div>
              <h6 className="text-xl mt-5 font-semibold text-white">
                Excelentes servicios
              </h6>
              <p className="mt-2 mb-4 text-slate-400">
                Conviertase en Bodeguero y comienza a ganar dinero.
              </p>
            </div>
            <div className="w-full lg:w-3/12 px-4 text-center">
              <div className="text-slate-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                <i className="fas fa-poll text-xl"></i>
              </div>
              <h5 className="text-xl mt-5 font-semibold text-white">
                Haga crecer su mercado
              </h5>
              <p className="mt-2 mb-4 text-slate-400">
                Aumente sus ventas con pedidos de todo el Perú, a un click de
                distancia.
              </p>
            </div>
            <div className="w-full lg:w-3/12 px-4 text-center">
              <div className="text-slate-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                <i className="fas fa-lightbulb text-xl"></i>
              </div>
              <h5 className="text-xl mt-5 font-semibold text-white">
                Hora de Reinventarse
              </h5>
              <p className="mt-2 mb-4 text-slate-400">
                Tenga nuevas experiencias con nuestros productos y servicios.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="relative block py-24 lg:pt-0 bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blue-900">
                <form 
                onSubmit={handleSubmit}
                className="flex-auto p-5 lg:p-10">
                  <h4 className="text-2xl font-semibold">
                    ¿Quieres trabajar con nosotros?
                  </h4>
                  <p className="leading-relaxed mt-1 mb-4 text-slate-300">
                    Complete este formulario y nos pondremos en contacto con
                    usted en 24 horas.
                  </p>
                  <div className="relative w-full mb-3 mt-8">
                    <label
                      className="block uppercase text-slate-300 text-sm font-bold mb-2"
                      htmlFor="full-name"
                    >
                      NOMBRE COMPLETO
                    </label>
                    <input
                      type="text"
                      id="full-name"
                      name="name"
                      value={name}
                      onBlur={() => setTosuch({ ...touch, name: true })}
                      className="border-0 px-3 py-3 placeholder-slate-300 text-slate-300 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Nombre Completo"
                      onChange={handleInputChange}
                    />
                    {name === "" && touch.name && (
                      <p className="text-base text-red-600">
                        El nombre es requerido
                      </p>
                    )}
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-slate-300 text-sm font-bold mb-2"
                      htmlFor="email"
                    >
                      CORREO ELECTRÓNICO
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onBlur={() => setTosuch({ ...touch, email: true })}
                      className="border-0 px-3 py-3 placeholder-slate-300 text-slate-300 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Correo Electrónico"
                      onChange={handleInputChange}
                    />
                  </div>
                  {email === "" && touch.email && (
                    <p className="text-base text-red-600">
                      El correo es requerido
                    </p>
                  )}
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-slate-300 text-sm font-bold mb-2"
                      htmlFor="message"
                    >
                      MENSAJE
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={message}
                      onBlur={() => setTosuch({ ...touch, message: true })}
                      className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Escriba su Mensaje..."
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  {message === "" && touch.message && (
                    <p className="text-base text-red-600">
                      El mensaje es requerido
                    </p>
                  )}
                  <div className="text-center mt-6">
                    <button
                      className="bg-slate-800 text-white active:bg-slate-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Enviar
                    </button>
                    <a
                      ref={link}
                      className="hidden"
                      href={`mailto:romelx23@gmail.com?cc=${values.email}&subject=${values.name}&body=${values.message}`}
                    >
                      Email-Link
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LayoutProducts>
  );
};
