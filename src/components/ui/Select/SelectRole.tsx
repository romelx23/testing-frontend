import React, { FC, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { fetchSintoken } from "../../../helpers";
import {
  Role,
  RoleResponse,
  Usuario,
  UsuariosResponse,
} from "../../../interfaces";
interface Props {
  usuario: Usuario;
  handleUsers: () => void;
}

export const SelectRole: FC<Props> = ({ usuario, handleUsers }) => {
  const [rol, setRol] = useState<Role[]>([]);
  const [select, setSelect] = useState("");
  const handleRoles = async () => {
    const resp = await fetchSintoken(`api/roles`, {}, "GET");
    const data: RoleResponse = await resp!.json();
    setRol(data.roles);
  };

  const updateRole = async (user: Usuario, rol: string) => {
    if (select === "") {
      return;
    }
    const { uuid, name, email } = user;
    const resp = await fetchSintoken(
      `api/usuarios/${uuid}`,
      {
        name,
        correo: email,
        rol,
      },
      "PUT"
    );
    const data: UsuariosResponse = await resp!.json();
    // console.log(data);
    handleUsers();
  };

  const handleUpdate = () => {
    if (select === "") {
      return;
    }
    Swal.fire({
      title: "¿Estas seguro de actualizar el estado?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, actualizarlo!",
    }).then((result) => {
      if (result.value) {
        updateRole(usuario, select);
      }
      setSelect("");
    }).catch(error => {
      console.log(error);
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "") {
      return;
    }
    setSelect(e.target.value);
    // console.log(e.target.value);
  };
  useEffect(() => {
    handleRoles();
  }, []);
  return (
    <select
      value={select}
      onChange={handleChange}
      onClick={handleUpdate}
      name="rol"
      id="rol"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-44"
    >
      <option value="">Seleccione un rol</option>
      {rol.map((rol, i) => (
        <option key={rol._id} value={rol.name}>
          {rol.name}
        </option>
      ))}
    </select>
  );
};
