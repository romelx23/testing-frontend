import React, { useContext } from "react";
import { LayoutProfile } from "../../components/layout";
import { AuthContext } from '../../context/auth/AuthContext';

export const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const { name: nombre, image, role } = user;
  const handlePrint = () => {
    window.print();
  };
  return (
    <LayoutProfile>
      <div className="w-full min-h-[80vh] print:flex print:justify-center">
        <div className="flex justify-center">
          <div className="w-64 h-60 bg-blue-900 rounded-lg flex flex-col items-center p-4 print:hidden">
            <img
              src={user.image.length !== 0 ? user.image : "https://aztecsolar.com/wp-content/uploads/2020/05/placeholder-user.jpg"}
              alt="avatar"
              className="rounded-full h-28 w-28 mb-2 object-cover"
              style={{ border: "4px solid #fff" }}
            />
            <h1 className="text-xl font-semibold text-white">{nombre}</h1>
            <h2 className="text-base font-semibold text-green-500">
              {user.role.name === 'BODEGUERO_ROLE' ? 'Bodeguero' : user.role.name === 'ADMIN_ROLE' ? 'Admin' : 'Cliente'}
            </h2>
          </div>
        </div>
        {/* tabla boletas */}
        {/* <h1 className="text-left mb-2 text-xl ml-6 font-bold">
          Boletas Emitidas
        </h1>
        <div className="py-2 overflow-x-auto px-6 pr-10 ">
          <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-gray-900 shadow-dashboard px-8 pt-3 rounded-lg min-h-min print:bg-black print:px-0 print:pl-6 print:break-before-avoid-page">
            <table className="min-w-full print:overflow-hidden">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                    Precio
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                    Ingredientes
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                    Imagen
                  </th>
                  {
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-white">
                      <button
                        onClick={handlePrint}
                        className="btn border-cyan-500 text-cyan-500 hover:bg-cyan-700 print:hidden"
                      >
                        Imprimir Boleta
                      </button>
                    </th>
                  }
                </tr>
              </thead>
              <tbody className="">
                <tr className="font-semibold text-lg" key={1}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 print:border-none">
                    <div className="flex items-center">
                      <div>
                        <div className=" leading-5 text-white">1</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className=" leading-5 text-white">producto</div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b text-white border-gray-500  leading-5">
                    S/.80
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b text-white border-gray-500  leading-5">
                    producto
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b text-white border-gray-500  leading-5">
                    <img
                      src="https://pbs.twimg.com/media/FTd2PibXoAEGOjL?format=png&name=small"
                      className="w-12 h-12 object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5 space-x-2 print:hidden">
                    <div className="flex justify-center gap-2 items-center">
                      <button className="btn border-blue-500 text-blue-500 hover:bg-blue-700">
                        <i className="fas fa-minus"></i>
                      </button>
                      <h1 className="text-white">20</h1>
                      <button className="btn border-blue-500 text-blue-500 hover:bg-blue-700">
                        <i className="fas fa-plus"></i>
                      </button>

                      <button className="btn hover:bg-red-700 border-red-500 text-red-500">
                        <i className="fas fa-backspace"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div> */}
      </div>
    </LayoutProfile>
  );
};
