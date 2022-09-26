import { UIState } from './UIProvider';

type UIActionType = 
| {type:'[UI] - Toggle Sidebar', payload:boolean}
| {type:'[UI] - Toggle Cart', payload:boolean}
| {type:'[UI] - Toggle Modal', payload:boolean}
| {type:'[UI] - Toggle Theme', payload:boolean}
| {type:'[UI] - Set LogoMarket', payload:string}

export const UIReducer = (state:UIState,action:UIActionType):UIState => { 
    switch (action.type) {
        case '[UI] - Toggle Sidebar':
            return {
                ...state,
                ToggleMenu: action.payload
            };
        case '[UI] - Toggle Cart':
            return {
                ...state,
                ToggleCart: action.payload
            };
        case '[UI] - Toggle Modal':
            return {
                ...state,
                ToggleModal: action.payload
            };
        case '[UI] - Set LogoMarket':
            return {
                ...state,
                logoMarket:action.payload
            }
        case '[UI] - Toggle Theme':
            return {
                ...state,
                ToggleTheme: action.payload
            };
    
        default:
            return state;
    }
 }