import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ProviderResponse, ProviderI, ProviderForm, ProviderResponseCreate } from "../interfaces";
import { baseUrl } from "../utils";
import { ProviderContext } from '../context/provider/ProviderContext';
import { fetchContoken, fetchSintoken } from "../helpers";

export const useProviders = () => {
    const url = `${baseUrl}/api/providers?offset=0&limit=5`;
    const [loading, setLoading] = useState(false);
    const {setProviders,deleteProvider:deleteProviderContext,addProvider,updateProvider:updateProviderContext}=useContext(ProviderContext);

    const getProviders = async () => {
        setLoading(true);
        const response = await fetch(url);
        const { providers,total }: ProviderResponse = await response.json();
        console.log(response, "response 13 providers");
        setProviders(providers,total);
        setLoading(false);
    };

    const handlePage = async (page: number) => {
        const url = `${baseUrl}/api/providers?offset=${(page - 1) * 5}&limit=5`;
        const response = await fetch(url);
        const { providers,total }: ProviderResponse = await response.json();
        setProviders(providers,total);
    };

    const createProvider = async (provider: ProviderForm) => {
       try {
        const response = await fetchSintoken(`api/providers`, {...provider}, 'POST');
        const { provider: providerCreated }:ProviderResponseCreate = await response?.json();
        console.log(providerCreated, "providerCreated");
        addProvider(providerCreated);
        Swal.fire("Success", "Provider created", "success");
       } catch (error) {
        Swal.fire("Error", "Error creating provider", "error");
       }
        
    };

    const deleteProvider = async (uuid: string) => {
        setLoading(true);
        const response = await fetchContoken(`api/providers/${uuid}`,{}, 'DELETE');
        const { ok }: ProviderResponse = await response?.json();
        if (ok) {
            deleteProviderContext(uuid);
            Swal.fire({
                title: "Eliminado",
                text: "La categoría se ha eliminado correctamente",
                icon: "success",
                confirmButtonText: "Ok",
            });
        } else {
            Swal.fire({
                title: "Error",
                text: "No se ha podido eliminar la categoría",
                icon: "error",
                confirmButtonText: "Ok",
            });
        }
        setLoading(false);
    };

    const updateProvider = async (uuid: string, provider: ProviderForm) => {
        setLoading(true);
        const response = await fetchSintoken(`api/providers/${uuid}`, {...provider}, 'PUT');
        const { ok,provider:providerUpdate }: ProviderResponseCreate = await response?.json();
        setLoading(false);
        updateProviderContext(providerUpdate);
        if(ok){
            Swal.fire({
                title: "Actualizado",
                text: "El proveedor se ha actualizado correctamente",
                icon: "success",
                confirmButtonText: "Ok",
            });
        }else{
            Swal.fire({
                title: "Error",
                text: "No se ha podido actualizar el proveedor",
                icon: "error",
                confirmButtonText: "Ok",
            });
        }
    };

    useEffect(() => {
        getProviders();
    }, []);
    return {
        setProviders,
        loading,
        getProviders,
        deleteProvider,
        createProvider,
        updateProvider,
        handlePage
    };
};
