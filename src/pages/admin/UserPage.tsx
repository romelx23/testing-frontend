import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { LayoutProfile } from "../../components/layout";
import { SelectRole } from "../../components/ui";
import { AuthContext } from "../../context/auth";
import { fetchContoken, fetchSintoken } from "../../helpers";
import { usePaginate } from "../../hooks";
import {
  Role,
  RoleResponse,
  Usuario,
  UsuariosResponse,
} from "../../interfaces";

export const UserPage = () => {
  const [user, setUser] = useState<Usuario[]>([]);
  const { user: userContext } = useContext(AuthContext);
  const { items, nextPage, prevPage, currentPage, search, searchItemsInput } = usePaginate(user);

  const handleUsers = async () => {
    const resp = await fetchSintoken(
      `api/users?offset=0&limit=20`,
      {},
      "GET"
    );
    const data: UsuariosResponse = await resp!.json();
    // console.log(resp);
    setUser(data.users);
    // console.log(data);
  };

  const deleteUser = async (id: string) => {
    try {
      const resp = await fetchContoken(`api/users/${id}`, {}, "DELETE");
      const data: UsuariosResponse = await resp!.json();
      console.log(data);
      handleUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id: string) => {
    const repite = user.filter(item => item.uuid !== userContext.uuid);
    // if(repite){
    //   Swal.fire({
    //     title: "¿Estas seguro?",
    //     text: "Una vez eliminado no se puede recuperar",
    //     icon: "warning",
    //   })
    //   return;
    // }

    Swal.fire({
      title: "¿Estas seguro?",
      text: "Una vez eliminado no podras recuperarlo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminarlo!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        deleteUser(id);
      }
    }
    );
  }

  const filteredUsers = () => {
    const filtered = user.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    return filtered;
  };

  // useEffect(() => {
  //   if (search.length === 0) {
  //     handleUsers();
  //   }
  //   setUser(filteredUsers());
  // }, [search]);

  useEffect(() => {
    handleUsers();
  }, []);
  return (
    <LayoutProfile>
      <div className="min-h-[85vh] flex flex-col gap-5">
        <div className="w-full">
          <div className="flex justify-between mx-6">
            <h1 className="text-left mb-2 text-xl font-bold">Tabla Usuarios</h1>
          </div>
          <div className="flex justify-center items-center gap-2 flex-1 ml-6">
            <h1 className="font-semibold">Buscar Usuario:</h1>
            <input
              className="flex-1 mx-3 bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Buscar"
              value={search}
              onChange={searchItemsInput}
            />
          </div>
          <div className="table-content">
            <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-gray-900 shadow-dashboard px-8 pt-3 rounded-lg min-h-min print:bg-black print:px-0 print:pl-6 print:break-before-avoid-page">
              <table className="min-w-full print:overflow-hidden">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                      name
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                      Correo
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                      Telefono
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                      Rol
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                      Imagen
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                      Cambiar Rol
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {items.map((usuario, i) => (
                    <tr className="font-semibold text-lg" key={usuario.uuid}>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 print:border-none">
                        <div className="flex items-center">
                          <div>
                            <div className=" leading-5 text-white"> {i + currentPage + 1}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                        <div className=" leading-5 text-white text-left">
                          {usuario.name.toLocaleLowerCase()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b text-white border-gray-500 leading-5 text-left">
                        {usuario.email}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b text-white border-gray-500 leading-5 text-left">
                        {usuario.telefono === 0
                          ? "aún no tiene teléfono"
                          : usuario.telefono}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b text-white border-gray-500 leading-5 text-left">
                        {usuario.estado ? "Activo" : "Inactivo"}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b text-white border-gray-500 leading-5 text-left">
                        {usuario.role.name ? usuario.role.name : "aún no tiene rol"}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b text-white border-gray-500 leading-5 text-left">
                        <img
                          src={
                            usuario.image
                              ? usuario.image
                              : "https://jsl-online.com/wp-content/uploads/2017/01/placeholder-user.png"
                          }
                          alt="imagen"
                          title={usuario.name}
                          className="w-12 h-12 object-cover"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b text-white border-gray-500 leading-5 text-left">
                        {/* <SelectRole
                          usuario={usuario}
                          handleUsers={handleUsers}
                        /> */}
                        {usuario.role.name}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5 space-x-2 print:hidden">
                        <div className="flex gap-2 items-center">
                          <button
                            onClick={() => {
                              handleDelete(usuario.uuid);
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
            <nav aria-label="Page navigation example">
              <ul className="inline-flex -space-x-px">
                <li onClick={prevPage} className="btn-prev">
                  Atrás
                </li>
                <li className="px-2">
                  {
                    <p className="text-white">
                      {currentPage + 1} de {currentPage + 6}
                    </p>
                  }
                </li>
                <li onClick={nextPage} className="btn-next">
                  Adelante
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </LayoutProfile>
  );
};
