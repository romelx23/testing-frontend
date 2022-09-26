import { Order } from "./order";

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  "mensaje-from-server": (mensaje: string) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  "mensaje-to-server": { data:{nombre:string, mensaje:string} };
}

// orders events from server
export interface PedidosEvents extends ServerToClientEvents {
    "pedido-from-client": (pedido:Order) => void;
}

// chat events from server
export interface ChatEvents extends ServerToClientEvents {
    "mensaje-from-client": (mensaje:string) => void;
}