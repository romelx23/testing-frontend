import { FC, useEffect, useReducer } from "react";
import { PlacesContext, PlacesReducer } from ".";
import { getUserLocation } from "../../helpers";
import { Market, MarketsResponse } from "../../interfaces";
import { Feature, PlacesResponse } from "../../interfaces/places";
import { baseUrl } from "../../utils";

export interface Props {
  children: React.ReactNode;
}

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPlaces: boolean;
  places: Feature[];
  markets: Market[];
}

export const Places_INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: [-76.94289513030368, -12.220197694900099],
  isLoadingPlaces: false,
  places: [],
  markets: [],
};

export const PlacesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(PlacesReducer, Places_INITIAL_STATE);
  useEffect(() => {
    getUserLocation().then((LngLat) =>
      dispatch({
        type: "[Places] - setUserLocation",
        payload: [-76.94289513030368, -12.220197694900099],
      })
    );
  }, []);

  const searchPlacesByTerm = async (query: string): Promise<Feature[]> => {
    if (query.length === 0) {
      dispatch({
        type: "[Places] - setPlaces",
        payload: [],
      });
      return [];
    }
    if (!state.userLocation) throw new Error("No hay ubicación");
    dispatch({
      type: "[Places] - setLoadingPlaces",
    });
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=pk.eyJ1Ijoicm9tZWx4MjMiLCJhIjoiY2tzZHA2Y2M0MHQyMjJvbXNsMmVjZW41aCJ9.2As_5QylbPvQj6mFtsHD_g&limit=5&proximity=${state.userLocation[0]},${state.userLocation[1]}`
    );
    const data: PlacesResponse = await response.json();
    // console.log(data.features[0]);
    dispatch({
      type: "[Places] - setPlaces",
      payload: data.features,
    });
    return data.features;
  };
  const getMarkets = async (): Promise<Market[]> => {
    const response = await fetch(`${baseUrl}/api/bodega`);
    const data: MarketsResponse = await response.json();
    console.log(data.bodegas);
    dispatch({
      type: "[Places] - setMarkets",
      payload: data.bodegas,
    });
    return data.bodegas;
  };

  return (
    <PlacesContext.Provider
      value={{
        ...state,
        searchPlacesByTerm,
        getMarkets
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};
