import { FormikErrors, useFormik } from "formik";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth";
import { SignupSchema } from "../../../helpers";
interface FormValues {
  email: string;
  password: string;
  password2: string;
  name: string;
}

export const FormRegister = () => {
  const { startRegister } = useContext(AuthContext);
  const { errors, values, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        password2: "",
      },
      validate: (values: FormValues) => {
        let errors: FormikErrors<FormValues> = {};
        //   validacion password==password2
        if(!values.password2){
          errors.password2="Ingrese denuevo la contraseña"
        }
        if (values.password !== values.password2) {
          errors.password2 = "Las contraseñas no coinciden";
        }
        return errors;
      },
      validationSchema: SignupSchema,
      onSubmit: (values) => {
        console.log(values);
      },
    });
  const handleRegister = () => {
    startRegister(values.name, values.email, values.password, values.password2);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-register">
        <h3 className="text-blue-600 font-semibold text-lg ">
          Bienvenido a tú comunidad profesional
        </h3>
        <img
          className="rounded-full object-cover h-96 w-96 lg:m-auto"
          src="https://cdn.searchenginejournal.com/wp-content/uploads/2019/06/linkedin-rebrand-760x400.png"
          alt="linkedin"
        />
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-left ml-2">
            <span className="text-gray-600 text-sm">Nombre</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className="max-w-md w-full p-3 border-2 shadow-md rounded-3xl"
            placeholder="Nombre de Usuario"
          />
          {touched.name && errors.name && (
            <p className="text-red-600 text-left max-w-md w-full">
              {errors.name}
            </p>
          )}
          <label htmlFor="email" className="text-left ml-2">
            <span className="text-gray-600 text-sm">Correo</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="max-w-md w-full p-3 border-2 shadow-md rounded-3xl"
            placeholder="Email"
          />
          {touched.email && errors.email && (
            <p className="text-red-600 text-left max-w-md w-full">
              {errors.email}
            </p>
          )}
          <label htmlFor="password" className="text-left ml-2">
            <span className="text-gray-600 text-sm">Contraseña</span>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className="max-w-md w-full p-3 border-2 shadow-md rounded-3xl"
            placeholder="Contraseña"
          />
          <label htmlFor="name" className="text-left ml-2">
            <span className="text-gray-600 text-sm">
              Ingrese de nuevo la contraseña
            </span>
          </label>
          {touched.password && errors.password && (
            <p className="text-red-600 text-left max-w-md w-full">
              {errors.password}
            </p>
          )}
          <input
            type="password"
            name="password2"
            id="password2"
            value={values.password2}
            onChange={handleChange}
            onBlur={handleBlur}
            className="max-w-md w-full p-3 border-2 shadow-md rounded-3xl"
            placeholder="Confirmar contraseña"
          />
          {touched.password2 && errors.password2 && (
            <p className="text-red-600 text-left max-w-md w-full">
              {errors.password2}
            </p>
          )}
        </div>
        <button
        onClick={handleRegister}
          type="submit"
          className="btn-submit"
        >
          Registrarme
        </button>
        {/* <button className="max-w-md w-full flex justify-center gap-2 mt-3 p-3 border-2 shadow-md rounded-3xl hover:bg-blue-600 hover:text-white">
          <img
            className="google-icon"
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="google button"
          />
          Registrarme con Google
        </button> */}
      </div>
    </form>
  );
};
