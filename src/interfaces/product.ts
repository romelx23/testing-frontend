import { Market } from './market';

// dev
export interface ProductI {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
}

// prod
export interface ProductsI {
  total: number;
  productos: Producto[];
}

export interface Producto {
  precio: number;
  disponible: boolean;
  _id: string;
  nombre: string;
  descripcion: string;
  usuario: string;
  categoria: Categoria;
  stock: number;
  img?: string;
  marca: Marca;
  bodega:Market;
}

export interface ProductoBodega{
  success:boolean;
  productos:Producto[]
}

export interface ProductoCarrito {
  precio: number;
  disponible: boolean;
  _id: string;
  nombre: string;
  descripcion?: string;
  usuario: string;
  categoria: Categoria;
  img?: string;
  cantidad: number;
  bodega:Market;
}

export interface ProductoId {
  producto: Producto;
  bodega: Market;
}

export interface Categoria {
  _id: string;
  nombre: string;
}

export interface Marca {
  _id: string;
  nombre: string;
}

export interface ProductoResponse {
  activo: boolean;
  categoria: string;
  descripcion: string;
  disponible: boolean;
  idProducto: string;
  img: string;
  mac: string;
  nombre: string;
  precio: number;
  usuario: string;
  _id: string;
}

export interface ProductoResponseError {
  error: ProductError[];
}

export interface ProductError {
  location: string;
  value: string;
  msg: string;
  param: string;
}

export interface ProductForm {
  name: string;
  price: string;
  description: string;
  category: string;
  image: string;
}

export interface ProductoOrder{
  _id: string;
  pedido:string;
  total: number;
  precio: number;
  cantidad: number;
  producto: Producto;
}

// Category

export interface CategoryForm{
  name:string;
}

export interface CategoryI {
  nombre: string;
  _id: string;
  usuario: string;
}

export interface CategoryResponse {
  categorias: CategoryI[];
  total: number;
}

// Product filter
export interface Filter {
  categories:string[];
  prices:{
    min:number;
    max:number;
  };
  brands:string[];
}

// favorite products

export interface FavoriteI {
  msg: string;
  productos: Producto[];
}