import * as Yup from "yup";
import { withFormik, FormikProps, FormikErrors, Form, Field } from "formik";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth";
import Swal from "sweetalert2";
interface FormValues {
  email: string;
  password: string;
}

interface OtherProps {
  message: string;
}

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting, message, values } = props;
  const { startLogin } = useContext(AuthContext);
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = values;
    startLogin(email, password);
    // console.log(values,"values");
  }

  return (
    <div className="w-full flex justify-center">
      <Form className="flex flex-col gap-2 w-full items-center " onSubmit={handleLogin}>
        <h1>{message}</h1>
        <Field
          type="email"
          name="email"
          id="email"
          placeholder="Ingrese su email"
          className="max-w-md w-full p-3 border-2 shadow-md rounded-3xl"
        />
        {touched.email && errors.email && (
          <p className="text-red-600 text-left max-w-md w-full">{errors.email}</p>
        )}

        <Field
          type="password"
          name="password"
          id="password"
          placeholder="Ingrese su password"
          className="max-w-md w-full p-3 border-2 shadow-md rounded-3xl"
        />
        {touched.password && errors.password && (
          <p className="text-red-600 text-left max-w-md w-full">{errors.password}</p>
        )}

        <button
          id="btn-submit"
          onClick={() => handleLogin} type="submit" className="btn-submit" disabled={isSubmitting}>
          Ingresar
        </button>
        {/* <button onClick={() => {
          Swal.fire({
            title: '¿Estas seguro?',
            text: "No podras revertir esto!",
            icon: 'warning',
            timer: 5000,
          })
        }} className="btn-submit">
          <img
            className="google-icon"
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="google button"
          />
          Iniciar sesión con Google
        </button> */}
        {
          isSubmitting && (
            <p className="text-green-600 text-center max-w-md w-full">Formulario enviado correctamente</p>
          )
        }
      </Form>
    </div>
  );
};

interface MyFormProps {
  initialEmail?: string;
  message: string; // if this passed all the way through you might do this or make a union type
}

export const MyForm = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      email: props.initialEmail || "",
      password: "",
    };
  },

  // Add a custom validation function (this can be async too!)
  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};
    if (!values.email) {
      errors.email = "El email es requerido";
    } else if (!values.email.includes("@")) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "La contraseña es requerida";
    }

    return errors;
  },

  handleSubmit: (values) => {
    // do submitting things
    console.log(values);

  },

})(InnerForm);
