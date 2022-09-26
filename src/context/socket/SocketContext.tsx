import { createContext } from 'react';

interface ContextProps{
    property: boolean
}

export const SocketContext=createContext({} as ContextProps)