import { createContext } from 'react';

interface ContextProps{
        ToggleMenu:boolean;
        toggleMenu:(value:boolean)=>void;
        ToggleCart:boolean;
        toggleCart:(value:boolean)=>void;
        ToggleModal:boolean;
        toggleModal:(value:boolean)=>void;
        ToggleTheme:boolean;
        toggleTheme:(value:boolean)=>void;
        logoMarket:string;
        SetLogo:(image:string)=>void;
}

export const UIContext=createContext({} as ContextProps)