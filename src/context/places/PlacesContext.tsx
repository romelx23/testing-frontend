import { createContext } from "react";
import { Market } from "../../interfaces";
import { Feature } from "../../interfaces/places";

interface ContextProps {
    isLoading: boolean;
    userLocation?: [number, number];
    searchPlacesByTerm: (query: string) => Promise<Feature[]>;
    isLoadingPlaces: boolean;
    places: Feature[];
    markets:Market[];
    getMarkets:()=>Promise<Market[]>;
}

export const PlacesContext = createContext({} as ContextProps);
