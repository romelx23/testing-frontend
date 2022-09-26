import React, { useEffect, useState } from "react";
import { LayoutProfile } from "../../components/layout/LayoutProfile";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { fetchContoken } from "../../helpers";
import { Order, OrderResponse } from "../../interfaces";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
ChartJS.register(ArcElement, Tooltip, Legend);
export const DashBoardPage = () => {
  const [prices, setPrices] = useState<number[]>([]);
  const [labels, setLables] = useState<string[]>([]);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        // position: "top" as const,
      },
      title: {
        // display: true,
        text: "Registro de compras",
        style: {
          fontSize: "24px",
          fontFamily: "Roboto",
          fontWeight: "bold",
          color: "#000",
        },
      },
    },
  };
  // const labels = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];
  const data = {
    labels,
    datasets: [
      {
        label: "Total Pedido",
        data: prices,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      // {
      //   label: "Dataset 2",
      //   data: [28, 48, 40, 19, 60, 27, 50],
      //   backgroundColor: "rgba(255, 99, 132, 0.5)",
      // },
    ],
  };

  const loadOrders = async () => {
    const resp = await fetchContoken(`api/pedido/user`, {}, "GET");
    const data: OrderResponse = await resp?.json();
    console.log(data);
    if (data.success) {
      const { data: ordenes } = data;
      const prices = ordenes.map((order) =>
        parseFloat(order.importe.toFixed(2))
      );
      const labels = ordenes.map((order) =>
        new Date(order.fecha).toLocaleDateString()
      );
      setPrices(prices);
      setLables(labels);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const data2 = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <LayoutProfile>
      <div className="flex flex-col min-h-[80vh]">
        <div className="py-4 px-2 md:px-8 flex flex-col items-center">
          <div className="px-4 md:px-8 w-4/5 md:w-full h-full">
            <h1 className="text-2xl">Gasto de Pedidos por día</h1>
            <div className="flex justify-center items-center">
              <h1 className="h-8 -rotate-90 text-center font-semibold">Total</h1>
              <Bar options={options} data={data} />
            </div>
            <h1 className="text-center font-semibold">Fechas</h1>
          </div>
          <div className="w-full flex justify-around flex-col items-center md:flex-row">
            <div className="w-60">
              <h1>Titulo del Gráfico</h1>
              <Doughnut data={data} />
            </div>
            <div className="w-60">
              <h1>Titulo del Gráfico</h1>
              <Doughnut title="Ventas" data={data2} />
            </div>
          </div>
        </div>
      </div>
    </LayoutProfile>
  );
};
