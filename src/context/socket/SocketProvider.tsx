import { FC, useEffect, useReducer } from 'react'
import { SocketContext, SocketReducer } from '.'
import { useSocket } from '../../hooks'
import { baseUrl } from '../../utils/endpoints';

interface Props{
    children: React.ReactNode
}

export interface SocketState {
  property: boolean
}

export const Socket_INITIAL_STATE: SocketState = {
  property: false
}

export const SocketProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(SocketReducer, Socket_INITIAL_STATE)
  const { socket, online } = useSocket(baseUrl);
  console.log(socket)
  
  return (
    <SocketContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
