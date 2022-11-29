import { Producto, ProductoOrder } from "./product";
import { Market } from './market';

export interface OrderResponse {
    success: boolean;
    data:    Order[];
}

type Estado = "ordenado" | "pendiente" | "atendido" | "cancelado";

export interface Order {
    _id:     string;
    name:  string;
    importe: number;
    fecha:   string;
    user: string;
    status:  Estado;
    bodega:  Market;
}

export interface OrderByIdResponse{
    success: boolean;
    pedido:    Order;
}

// detalle pedido

export interface PedidoResponse {
    success:       boolean;
    detallePedido: DetallePedido[];
}

export interface DetallePedido {
    _id:      string;
    pedido:   string;
    total:    number;
    precio:   number;
    cantidad: number;
    producto: Producto;
}

export interface PedidoByIdResponse {
    success: boolean;
    data:{
        pedido: Order[];
        productos: ProductoOrder[];
    }
}

// export interface Producto {
//     estado:      boolean;
//     precio:      number;
//     disponible:  boolean | null;
//     stock:       number;
//     _id:         string;
//     name:      string;
//     descripcion: string;
//     img:         string;
//     categoria:   string;
//     idProducto:  string;
//     user:     string;
//     __v:         number;
//     telefono?:   number;
// }
