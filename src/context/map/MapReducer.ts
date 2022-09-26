import { Map, Marker } from "mapbox-gl";
import { MapState } from "./MapProvider";

type MapActionType = 
|{ type: "[Map] - setMap"; payload: Map }
|{ type: "[Map] - setMarkers"; payload: Marker[] }
|{ type: "[Map] - setMyLocation"; payload: number[] }

export const MapReducer = (
  state: MapState,
  action: MapActionType
): MapState => {
  switch (action.type) {
    case "[Map] - setMap":
      return {
        ...state,
        isMapReady: true,
        map: action.payload,
      };
    case "[Map] - setMarkers":
      return {
        ...state,
        markers: action.payload,
      };
    case "[Map] - setMyLocation":
      return {
        ...state,
        MyLocation: [...action.payload],
      };

    default:
      return state;
  }
};
