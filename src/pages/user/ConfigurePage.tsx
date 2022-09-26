import React, { useContext, useState } from "react";
import { LayoutProfile } from "../../components/layout";
import { UIContext } from "../../context/ui";

export const ConfigurePage = () => {
  const {ToggleTheme,toggleTheme}=useContext(UIContext);
  const handleChange=()=>{
    toggleTheme(!ToggleTheme);
  }
  console.log(ToggleTheme);

  return (
    <LayoutProfile>
      <div className="min-h-[85vh] flex flex-col gap-5 md:gap-0 md:grid md:grid-cols-2">
        <div className="px-4">
          <h1 className="text-left mb-2 text-xl font-bold">Modo Oscuro</h1>
          <div className="text-left">
            <label
              htmlFor="status"
              className="inline-flex relative items-center cursor-pointer"
            >
              <input
                type="checkbox"
                // value=""
                value={`${ToggleTheme}`}
                checked={ToggleTheme}
                // onBlur={handleBlur}
                onChange={handleChange}
                name="status"
                id="status"
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                {ToggleTheme?'On':'Off'}
              </span>
            </label>
          </div>
          <div className="text-left">
            <label
              className="text-left mb-2 text-xl font-bold"
              htmlFor="nombre"
            >
              Elíja su Idioma
            </label>
            {/* obetener las categorías */}
            <select
              name="category"
              id="category"
              // value={values.category}
              // onBlur={handleBlur}
              // onChange={handleChange}
              className="w-full border-2 border-gray-300 px-2 py-1"
            >
              <option value="">Seleccione su Idioma</option>
              <option value="">Español</option>
              <option value="">Ingles</option>
              <option value="">Portugues</option>
              {/* {category.map((item: CategoriaI) => {
                return (
                  <option key={item._id} value={item._id}>
                    {item.nombre}
                  </option>
                );
              })} */}
            </select>
            {/* {touched.category && errors.category && (
              <p className="text-red-600 text-left max-w-md w-full">
                {errors.category}
              </p>
            )} */}
          </div>
        <div className="px-4">
          <p>( próximamente )</p>
        </div>
        </div>
        <div className="w-full">{/* <h1>Otra columna</h1> */}</div>
      </div>
    </LayoutProfile>
  );
};
