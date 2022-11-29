import { FormikErrors, useFormik } from "formik";
import { useState } from "react";
import Swal from "sweetalert2";
import { LayoutProfile } from "../../components/layout";
import { AuthContext } from "../../context/auth";
import { fetchContoken } from "../../helpers";
import { usePaginate } from "../../hooks";
import { useBrands } from "../../hooks/useBrands";
import { MarcaI } from "../../interfaces";
interface FormValues {
  name: string;
  description: string;
}
export const BrandAdminPage = () => {
  const { brands, getBrands } = useBrands();
  const [active, setActive] = useState(false);
  const [select, setSelect] = useState({} as MarcaI);
  const {
    prevPage,
    nextPage,
    currentPage,
    items,
    search,
    searchItemsInput,
    quantity,
    handleSearchPage,
  } = usePaginate(brands);

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
      description: "",
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
      onFormSubmit();
    },
  });
  const onFormSubmit = () => {
    const marca = brands.filter(
      (brand) => brand.name.toLowerCase() === values.name.toLowerCase()
    );
    if (marca.length > 0) {
      Swal.fire({
        title: "Error",
        text: "La Marca ya existe",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    active
      ? Swal.fire({
        title: "¿Estas seguro?",
        text: "Esta acción no se puede revertir",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, editar Marca",
      }).then((result) => {
        if (result.value) {
          updateMarca(select._id);
        }
      })
      : Swal.fire({
        title: "¿Estas seguro?",
        text: "Esta acción no se puede revertir",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, agregar Marca",
      }).then((result) => {
        if (result.value) {
          createMarca();
          getBrands();
        }
      });
  };
  const createMarca = async () => {
    try {
      const resp = await fetchContoken(
        `api/brands`,
        {
          name: values.name,
          description: values.description,
        },
        "POST"
      );
      setValues({
        name: "",
        description: "",
      });
      setTouched({
        name: false,
      });
      getBrands();
      Swal.fire({
        title: "Categoría creada",
        text: "La categoría se ha creado correctamente",
        icon: "success",
        confirmButtonText: "Ok",
      });
      const data: MarcaI = await resp!.json();
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
  const updateMarca = async (id: string) => {
    try {
      const resp = await fetchContoken(
        `api/brands/${id}`,
        {
          name: values.name,
          description: values.description,
        },
        "PUT"
      );
      setValues({
        name: "",
        description: "",
      });
      setTouched({
        name: false,
      });
      getBrands();
      setActive(false);
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
  const deleteMarca = async (id: string) => {
    try {
      const resp = await fetchContoken(`api/brands/${id}`, {}, "DELETE");
      getBrands();
      Swal.fire({
        title: "Categoría eliminada",
        text: "La categoría se ha eliminado correctamente",
        icon: "success",
        confirmButtonText: "Ok",
      });
      const data: MarcaI = await resp!.json();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se ha podido eliminar la categoría",
        icon: "error",
        confirmButtonText: "Ok",
      });
      console.log(error);
    }
  };
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Esta acción no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar Marca",
    }).then((result) => {
      if (result.value) {
        deleteMarca(id);
      }
    }
    );
  }
  const setBrand = (marca: MarcaI) => {
    if (marca.name.length > 0) {
      setActive(true);
      setValues({
        name: marca.name,
        description: marca.description,
      });
      setSelect(marca);
    }
  };

  const handleEdit = (id: string) => {
    const marca = brands.find((m) => m._id === id);
    if (marca) {
      setValues({
        name: marca.name,
        description: marca.description,
      });
    }
  };

  const handleCancel = () => {
    setValues({
      name: "",
      description: "",
    });
    setActive(false);
    setSelect({} as MarcaI);
  };

  return (
    <LayoutProfile>
      <div className="min-h-[85vh] flex flex-col gap-5 md:gap-0 md:grid md:grid-cols-2">
        <form onSubmit={handleSubmit}>
          <div className="px-4">
            <h1 className="text-left mb-2 text-xl font-bold">Agregar Marca</h1>
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
                autoComplete="off"
                className="w-full border-2 border-gray-300 px-2 py-1"
                placeholder="Ingrese el name de la categoría"
              />
            </div>
            {touched.name && errors.name && (
              <p className="text-red-600 text-left max-w-md w-full">
                {errors.name}
              </p>
            )}
            <div className="text-left mb-2">
              <label htmlFor="description" className="mb-2">
                Descripción de la Marca
              </label>
              <input
                type="text"
                name="description"
                id="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
                className="w-full border-2 border-gray-300 px-2 py-1"
                placeholder="Ingrese el name de la categoría"
              />
            </div>
            {touched.description && errors.description && (
              <p className="text-red-600 text-left max-w-md w-full">
                {errors.description}
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
                Agregar Marca
              </button>
            )}
          </div>
        </form>

        <div className="w-full">
          <div className="flex justify-between mx-6">
            <h1 className="text-left mb-2 text-xl font-bold">Tabla Marcas</h1>
            <input
              type="text"
              name="search"
              id="search"
              value={search}
              onChange={searchItemsInput}
              className="input-search"
              placeholder="Buscar Marca"
              autoComplete="off"
            />
          </div>
          <div className="table-content">
            <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-gray-900 shadow-dashboard px-8 pt-3 rounded-lg h-[45vh] print:bg-black print:px-0 print:pl-6 print:break-before-avoid-page">
              <table className="min-w-full print:overflow-hidden">
                <thead>
                  <tr>
                    <th className="th">ID</th>
                    <th className="th">name</th>
                    <th className="th">Estado</th>
                    <th className="th">Acciones</th>
                  </tr>
                </thead>
                <tbody className="">
                  {items.map((brand, i) => (
                    <tr className="font-semibold text-lg" key={brand._id}>
                      <td className="td print:border-none">
                        <div className="flex items-center">
                          <div>
                            <div className=" leading-5 text-white">
                              {i + currentPage + 1}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="td">
                        <div className=" leading-5 text-white text-left">
                          {brand.name.toLocaleLowerCase()}
                        </div>
                      </td>
                      <td className="td text-left">
                        activado
                      </td>
                      <td className="td text-sm text-right space-x-2 print:hidden">
                        <div className="flex gap-2 items-center">
                          <button
                            onClick={() => {
                              setBrand(brand);
                            }}
                            className="btn border-blue-500 text-blue-500 hover:bg-blue-700"
                          >
                            <i className="fas fa-edit"></i>
                          </button>

                          <button
                            onClick={() => {
                              handleDelete(brand._id);
                            }}
                            className="btn hover:bg-red-700 border-red-500 text-red-500"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <nav aria-label="Page navigation example" className="mt-4">
              <ul className="inline-flex -space-x-px">
                <li onClick={prevPage} className="btn-prev">
                  Previous
                </li>
                {Array.from({ length: quantity }, (_, i) => (
                  <li
                    key={i}
                    className={`btn-page ${i + 1 === currentPage ? "active" : ""
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
