import { FormikErrors, useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { LayoutProfile } from "../../components/layout";
import { fetchContoken, fetchSintoken } from "../../helpers";
import { CategoryI, CategoryResponse } from "../../interfaces";
import { getCategories } from "../../helpers/products";
import Swal from "sweetalert2";
import { usePaginate } from "../../hooks";
import { useCategories } from "../../hooks/useCategories";
import { AuthContext } from "../../context/auth";
interface FormValues {
  name: string;
}

export const CategoryAdminPage = () => {
  const { categories, getCategories } = useCategories();
  const [active, setActive] = useState(false);
  const [select, setSelect] = useState({} as CategoryI);
  const { user } = useContext(AuthContext);
  const canActions = user.rol === "ADMIN_ROLE";
  const {
    prevPage,
    nextPage,
    currentPage,
    items,
    search,
    searchItemsInput,
    quantity,
    handleSearchPage,
  } = usePaginate(categories);
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
        errors.name = "La Categoría debe tener entre 3 y 20 caracteres";
      }

      return errors;
    },
    onSubmit: () => {
      submitCategory();
    },
  });
  // console.log(values,"values");
  const submitCategory = async () => {
    const categoria = categories.find((c) => c.nombre === values.name);
    if (categoria) {
      Swal.fire({
        title: "Error",
        text: "La Categoría ya existe",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    active
      ? Swal.fire({
          title: "¿Estás seguro?",
          text: "¿Deseas guardar la Categoría?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.value) {
            createCategoria();
          }
        })
      : Swal.fire({
          title: "¿Estás seguro?",
          text: "¿Deseas editar la Categoría?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.value) {
            updateCatgoria(select._id);
          }
        });
  };

  const createCategoria = async () => {
    try {
      const resp = await fetchSintoken(
        `api/categorias`,
        {
          nombre: values.name,
        },
        "POST"
      );
      setValues({
        name: "",
      });
      setTouched({
        name: false,
      });
      getCategories();
      Swal.fire({
        title: "Categoría creada",
        text: "La categoría se ha creado correctamente",
        icon: "success",
        confirmButtonText: "Ok",
      });
      const data: CategoryI = await resp!.json();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se ha podido crear la categoría",
        icon: "error",
        confirmButtonText: "Ok",
      });
      console.log(error);
    }
  };

  const deleteCategoría = async (id: string) => {
    const resp = await fetchContoken(`api/categorias/${id}`, {}, "DELETE");
    const data = await resp!.json();
    Swal.fire({
      title: "Eliminado",
      text: "La categoría se ha eliminado correctamente",
      icon: "success",
      confirmButtonText: "Ok",
    });
    getCategories();
  };

  const updateCatgoria = async (id: string) => {
    try {
      const resp = await fetchContoken(
        `api/categorias/${id}`,
        {
          nombre: values.name,
        },
        "PUT"
      );
      const data = await resp!.json();
      Swal.fire({
        title: "Marca Actualizada",
        text: "La marca se ha actualizado correctamente",
        icon: "success",
        confirmButtonText: "Ok",
      });
      setValues({
        name: "",
      });
      setTouched({
        name: false,
      });
      getCategories();
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

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas eliminar la categoría?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.value) {
        deleteCategoría(id);
      }
    }
    );
  }


  const setCategory = (categoria: CategoryI) => {
    setActive(true);
    setValues({
      name: categoria.nombre,
    });
    setSelect(categoria);
  };

  const handleCancel = () => {
    setValues({
      name: "",
    });
    setActive(false);
    setSelect({} as CategoryI);
  };

  return (
    <LayoutProfile>
      <div className="min-h-[85vh] flex flex-col gap-5 md:gap-0 md:grid md:grid-cols-2">
        <form onSubmit={handleSubmit}>
          <div className="px-4">
            <h1 className="text-left mb-2 text-xl font-bold">
              Agregar Categoría
            </h1>
            <div className="text-left mb-2">
              <label htmlFor="name" className="mb-2">
                Nombre de la Categoría
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
            {active ? (
              <div className="flex flex-col">
                <button
                  type="submit"
                  className="w-full btn my-2 bg-purple-500 text-white hover:bg-purple-700"
                >
                  Actualizar Categoría
                </button>
                <button
                  type="button"
                  className="w-full btn my-2 bg-gray-500 text-white hover:bg-gray-700"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full btn my-2 bg-blue-500 text-white hover:bg-blue-700"
              >
                Agregar Categoría
              </button>
            )}
          </div>
        </form>
        <div className="w-full">
          <div className="flex justify-between mx-6">
            <h1 className="text-left mb-2 text-xl font-bold">
              Tabla Categorías
            </h1>
            <input
              type="text"
              name="search"
              id="search"
              value={search}
              onChange={searchItemsInput}
              className="input-search"
              placeholder="Buscar Categoría"
              autoComplete="off"
            />
          </div>
          <div className="table-content">
            <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-gray-900 shadow-dashboard px-8 pt-3 rounded-lg min-h-[40vh] print:bg-black print:px-0 print:pl-6 print:break-before-avoid-page">
              <table className="min-w-full print:overflow-hidden">
                <thead>
                  <tr>
                    <th className="th">ID</th>
                    <th className="th">Nombre</th>
                    <th className="th">Estado</th>
                    {canActions && <th className="th">Acciones</th>}
                  </tr>
                </thead>
                <tbody className="">
                  {items.map((category, i) => (
                    <tr className="font-semibold text-lg" key={category._id}>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 print:border-none">
                        <div className="flex items-center">
                          <div>
                            <div className=" leading-5 text-white">
                              {i + currentPage + 1}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                        <div className=" leading-5 text-white text-left">
                          {category.nombre.toLocaleLowerCase()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b text-white border-gray-500 leading-5 text-left">
                        activado
                      </td>
                      {canActions && (
                        <td className="td">
                          <div className="flex gap-2 items-center">
                            <button
                              onClick={() => {
                                setCategory(category);
                              }}
                              className="btn border-blue-500 text-blue-500 hover:bg-blue-700"
                            >
                              <i className="fas fa-edit"></i>
                            </button>

                            <button
                              onClick={() => {
                                handleDelete(category._id);
                              }}
                              className="btn hover:bg-red-700 border-red-500 text-red-500"
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <nav aria-label="Page navigation example">
              <ul className="inline-flex -space-x-px">
                <li onClick={prevPage} className="btn-prev">
                  Previous
                </li>
                {Array.from({ length: quantity }, (_, i) => (
                  <li
                    key={i}
                    className={`btn-page ${
                      i + 1 === currentPage ? "active" : ""
                    }`}
                    onClick={() => {
                      handleSearchPage(i);
                    }}
                  >
                    {i + 1}
                  </li>
                ))}
                <li onClick={nextPage} className="btn-next">
                  Next
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </LayoutProfile>
  );
};
