import { AuthState } from './AuthProvider';
import { User } from '../../interfaces/user';

type AuthActionType = 
| {type:'[Auth] - Login',payload:{user:User}}
| {type:'[Auth] - Register',payload:{user:User}}
| {type:'[Auth] - Logout'}
| {type:'[Auth] - Checking',payload:{checking:boolean}}
| {type:'[User] - Update',payload:{user:User}}

export const AuthReducer = (state:AuthState,action:AuthActionType):AuthState => { 
    switch (action.type) {
        case '[Auth] - Login':
            return {
                ...state,
                user:{
                    ...action.payload.user
                }
            }
        case "[Auth] - Register":
            return {
                ...state,
                user:{
                    ...action.payload.user
                }
            }
        case "[Auth] - Logout":
            return {
                ...state,
                user:{} as User,
                checking:false
            }
        case "[Auth] - Checking":
            return {
                ...state,
                checking:action.payload.checking,
            }
        case "[User] - Update":
            return {
                ...state,
                user:{
                    ...action.payload.user
                }
            }
        
    
        default:
            return state;
    }
 }