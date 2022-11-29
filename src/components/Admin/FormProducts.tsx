import { FormikErrors, useFormik } from "formik";
import React, { FC, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/auth";
import { ProductContext } from "../../context/product";
import { ProductSchema } from "../../helpers";
import { fetchContoken } from "../../helpers/fetch";
import { fileUpload } from "../../helpers/fileUpload";
import { useCategories, useUpload } from "../../hooks";
import { useBrands } from "../../hooks/useBrands";
import { ProductoResponseError } from "../../interfaces";
import { Producto } from "../../interfaces/product";
import { Spinner } from "../ui";

interface FormValues {
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
  stock: string;
  marca: string;
}

interface Props {
  producto?: Producto;
}

export const FormProducts: FC<Props> = ({ producto }) => {
  // const [category, setCategory] = useState<CategoriaI[]>([]);
  const { categories } = useCategories();
  const { user } = useContext(AuthContext);
  const { brands } = useBrands();
  const [url, setUrl] = useState("");
  const { pathname } = useLocation();
  const { startUploading, product } = useContext(ProductContext);
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
      price: "",
      description: "",
      category: "",
      image: "",
      stock: "",
      marca: "",
    },
    validate: (values: FormValues) => {
      let errors: FormikErrors<FormValues> = {};
      if (parseInt(values.price) <= 0) {
        errors.price = "El precio debe ser mayor a 0";
      }

      return errors;
    },
    validationSchema: ProductSchema,
    onSubmit: () => {
      if (producto?.name) {
        handleUpdate();
      } else {
        handleCreate();
      }
    },
  });

  const AddProduct = async () => {
    console.log(errors, "errors");
    console.log(values, "values");
    if (Object.keys(errors).length === 0) {
      const resp = await fetchContoken(
        "api/products",
        {
          name: values.name,
          price: values.price,
          description: values.description,
          img: url,
          category: values.category,
          stock: parseInt(values.stock),
          user: user.uuid,
          brand: values.marca,
        },
        "POST"
      );
      const data: ProductoResponseError = await resp!.json();
      console.log(data, "data upload");
      if (user.role.name === "BODEGUERO_ROLE") {
        navigate("/gestion/productos");
      }
      if (user.role.name === "ADMIN_ROLE") {
        navigate("/admin/products");
      }
    }
  };
  const handleCreate = () => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Esta acción no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, crear",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        AddProduct();
      }
    });
  };

  const updateProduct = async () => {
    console.log(values, "values");
    console.log(errors, "errors");
    if (Object.keys(errors).length === 0) {
      const resp = await fetchContoken(
        `api/products/${producto!._id}`,
        {
          name: values.name,
          price: values.price,
          description: values.description,
          img: url,
          category: values.category,
          stock: values.stock,
          brand: values.marca
        },
        "PUT"
      );
      const data: ProductoResponseError = await resp!.json();
      console.log(data, "data upload");
      if (user.role.name === "BODEGUERO_ROLE") {
        navigate("/gestion/productos");
      }
      if (user.role.name === "ADMIN_ROLE") {
        navigate("/admin/products");
      }
    }
  };

  const handleUpdate = () => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Esta acción no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, actualizar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        updateProduct();
      }
    });
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    console.log(e.target.files);
    if (file) {
      // console.log('file',file);
      const resp: string = await fileUpload(file);
      console.log(resp);
      setUrl(resp);
    }
  };

  useEffect(() => {
    if (producto?.name) {
      setValues({
        name: producto?.name ? producto.name : "",
        price: producto?.price ? `${producto?.price}` : "",
        description: producto?.description ? producto?.description : "",
        category: producto?.category.name ? producto?.category._id : "",
        image: producto?.img ? producto?.img : "",
        stock: producto?.stock ? `${producto?.stock}` : "0",
        marca: producto?.brand ? producto?.brand._id : "",
      });
      setUrl(producto?.img ? producto?.img : "");
    }
    console.log(producto, "producto 189");
  }, [producto]);

  return (
    <>
      {producto?.name || pathname === '/gestion/producto/agregar' ? (
        <form
          onSubmit={handleSubmit}
          className="w-full min-h-[85vh] grid grid-cols-1 md:grid-cols-2"
        >
          <div className="px-4">
            {producto?.name ? (
              <h1 className="text-left font-semibold">Editar Producto</h1>
            ) : (
              <h1 className="text-left font-semibold">Agregar Producto</h1>
            )}
            <div className="text-left">
              <label htmlFor="name">Nombre del Producto</label>
              <input
                type="text"
                name="name"
                id="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full border-2 border-gray-300 px-2 py-1"
                placeholder="Ingrese el producto"
              />
              {touched.name && errors.name && (
                <p className="text-red-600 text-left max-w-md w-full">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="text-left">
              <label htmlFor="price">Precio del Producto</label>
              <input
                type="number"
                name="price"
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full border-2 border-gray-300 px-2 py-1"
                id="price"
                placeholder="Ingrese el precio del producto"
              />
              {touched.price && errors.price && (
                <p className="text-red-600 text-left max-w-md w-full">
                  {errors.price}
                </p>
              )}
            </div>
            <div className="text-left">
              <label htmlFor="stock">Cantidad del Producto</label>
              <input
                type="number"
                name="stock"
                value={values.stock}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full border-2 border-gray-300 px-2 py-1"
                id="stock"
                placeholder="Ingrese el cantidad del producto"
              />
              {touched.stock && errors.stock && (
                <p className="text-red-600 text-left max-w-md w-full">
                  {errors.stock}
                </p>
              )}
            </div>
            <div className="text-left">
              <label htmlFor="description">Descripción del Producto</label>
              <textarea
                className="w-full border-2 border-gray-300 px-2 py-1"
                id="description"
                name="description"
                placeholder="Ingrese la descripción del producto"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.description && errors.description && (
                <p className="text-red-600 text-left max-w-md w-full">
                  {errors.description}
                </p>
              )}
            </div>
            <div className="text-left">
              <label htmlFor="nombre">Categoría del Producto</label>
              {/* obetener las categorías */}
              <select
                name="category"
                id="category"
                value={values.category}
                onBlur={handleBlur}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 px-2 py-1"
              >
                <option value="">Seleccione una categoría</option>
                {categories.map((item) => {
                  return (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
              {touched.category && errors.category && (
                <p className="text-red-600 text-left max-w-md w-full">
                  {errors.category}
                </p>
              )}
            </div>
            <div className="text-left">
              <label htmlFor="nombre">Marca del Producto</label>
              {/* obetener las categorías */}
              <select
                name="marca"
                id="marca"
                value={values.marca}
                onBlur={handleBlur}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 px-2 py-1"
              >
                <option value="">Seleccione una marca</option>
                {brands.map((item) => {
                  return (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
              {touched.marca && errors.marca && (
                <p className="text-red-600 text-left max-w-md w-full">
                  {errors.marca}
                </p>
              )}
            </div>
            {producto?.name ? (
              <button
                type="submit"
                className="w-full btn my-2 bg-purple-500 text-white hover:bg-purple-700"
              >
                Editar Producto
              </button>
            ) : (
              <button
                type="submit"
                className="w-full btn my-2 bg-blue-500 text-white hover:bg-blue-700"
              >
                Agregar Producto
              </button>
            )}
          </div>
          <div className="w-full flex flex-col">
            <input
              type="file"
              name="image"
              className="w-full border-2 border-gray-300 px-2 py-1 object-cover"
              id="image"
              placeholder="Ingrese la descripción del producto"
              onChange={handleImage}
              onBlur={handleBlur}
            />
            <div className="w-full flex justify-center py-10">
              <img
                src={
                  url
                    ? url
                    : "https://www.giulianisgrupo.com/wp-content/uploads/2018/05/nodisponible.png"
                }
                alt="producto"
                className="w-96 object-cover"
              />
            </div>
          </div>
        </form>
      ) : (
        <div className="flex flex-col justify-center items-center opacity-60 min-h-[50vh]">
          <h1 className="font-extralight">Cargando los datos</h1>
          <Spinner />
        </div>
      )}
    </>
  );
};
