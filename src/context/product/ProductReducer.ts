import { CategoryForm, Filter, ProductForm, Producto } from '../../interfaces';
import { ProductState } from './ProductProvider';

type ProductActionType = 
| {type:'[Product] - Add Product', payload:{product:ProductForm}}
| {type:'[Product] - Upload Product Image', payload:{product:ProductForm}}
| {type:'[Product] - Load Product', payload:{products:[]}}
| {type:'[Product] - add Filter', payload:{filters:Filter}}
| {type:'[Product] - Filter Product', payload:{products:Producto[]}}
| {type:'[Category] - Add Category', payload:{category:CategoryForm}}
| {type:'[Category] - Load Category', payload:{categories:[]}}
| {type:'[Product] - Clear Filter',payload:{
    productsFilter:Producto[],
    filters:Filter
}}

export const ProductReducer = (state:ProductState,action:ProductActionType):ProductState => { 
    switch (action.type) {
        case '[Product] - Add Product':
            return {
                ...state,
                product: action.payload.product
            };
        case '[Product] - Upload Product Image':
            return {
                ...state,
                product: action.payload.product
            };
        case '[Category] - Add Category':
            return {
                ...state,
                category: action.payload.category
            };
        case '[Category] - Load Category':
            return {
                ...state,
                categories: action.payload.categories
            };
        case '[Product] - Load Product':
            return {
                ...state,
                products: action.payload.products
            };
        case '[Product] - Filter Product':
            return {
                ...state,
                productsFilter: action.payload.products
            };
        case '[Product] - add Filter':
            return {
                ...state,
                filters: action.payload.filters
            };
    
        case '[Product] - Clear Filter':
            return {
                ...state,
                filters:action.payload.filters,
                productsFilter:action.payload.productsFilter
            };

        default:
            return state;
    }
 }