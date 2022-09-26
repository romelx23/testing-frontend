import React, { useEffect, useState } from "react";
import { LayoutProfile } from "../../components/layout";
import { useOrders } from "../../hooks";
import { Doughnut } from "react-chartjs-2";
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
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
ChartJS.register(ArcElement, Tooltip, Legend);
interface ValuesProps {
  labelsOrdenados: string[];
  dataOrdenados: number[];
  labelsCancelados: string[];
  dataCancelados: number[];
  labelsAtendidos: string[];
  dataAtendidos: number[];
  labelsPendientes: string[];
  dataPendientes: number[];
}

export const DashboardOrderPage = () => {
  const [values, setValues] = useState<ValuesProps>({
    labelsOrdenados: [],
    dataOrdenados: [],
    labelsCancelados: [],
    dataCancelados: [],
    labelsAtendidos: [],
    dataAtendidos: [],
    labelsPendientes: [],
    dataPendientes: [],
  });
  const { orders } = useOrders();
  const orderCanceled = orders.filter((order) => order.status === "cancelado");
  const labelsCancelados = orderCanceled.map((order) =>
    new Date(order.fecha).toLocaleDateString()
  );
  const orderPending = orders.filter((order) => order.status === "pendiente");
  const labelsPending = orderPending.map((order) =>
    new Date(order.fecha).toLocaleDateString()
  );
  const orderAtended = orders.filter((order) => order.status === "atendido");
  const labelsAtended = orderAtended.map((order) =>
    new Date(order.fecha).toLocaleDateString()
  );
  const orderOrdered = orders.filter((order) => order.status === "ordenado");
  const labelsOrdered = orderOrdered.map((order) =>
    new Date(order.fecha).toLocaleDateString()
  );

  useEffect(() => {
    const dataOrdenados = orderOrdered.map((order) => order.importe);
    const dataCancelados = orderCanceled.map((order) => order.importe);
    const dataAtendidos = orderAtended.map((order) => order.importe);
    const dataPendientes = orderPending.map((order) => order.importe);
    setValues({
      labelsOrdenados: labelsOrdered,
      dataOrdenados,
      labelsCancelados,
      dataCancelados,
      labelsAtendidos: labelsAtended,
      dataAtendidos,
      labelsPendientes: labelsPending,
      dataPendientes: dataPendientes,
    });
    console.log("values");
  }, [orders]);

  const data = {
    labels: values.labelsOrdenados,
    datasets: [
      {
        label: "Ordenados",
        data: values.dataOrdenados,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  const data2 = {
    labels: values.labelsPendientes,
    datasets: [
      {
        label: "Pendientes",
        data: values.dataPendientes,
        backgroundColor:"rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };
  const data3 = {
    labels: values.labelsCancelados,
    datasets: [
      {
        label: "Cancelados",
        data: [values.dataCancelados],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor:"rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };
  const data4 = {
    labels: values.labelsAtendidos,
    datasets: [
      {
        label: "Atendidos",
        data: values.dataAtendidos,
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <LayoutProfile>
      <div className="min-h-[85vh] grid grid-cols-1 md:grid-cols-3">
        <div className="col-span-1">
          <h1>Pedidos Ordenados</h1>
          {
            orderOrdered.length > 0 ? (
              <Doughnut title="Ventas" data={data} />
            )
            : (
              <div className="flex justify-center items-center h-full">
                <h1>No hay pedidos ordenados</h1>
              </div>
            )
          }
        </div>
        <div className="col-span-1">
          <h1>Pedidos Pendientes</h1>
          {
            orderPending.length > 0 ? (
              <Doughnut title="Ventas" data={data2} />
            )
            : (
              <div className="flex justify-center items-center h-full">
                <h1>No hay pedidos pendientes</h1>
              </div>
            )
          }
        </div>
        <div className="col-span-1">
          <h1>Pedidos Cancelados</h1>
          {
            orderCanceled.length > 0 ? (
              <Doughnut title="Ventas" data={data3} />
            )
            : (
              <div className="flex justify-center items-center h-full">
                <h1>No hay pedidos cancelados</h1>
              </div>
            )
          }
        </div>
        <div className="col-span-1">
          <h1>Pedidos Atendidos</h1>
          {
            orderAtended.length > 0 ? (
              <Doughnut title="Ventas" data={data4} />
            )
            : (
              <div className="flex justify-center items-center h-full">
                <h1>No hay pedidos atendidos</h1>
              </div>
            )
          }
        </div>
      </div>
    </LayoutProfile>
  );
};
