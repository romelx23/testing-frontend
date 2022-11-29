import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth/AuthContext";
import { fetchContoken } from "../helpers";

export const useMarket = () => {
  const { user } = useContext(AuthContext);
  const [id, setId] = useState("");
  const handleExistMarket = async () => {
    const { uuid } = user;
    const resp = await fetchContoken(
      `api/users/datosBodega/${uuid}`,
      {},
      "POST"
    );
    const data = await resp!.json();
    const bodega = data.bodega;
    if (data.bodega) {
      console.log(bodega[0]._id);
      setId(bodega[0]._id);
    } else {
      setId("");
    }
  };
  useEffect(() => {
    handleExistMarket();
  }, []);
  return {
    setId,
    id,
    handleExistMarket,
  };
};
