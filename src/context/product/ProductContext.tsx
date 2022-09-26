import { createContext } from "react";
import { ProductForm,CategoryForm, Filter, Producto } from "../../interfaces";

interface ContextProps {
  product: ProductForm;
  products: ProductForm[];
  productsFilter: Producto[];
  filters: Filter;
  category:CategoryForm;
  addProduct: (product: ProductForm) => void;
  startUploading: (file: File) => void;
  productFilter: (products: Producto[]) => void;
  addFilter: (filters: Filter) => void;
  clearFilter: () => void;
}

export const ProductContext = createContext({} as ContextProps);
