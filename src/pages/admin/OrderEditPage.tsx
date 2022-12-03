import { FormikErrors, useFormik } from "formik";
import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LayoutProfile } from "../../components/layout";
import { ListProducts } from "../../components/products";
import { Loader } from "../../components/ui";
import { AuthContext } from "../../context/auth";
import { useOrderDetail, useProducts } from "../../hooks";
interface FormValues {
  name: string;
}
export const OrderEditPage = () => {
  const {
    errors,
    values,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    setValues,
    setTouched,
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
    onSubmit: () => { },
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { getOrderDetails, detail, orderDetail } = useOrderDetail();
  const { products } = useProducts();
  // productos por rol, depende de si es admin o bodeguero
  // const productsByRole = user.rol === "ADMIN_ROLE" ? products :   const handleDelete = (id: string) => {
  // useEffect(() => {
  //   if (id) {
  //     getOrderDetails(id);
  //   }
  // }, []);
  return (
    <LayoutProfile>
      <div className="min-h-[85vh] flex flex-col gap-5 md:gap-0 md:grid md:grid-cols-2">
        {/* <div className="flex flex-col">
          <form onSubmit={handleSubmit}>
            <div className="px-4">
              <h1 className="text-left mb-2 text-xl font-bold">
                Editar Pedido
              </h1>
              <div className="text-left mb-2">
                <label htmlFor="name" className="mb-2">
                  Editar Total
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="off"
                  className="w-full border-2 border-gray-300 px-2 py-1"
                  placeholder="Ingrese el total si desea cambiarlo"
                />
              </div>
              {touched.name && errors.name && (
                <p className="text-red-600 text-left max-w-md w-full">
                  {errors.name}
                </p>
              )}
              <div className="flex flex-col">
                <button
                  type="submit"
                  className="w-full btn my-2 bg-purple-600 text-white hover:bg-purple-700"
                >
                  Actualizar Pedido
                </button>
                <button
                  type="button"
                  className="w-full btn my-2 bg-green-600 text-white hover:bg-green-700"
                >
                  Agregar Producto al Pedido
                </button>
                <button
                  type="button"
                  className="w-full btn my-2 bg-gray-500 text-white hover:bg-gray-700"
                //   onClick={handleCancel}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </form>
          <div className="px-2">
            <ListProducts
              title="Productos"
              quantity={5}
              productsProps={products}
              topTitle="Selecciones los productos que desea agregar al pedido, si desea"
            />
          </div>
        </div>
        <div className="w-full h-full flex flex-col pr-4">
          <h1 className="font-semibold text-2xl">Detalle Pedido</h1>
          <div className="text-left ml-6 py-2">
            <span className="font-semibold">Datos de la Bodega</span>
            <hr />
          </div>
          {orderDetail.bodega.nombre?.length > 0 ? (
            <>
              <div className="text-left ml-6">
                <span className="font-semibold">Bodega:</span>{" "}
                {orderDetail.bodega.nombre}
              </div>
              <div className="text-left ml-6">
                <span className="font-semibold">Telefono:</span>{" "}
                {orderDetail.bodega.telefono}
              </div>
              <div className="text-left ml-6">
                <span className="font-semibold">Dirección:</span>{" "}
                {orderDetail.bodega.direccion}
              </div>
              <div className="text-left ml-6 py-2">
                <img
                  className="h-12 object-cover"
                  src={orderDetail.bodega.imagen}
                  alt="logo_bodega"
                />
              </div>
            </>
          ) : (
            <Loader message="Cargando datos de la bodega" heigth="200px" />
          )}
          <div className="text-left ml-6 py-2">
            <span className="font-semibold">Datos del Pedido</span>
            <hr />
          </div>
          <p className="text-left ml-6">
            <span className="font-semibold">Cliente:</span> {orderDetail.nombre}
          </p>
          <p className="text-left ml-6">
            <span className="font-semibold">Total:</span>{" "}
            {orderDetail.importe.toFixed(2)}
          </p>
          <p className="text-left ml-6">
            <span className="font-semibold">Fecha:</span>{" "}
            {new Date(orderDetail.fecha).toLocaleDateString()}
          </p>
          <p className="text-left ml-6">
            <span className="font-semibold">Estado:</span> {orderDetail.status}
          </p>
          <div className="overflow-x-auto">
            <div className="flex flex-col pl-4 md:pl-0 min-w-full">
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Imagen</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {detail.map((item, i) => {
                    return (
                      <tr key={item._id}>
                        <td>
                          <p className="font-semibold">{i + 1}.-</p>
                        </td>
                        <td>
                          <p className="text-left">{item.producto.name}</p>
                        </td>
                        <td>
                          <p>S/.{item.precio.toFixed(2)}</p>
                        </td>
                        <td>
                          <p>x{item.cantidad}</p>
                        </td>
                        <td className="flex justify-center items-center">
                          <img
                            className="w-12 h-12 border"
                            alt={item.producto.name}
                            src={item.producto.img}
                          />
                        </td>
                        <td>
                          <div className="space-x-2">
                            <button
                              className="btn border-blue-500 text-blue-500 hover:bg-blue-700"
                              onClick={() => handleDelete(item._id)}
                            >
                              <i className="fas fa-plus"></i>
                            </button>
                            <button
                              className="btn border-blue-500 text-blue-500 hover:bg-blue-700"
                              onClick={() => handleDelete(item._id)}
                            >
                              <i className="fas fa-minus"></i>
                            </button>
                            <button
                              className="btn hover:bg-red-700 border-red-500 text-red-500"
                              onClick={() => handleDelete(item._id)}
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div> */}
      </div>
    </LayoutProfile>
  );
};
