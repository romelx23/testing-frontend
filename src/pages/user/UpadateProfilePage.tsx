import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LayoutProfile } from "../../components/layout";
import { MyMapComponent } from "../../components/ui/Map/Map";
import { AuthContext } from "../../context/auth";
import { EditProfileSchema, fetchContoken, fetchSintoken } from "../../helpers";
import { MapContext } from "../../context/map/MapContext";
import Swal from "sweetalert2";
export const UpadateProfilePage = () => {
  const { MyLocation } = useContext(MapContext);
  const navigate = useNavigate();
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
      cellphone: "",
      address: "",
      img: "",
      lat: "",
      lng: "",
    },
    validationSchema: EditProfileSchema,
    onSubmit: (values) => {
      handleUpdate();
    },
  });
  const { user, updateUser } = useContext(AuthContext);
  // console.log(errors, "errors");
  const updateProfile = async () => {
    try {
      const resp = await fetchSintoken(
        `api/usuarios/${user.uid}`,
        {
          nombre: values.name,
          telefono: values.cellphone,
          direccion: values.address,
          img: values.img,
          rol: user.rol,
          correo: user.correo,
        },
        "PUT"
      );
      const data = await resp!.json();
      console.log(data);
      setValues({
        name: "",
        cellphone: "",
        address: "",
        img: "",
        lat: "",
        lng: "",
      });
      updateUser({
        ...user,
        nombre: values.name,
        telefono: values.cellphone,
        direccion: values.address,
        img: values.img,
        latitud: values.lat,
        longitud: values.lng,
      });
      Swal.fire({
        icon: "success",
        title: "Se actualizo correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/user/profile");
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = () => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Una vez actualizado no podras recuperarlo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, actualizarlo!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        updateProfile();
      }
    });
  };

  useEffect(() => {
    console.log(user);
    setValues({
      name: user.nombre,
      cellphone: user.telefono,
      address: user.direccion || "",
      img: user.img,
      lat: `${MyLocation[0]}`,
      lng: `${MyLocation[1]}`,
    });
  }, [MyLocation]);

  return (
    <LayoutProfile>
      <div className="w-full min-h-[85vh] flex flex-col gap-2 px-6">
        <form onSubmit={handleSubmit}>
          <div>
            <div className="flex justify-between">
              <h1 className="text-left font-semibold">Editar Perfil</h1>
              <Link
                to="/user/profile/edit/password"
                type="button"
                title="Editar Contraseña"
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                <i className="fas fa-edit"></i>
              </Link>
            </div>
            <div className="text-left">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                name="name"
                id="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full border-2 border-gray-300 px-2 py-1"
                placeholder="Ingrese el nombre"
              />
              {touched.name && errors.name && (
                <p className="text-red-600 text-left max-w-md w-full">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="text-left">
              <label htmlFor="cellphone">Celular</label>
              <input
                type="text"
                name="cellphone"
                id="cellphone"
                value={values.cellphone}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full border-2 border-gray-300 px-2 py-1"
                placeholder="Ingrese el celular"
              />
              {touched.cellphone && errors.cellphone && (
                <p className="text-red-600 text-left max-w-md w-full">
                  {errors.cellphone}
                </p>
              )}
            </div>
            <div className="text-left">
              <label htmlFor="address">Dirección</label>
              <input
                type="text"
                name="address"
                id="address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full border-2 border-gray-300 px-2 py-1"
                placeholder="Ingrese la dirección"
              />
              {touched.address && errors.address && (
                <p className="text-red-600 text-left max-w-md w-full">
                  {errors.address}
                </p>
              )}
            </div>
            <div className="text-left">
              <label htmlFor="lat">Latitud</label>
              <input
                type="text"
                name="lat"
                id="lat"
                value={values.lat}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full border-2 border-gray-300 px-2 py-1"
                placeholder="Ingrese la dirección"
              />
              {touched.lat && errors.lat && (
                <p className="text-red-600 text-left max-w-md w-full">
                  {errors.lat}
                </p>
              )}
            </div>
            <div className="text-left">
              <label htmlFor="lng">Longitud</label>
              <input
                type="text"
                name="lng"
                id="lng"
                value={values.lng}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full border-2 border-gray-300 px-2 py-1"
                placeholder="Ingrese la dirección"
              />
              {touched.lng && errors.lng && (
                <p className="text-red-600 text-left max-w-md w-full">
                  {errors.lng}
                </p>
              )}
            </div>
            <div className="h-96 overflow-hidden">
              <MyMapComponent />
            </div>
            <div className="text-left">
              <label htmlFor="img">Imagen</label>
              <input
                type="text"
                name="img"
                id="img"
                value={values.img}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full border-2 border-gray-300 px-2 py-1"
                placeholder="Ingrese la imagen"
              />
              {touched.img && errors.img && (
                <p className="text-red-600 text-left max-w-md w-full">
                  {errors.img}
                </p>
              )}
            </div>
          </div>
          <div className="my-2">
            <img
              src={
                values.img
                  ? values.img
                  : "https://aztecsolar.com/wp-content/uploads/2020/05/placeholder-user.jpg"
              }
              alt="imagen"
              title="imagen"
              className="max-w-md max-h-48 mx-auto object-cover"
            />
          </div>
          <button type="submit" className="btn-update my-2 w-full">
            Editar Perfil
          </button>
        </form>
      </div>
    </LayoutProfile>
  );
};
