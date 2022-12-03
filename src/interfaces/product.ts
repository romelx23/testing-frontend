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
  products: Producto[];
}

export interface Producto {
  price: number;
  disponible: boolean;
  _id: string;
  name: string;
  description: string;
  user: string;
  category: Categoria;
  stock: number;
  img?: string;
  brand: Marca;
  bodega:Market;
}

export interface ProductoBodega{
  success:boolean;
  products:Producto[]
}

export interface ProductoCarrito {
  price: number;
  disponible: boolean;
  _id: string;
  name: string;
  descripcion?: string;
  user: string;
  category: Categoria;
  img?: string;
  cantidad: number;
  bodega:Market;
}

export interface ProductoId {
  product: Producto;
  bodega: Market;
}

export interface Categoria {
  _id: string;
  name: string;
}

export interface Marca {
  _id: string;
  name: string;
}

export interface ProductoResponse {
  activo: boolean;
  category: string;
  description: string;
  disponible: boolean;
  idProducto: string;
  img: string;
  mac: string;
  name: string;
  price: number;
  user: string;
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
  description: string;
}

export interface CategoryI {
  name: string;
  description: string;
  _id: string;
  usuario: string;
}

export interface CategoryResponse {
  categories: CategoryI[];
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