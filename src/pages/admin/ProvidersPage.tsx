import React, { useContext, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { LayoutProfile } from '../../components/layout'
import { Loader } from '../../components/ui';
import { ProviderContext } from '../../context/provider';
import { fetchContoken } from '../../helpers';
import { useProviders } from '../../hooks/useProviders'

export const ProvidersPage = () => {
    const { deleteProvider, handlePage } = useProviders();
    const { providers, selectProvider, totalProviders } = useContext(ProviderContext);
    const navigate = useNavigate();
    const handleDelete = async (id: string) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¿Deseas eliminar este Proveedor?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.value) {
                deleteProvider(id);
            }
        }
        );
    }
    const handleUpdate = async (id: string) => {
        // selectProvider(id);
        navigate(`/admin/proveedores/editar/${ id }`);
    }
    return (
        <LayoutProfile>
            <div className="w-full min-h-[80vh] print:flex print:justify-center">
                <div className="flex justify-end px-8">
                    <Link
                        to="/admin/proveedores/agregar"
                        className="btn border-green-500 text-green-500 hover:bg-green-700 print:hidden">
                        Agregar Proveedor
                    </Link>
                </div>
                {/* Tabla de proveedores */}
                <h1 className="text-left mb-2 text-xl ml-6 font-bold">
                    Proveedores
                </h1>
                <div className="py-2 overflow-x-auto px-6 pr-10 ">
                    <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-gray-900 shadow-dashboard px-8 pt-3 rounded-lg min-h-min print:bg-black print:px-0 print:pl-6 print:break-before-avoid-page">
                        {
                            providers.length > 0 ?
                                <>
                                    <table className="min-w-full print:overflow-hidden">
                                        <thead>
                                            <tr>
                                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                                                    Imagen
                                                </th>
                                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                                                    Nombre
                                                </th>
                                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                                                    Telefono
                                                </th>
                                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                                                    Email
                                                </th>
                                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                                                    Direccion
                                                </th>
                                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-6 py-3 border-b-2 border-gray-300">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-gray-800">
                                            {
                                                providers.map((provider) => (
                                                    <tr key={provider.uuid}>
                                                        <td
                                                            className="px-6 py-4 whitespace-no-wrap border-b border-gray-500"
                                                        >
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-10 w-10">
                                                                    <img
                                                                        className="h-10 w-10 rounded-full object-cover"
                                                                        src={provider.image}
                                                                        alt=""
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                                            <div className="flex items-center">
                                                                <div className="text-sm leading-5 font-medium text-white">
                                                                    {provider.name}
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-200 border-gray-500 text-sm leading-5">
                                                            {provider.phone}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-200 border-gray-500 text-sm leading-5">
                                                            {provider.email}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-200 border-gray-500 text-sm leading-5">
                                                            {provider.address}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-200 border-gray-500 text-sm leading-5">
                                                            {provider.status ? 'Activo' : 'Inactivo'}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                                                            <button
                                                                onClick={() => handleUpdate(provider.uuid)}
                                                                className="btn border-cyan-500 text-cyan-500 hover:bg-cyan-700">
                                                                Editar
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(provider.uuid)}
                                                                className="btn ml-2 border-red-500 text-red-500 hover:bg-red-700">
                                                                Eliminar
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                    {
                                        totalProviders > 5 &&
                                        <div className="flex justify-center mt-4">
                                            {
                                                [...Array(Math.ceil(totalProviders / 5))].map((_, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => handlePage(i + 1)}
                                                        className={`btn ml-2 ${ i + 1 === 0 ? 'bg-blue-500' : 'bg-gray-500' } hover:bg-blue-700`}>
                                                        {i + 1}
                                                    </button>
                                                ))
                                            }
                                        </div>
                                    }
                                </>
                                :
                                <div className="flex justify-center items-center h-28">
                                    <Loader
                                        message='Cargando proveedores...'
                                    />
                                </div>
                        }
                    </div>
                </div>
            </div>
        </LayoutProfile>
    )
}
