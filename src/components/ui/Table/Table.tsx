import React, { FC, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { UIContext } from "../../../context/ui";
interface Props {
  thead: Thead[];
  elements: any[];
  trow?: Trow[];
  title?: string;
  print?: boolean;
  onSubmit?: () => void;
  getElements?: () => void;
  editElement?: (id: string) => void;
  deleteElement?: (id: string) => void;
  buttons?: Buttons[];
  add?: boolean;
  edit?: boolean;
  del?: boolean;
  EditComponent?:React.ElementType;
}

interface Thead {
  name: string;
  icon?: string;
}

interface Trow {
  name: string;
}

interface Elements {}

interface Buttons {
  name: string;
  className: string;
  icon?: string;
  method?: (id?: string) => void;
}

export const TableComponent: FC<Props> = ({
  elements,
  thead,
  buttons,
  title,
  print,
  add,
  edit,
  del,
  onSubmit,
  getElements,
  deleteElement,
  editElement,
  EditComponent,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [items, setItems] = useState(elements);
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("5");
  const [id, setId] = useState("");
  const { toggleModal } = useContext(UIContext);
  const handlePrint = () => {
    window.print();
  };
  // handle getElements
  const handleGetElements = () => {
    if(getElements) getElements();
  }
  
  // Agregar Funcion Agregar
  const addElement = () => {
    console.log("Agregar");
  };

  // Agregar Funcion Eliminar 
  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, no podrás recuperar este registro",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        console.log(id);
        if (deleteElement) deleteElement(id);
      }
    }
    );
  };

  // Agregar Funcion Editar 
  const handleEdit = async (id: string) => {
    // Swal.fire({
    //   showConfirmButton: false,
    //   html
    // })
    setId(id);
    toggleModal(true);
  };

  // Filtrar los elementos
  useEffect(() => {
    setItems(filteredItems);
    console.log('filteredItems');
  }, [currentPage, search, select,elements,onSubmit]);

  const filteredItems = () => {
    if (search.length === 0) {
      return elements.slice(currentPage, currentPage + parseInt(select));
    }
    // console.log(search);
    const filtered = elements.filter((element) =>
      element.nombre.toLowerCase().includes(search.toLowerCase())
    );
    return filtered.slice(currentPage, currentPage + parseInt(select));
  };

  const nextPage = () => {
    if (
      elements.filter((element) =>
        element.nombre.toLowerCase().includes(search.toLowerCase())
      ).length >
      currentPage + parseInt(select)
    ) {
      setCurrentPage(currentPage + parseInt(select));
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - parseInt(select));
      // console.log("prevPage");
    }
  };

  const searchElement = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCurrentPage(0);
    setSearch(value);
  };

  return (
    <div className="w-full">
      {
        EditComponent && <EditComponent id={id}/>
      }
      <div className="flex flex-col  mx-6">
        <div className="flex justify-between">
          <h1 className="text-left mb-2 text-xl font-bold">{title}</h1>
          <h1 className="text-left mb-2 text-xl font-bold">
            Total: {elements.length}{" "}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex justify-center items-center gap-2 flex-1">
            <h1 className="font-semibold">Buscar :</h1>
            <input
              className="flex-1 mx-3 bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Buscar"
              value={search}
              onChange={searchElement}
            />
          </div>
          <div className="flex mt-3 md:mt-0 items-center gap-2 md:justify-center">
            {add ? (
              <>
                <h1 className="font-semibold">Agregar {title}</h1>

                <button className="btn border-green-500 text-green-500 hover:bg-green-700">
                  +{/* <i className="fas fa-plus"></i> */}
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
      <div className="py-2 overflow-x-auto px-6 pr-10 ">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-gray-900 shadow-dashboard px-8 pt-3 rounded-lg h-[44vh] print:bg-black print:px-0 print:pl-6 print:break-before-avoid-page overflow-y-auto">
        <div className="flex justify-end">
        <select 
        name="row" 
        id="row"
        value={select}
        onChange={(e) => setSelect(e.target.value)}
        >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
          <table className="min-w-full print:overflow-hidden">
            <thead>
              <tr>
                <th className="th">ID</th>
                {thead.map((th, i) => {
                  return (
                    <th className="th" key={i}>
                      {th.name}
                    </th>
                  );
                })}
                {edit || del ? <th className="th">Acciones</th> : null}
                {print && (
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-white">
                    <button
                      onClick={handlePrint}
                      className="btn border-cyan-500 text-cyan-500 hover:bg-cyan-700 print:hidden "
                    >
                      Imprimir Productos
                    </button>
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="">
              {items.map((element, i) => (
                <tr className="font-semibold text-lg" key={i}>
                  <td className="td">
                    <div className="flex items-center">
                      <div className=" leading-5 text-white">
                        {i + currentPage + 1}
                      </div>
                    </div>
                  </td>
                  <td className="td">
                    <div className=" leading-5 text-white text-left">
                      {element.nombre.toLowerCase()}
                    </div>
                  </td>
                  {edit || del ? (
                    <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5 space-x-2 print:hidden">
                      <div className="flex gap-2 items-center">
                        {edit ? (
                          <button
                            onClick={() => {handleEdit(element._id)}}
                            className="btn border-blue-500 text-blue-500 hover:bg-blue-700"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                        ) : null}

                        {del ? (
                          <button
                            onClick={() => {handleDelete(element._id)}}
                            className="btn hover:bg-red-700 border-red-500 text-red-500"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        ) : null}
                      </div>
                    </td>
                  ) : null}
                </tr>
              ))}
              {elements.length <= 0 && (
                <tr className="font-semibold text-lg columns-4">
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 print:border-none">
                    <p className="text-white"> No hay {title} con ese nombre</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <nav aria-label="flex w-full justify-center">
          <ul className="inline-flex -space-x-px">
            <li onClick={prevPage}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                }}
                className={`btn-prev
                ${currentPage > 0 && "disabled:bg-gray-300"}
                `}
              >
                Atrás
              </a>
            </li>
            <li onClick={nextPage}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="btn-next"
              >
                Adelante
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
