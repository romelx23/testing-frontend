import React, { useEffect, useState } from 'react'
import { LayoutProfile } from '../../components/layout'
import { Order, OrderSellInterface } from '../../interfaces/order-sell';

export const OrderPage = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    const getOrders = async () => {
        const res = await fetch('https://testing-backend.vercel.app/api/orders');
        const data: OrderSellInterface = await res.json();
        setOrders(data.orders);
    }

    useEffect(() => {
        getOrders();
    }, []);
    return (
        <LayoutProfile>
            <div className="w-full min-h-[80vh] print:flex print:justify-center">
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
                                        Id
                                    </th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                                        Productos
                                    </th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                                        Usuario
                                    </th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                                        Proveedor
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-800">
                                {
                                    orders.map((order, i) => (
                                        <tr key={order._id}>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                                <div className="flex items-center">
                                                    {
                                                        i + 1
                                                    }
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                                <div className="text-sm leading-5 text-gray-400">
                                                    {order.items.length === 0 ? 'No hay productos' : order.items.map((item) => (
                                                        <div key={item._id}>
                                                            {item.product}
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                                <div className="text-sm leading-5 text-gray-400">
                                                    {order.user}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-sm leading-5 text-gray-400">
                                                <div className="text-sm leading-5 text-gray-400">
                                                    {order.provider}
                                                </div>
                                            </td>

                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </LayoutProfile>
    )
}
