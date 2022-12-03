import React, { FC, useEffect } from "react";
import { Modal } from "../../ui";
import { FormikErrors, useFormik } from "formik";
import { fetchContoken } from "../../../helpers";
import Swal from "sweetalert2";
import { MarcaI } from "../../../interfaces";
import { useBrands } from "../../../hooks/useBrands";
interface FormValues {
  name: string;
}
interface Props {
  id: string;
}
export const ModalBrand: FC<Props> = ({ id }) => {
  const { brandById, getBrandsById } = useBrands();
  const {
    errors,
    values,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    setValues,
  } = useFormik({
    initialValues: {
      name: "",
    },
    validate: (values: FormValues) => {
      let errors: FormikErrors<FormValues> = {};
      if (!values.name) {
        errors.name = "El Categoría es requerida";
      }
      if (values.name.length < 3 || values.name.length > 20) {
        errors.name = "La Marca debe tener entre 3 y 20 caracteres";
      }

      return errors;
    },
    onSubmit: () => {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Estás seguro de que quieres crear esta marca?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, crear Marca",
        cancelButtonText: "Cancelar",
        showLoaderOnConfirm: true,
      }).then(async (result) => {
        // onSubmit();
        updateMarca(id);
      });
    },
  });
  const updateMarca = async (id: string) => {
    try {
      const resp = await fetchContoken(
        `api/marca/${ id }`,
        {
          nombre: values.name,
        },
        "PUT"
      );
      setValues({
        name: "",
      });
      Swal.fire({
        title: "Categoría actualizada",
        text: "La categoría se ha actualizado correctamente",
        icon: "success",
        confirmButtonText: "Ok",
      });
      const data: MarcaI = await resp!.json();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se ha podido actualizar la categoría",
        icon: "error",
        confirmButtonText: "Ok",
      });
      console.log(error);
    }
  };
  useEffect(() => {
    getBrandsById(id);
    console.log(brandById);
  }, [id]);
  useEffect(() => {
    if (brandById?.name !== undefined) {
      setValues({
        name: brandById.name,
      });
    }
    console.log(values);
  }, [brandById]);

  return (
    <Modal>
      <form onSubmit={handleSubmit} className="bg-slate-800 py-4">
        <div className="px-4">
          <h1 className="text-left mb-2 text-xl font-bold">Actualizar Marca</h1>
          <div className="text-left mb-2">
            <label htmlFor="name" className="mb-2">
              Nombre de la Marca
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full border-2 border-gray-300 px-2 py-1"
              placeholder="Ingrese el nombre de la categoría"
            />
          </div>
          {touched.name && errors.name && (
            <p className="text-red-600 text-left max-w-md w-full">
              {errors.name}
            </p>
          )}
          <button
            type="submit"
            className="w-full btn my-2 bg-purple-500 text-white hover:bg-purple-700"
          >
            Actualizar Categoría
          </button>
        </div>
      </form>
    </Modal>
  );
};
