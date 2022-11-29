import { ProviderI } from '../../interfaces';
import { ProviderState } from './ProviderProvider';

type ProviderActionType = 
| {type:'[Provider] - Set Providers', payload: {
    providers: ProviderI[],
    totalProviders: number
}}
| {type:'[Provider] - Select Provider', payload: string}
| {type:'[Provider] - Add Provider', payload: ProviderI}
| {type:'[Provider] - Update Provider', payload: ProviderI}
| {type:'[Provider] - Delete Provider', payload: string}

export const ProviderReducer = (state:ProviderState,action:ProviderActionType):ProviderState => { 
    switch (action.type) {
        case '[Provider] - Set Providers':
            return {
                ...state,
                providers:action.payload.providers,
                totalProviders:action.payload.totalProviders
            };
        case '[Provider] - Select Provider':
            return {
                ...state,
                provider: state.providers.find(provider => provider.uuid === action.payload) || null
            };
        case '[Provider] - Add Provider':
            return {
                ...state,
                providers:[...state.providers,action.payload]
            };
        case '[Provider] - Update Provider':
            return {
                ...state,
                providers:state.providers.map(provider => provider.uuid === action.payload.uuid ? action.payload : provider)
            };
        case '[Provider] - Delete Provider':
            return {
                ...state,
                providers:state.providers.filter(provider => provider.uuid !== action.payload)
            };

    
        default:
            return state;
    }
 }