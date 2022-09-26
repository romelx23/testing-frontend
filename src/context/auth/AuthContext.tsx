import { createContext } from 'react';
import { User, LoginI } from '../../interfaces/user';

interface ContextProps{
    checking:boolean;
    user:User;
    startLogin: (email:string,password:string)=>void;
    startRegister: (name:string,email:string,password:string,password2:string)=>void;
    startCheking:()=>void;
    logOut:()=>void;
    updateUser:(user:User)=>void;
}

export const AuthContext=createContext({} as ContextProps)