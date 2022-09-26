import { FavoriteState } from './FavoriteProvider';
import { Producto } from '../../interfaces/product';

type FavoriteActionType = 
| {type:'[Favorite] - Get Products', payload:Producto[]}
| {type:'[Favorite] - Get favorite', payload:string[]}
| {type:'[Favorite] - Add to favorite', payload: {id: string}}
| {type:'[Favorite] - Remove from favorite', payload: {id: string}}

export const FavoriteReducer = (state:FavoriteState,action:FavoriteActionType):FavoriteState => { 
    switch (action.type) {
        case '[Favorite] - Get Products':
            return {
                ...state,
                products: action.payload
            };
        case '[Favorite] - Get favorite':
            return {
                ...state,
                favorites: action.payload
            };
        case '[Favorite] - Add to favorite':
            return {
                ...state,
                favorites: [...state.favorites, action.payload.id]
            };
        case '[Favorite] - Remove from favorite':
            return {
                ...state,
                favorites: state.favorites.filter(id => id !== action.payload.id)
            };
    
        default:
            return state;
    }
 }