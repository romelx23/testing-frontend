import React, { useEffect, useState } from 'react'
import { LayoutProfile } from '../../components/layout'

export const OrderPage = () => {
    const [order, setOrder] = useState([]);

    const getOrders = async () => {
        const res = await fetch('http://localhost:3001/api/order');
        const data = await res.json();
        setOrder(data);
    }

    useEffect(() => {
        getOrders();
    }, []);
    return (
        <LayoutProfile>
            <div className="w-full min-h-[80vh] print:flex print:justify-center">
                <h1 className="text-left mb-2 text-xl ml-6 font-bold">
                    Próximos pedidos
                </h1>
                <div className="flex justify-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="border-2 border-red-600 flex items-center gap-2 p-8 text-red-600 font-bold">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                            </svg>
                            Pedido en <span className='text-2xl'>3:00hr</span>
                        </div>
                        <div className="border-2 border-green-600 flex items-center gap-2 p-8 text-green-600 font-bold">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                            </svg>
                            Pedido en <span className='text-2xl'>8:00hr</span>
                        </div>
                        <div className="border-2 border-yellow-600 flex items-center gap-2 p-8 text-yellow-600 font-bold">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                            </svg>
                            Pedido en <span className='text-2xl'>5:00hr</span>
                        </div>
                        <div className="border-2 border-blue-600 flex items-center gap-2 p-8 text-blue-600 font-bold">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                            </svg>
                            Pedido atendido
                        </div>
                    </div>
                </div>
                <div className="flex justify-end px-8">
                    <button className="btn border-cyan-500 text-cyan-500 hover:bg-cyan-700 print:hidden">
                        Agregar Proveedor
                    </button>
                </div>
                {/* Tabla de ordenes */}
                <h1 className="text-left mb-2 text-xl ml-6 font-bold">
                    Ordenes
                </h1>
                <div className="py-2 overflow-x-auto px-6 pr-10 ">
                    <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-gray-900 shadow-dashboard px-8 pt-3 rounded-lg min-h-min print:bg-black print:px-0 print:pl-6 print:break-before-avoid-page">
                        <table className="min-w-full print:overflow-hidden">
                            <thead>
                                <tr>
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
                                    <th className="px-6 py-3 border-b-2 border-gray-300"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-800">
                                <tr>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img
                                                    className="h-10 w-10 rounded-full"
                                                    src="https://aztecsolar.com/wp-content/uploads/2020/05/placeholder-user.jpg"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm leading-5 font-medium text-white">
                                                    Nombre
                                                </div>
                                                <div className="text-sm leading-5 text-gray-400">
                                                    Bodeguero
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                        <div className="text-sm leading-5 text-gray-400">
                                            123456789
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                        <div className="text-sm leading-5 text-gray-400">
                                            proveedor@gmail.com
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-sm leading-5 text-gray-400">
                                        <div className="text-sm leading-5 text-gray-400">
                                            jr. ejemplo 123
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5 font-medium">
                                        <a
                                            href="#"
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            Editar
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </LayoutProfile>
    )
}
