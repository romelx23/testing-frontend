import { Market } from '../../interfaces';
import { Feature } from '../../interfaces/places';
import { PlacesState } from './PlacesProvider';

type PlacesActionType = 
| {type:'[Places] - setUserLocation',payload:[number,number]}
| {type:'[Places] - GetPlaces'}
| {type:'[Places] - setPlaces',payload:Feature[]}
| {type:'[Places] - setMarkets',payload:Market[]}
| {type:'[Places] - setLoadingPlaces'}

export const PlacesReducer = (state:PlacesState,action:PlacesActionType):PlacesState => { 
    switch (action.type) {
        case '[Places] - setUserLocation':
            return {
                ...state,
                isLoading:false,
                userLocation:action.payload
            };
        case '[Places] - setLoadingPlaces':
            return {
                ...state,
                isLoading:true,
                places:[],
            };
        case '[Places] - setPlaces':
            return {
                ...state,
                isLoading:false,
                places:action.payload,
            };
        case '[Places] - GetPlaces':
            return {
                ...state,
            };
        case '[Places] - setMarkets':
            return {
                ...state,
                markets:action.payload,
            };
        default:
            return state;
    }
 }