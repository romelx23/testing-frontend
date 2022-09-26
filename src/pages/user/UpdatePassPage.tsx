import { useFormik } from "formik";
import React from "react";
import Swal from "sweetalert2";
import { LayoutProfile } from "../../components/layout";
import { fetchContoken, UpdatePasswordSchema } from "../../helpers";

export const UpdatePassPage = () => {
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
      password: "",
      password2: "",
      password3: "",
    },
    validationSchema: UpdatePasswordSchema,
    onSubmit: (values) => {
        handleUpdate();
    },
  });

  const updatePassword = async () => {
    try {
      const resp = await fetchContoken(
        `api/usuarios/changePassword`,
        {
          oldPassword: values.password,
          newPassword: values.password2,
        },
        "POST"
      );
      const data = await resp!.json();
      console.log(data);
      setValues({
        password: "",
        password2: "",
        password3: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = () => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¿Deseas actualizar tu contraseña?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, actualizar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        updatePassword();
      }
    });
  };

  return (
    <LayoutProfile>
      <div className="w-full min-h-[85vh] flex flex-col gap-2 px-6">
        <h1 className="text-2xl font-bold text-center">
          Actualizar contraseña
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="text-left">
            <label htmlFor="password" className="text-sm">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full border-2 border-gray-300 px-2 py-1"
              placeholder="Ingrese la contraseña"
            />
            {touched.password && errors.password && (
              <p className="text-red-600 text-left max-w-md w-full">
                {errors.password}
              </p>
            )}
          </div>
          <div className="text-left">
            <label htmlFor="password2" className="text-sm">
              Confirmar contraseña
            </label>
            <input
              type="password"
              name="password2"
              id="password2"
              value={values.password2}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full border-2 border-gray-300 px-2 py-1"
              placeholder="Confirme la contraseña"
            />
            {touched.password2 && errors.password2 && (
              <p className="text-red-600 text-left max-w-md w-full">
                {errors.password2}
              </p>
            )}
          </div>
          <div className="text-left">
            <label htmlFor="password3" className="text-sm">
              Nueva contraseña
            </label>
            <input
              type="password"
              name="password3"
              id="password3"
              value={values.password3}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full border-2 border-gray-300 px-2 py-1"
              placeholder="Ingrese la nueva contraseña"
            />
            {touched.password3 && errors.password3 && (
              <p className="text-red-600 text-left max-w-md w-full">
                {errors.password3}
              </p>
            )}
          </div>
          <div className="flex flex-col items-center justify-center mt-2">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </LayoutProfile>
  );
};
