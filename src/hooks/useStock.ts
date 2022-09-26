import { fetchContoken } from "../helpers";

export const useStock = () => {
  const updateStock = async (id: string, stock: number) => {
    try {
      const resp = await fetchContoken(`api/productos/stock/${id}`, { stock: stock }, "PUT");
      const data = await resp?.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  const decrement = async (id: string,cantidad:number) => {
    try {
      const response = await fetchContoken(`api/productos/stock/decrementar/${id}`, {
        cantidad
      }, "PUT");
      const data = await response!.json();
      if (data.success) {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const increment = async (id: string,cantidad:number) => {
    try {
      const response = await fetchContoken(`api/productos/stock/incrementar/${id}`, {
        cantidad
      }, "PUT");
      const data = await response!.json();
      if (data.success) {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
    return {
        decrement,
        increment,
        updateStock
    };
};
