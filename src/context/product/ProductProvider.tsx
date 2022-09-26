import { FC, useReducer } from "react";
import Swal from "sweetalert2";
import { ProductContext, ProductReducer } from ".";
import { fileUpload } from "../../helpers/fileUpload";
import { CategoryForm, Filter, ProductForm, Producto } from "../../interfaces";
export interface ProductContextProps {
  children: React.ReactNode;
}

export interface ProductState {
  product: ProductForm;
  category:CategoryForm;
  products: ProductForm[];
  productsFilter: Producto[];
  filters: Filter;
  categories: CategoryForm[];
}

export const Product_INITIAL_STATE: ProductState = {
  product: {
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
  },
  category:{
    name:"",
  },
  products: [],
  productsFilter: [],
  categories: [],
  filters: {
    categories: [],
    prices: {
      min: 0,
      max: 0,
    },
    brands: [],
  }
};

export const ProductProvider: FC<ProductContextProps> = ({ children }) => {
  const [state, dispatch] = useReducer(ProductReducer, Product_INITIAL_STATE);
  const addProduct = (product: ProductForm) => {
    dispatch({
      type: "[Product] - Add Product",
      payload: {
        product,
      },
    });
  };
  const startUploading = async (file: File) => {
    const url: string = await fileUpload(file);
    Swal.fire({
        title:'Uploading...',
        text:'Please wait',
        allowOutsideClick:false,
        showLoaderOnConfirm:true,
        didOpen:()=>{
            Swal.showLoading();
        }
    })
    dispatch({
      type: "[Product] - Upload Product Image",
      payload: {
        product: {
          ...state.product,
          image: url,
        },
      },
    });
    console.log(url);
    Swal.close();
  };
  const addCategory = (category: CategoryForm) => {
    dispatch({
      type: "[Category] - Add Category",
      payload: {
        category,
      },
    });
  };
  const productFilter = (products: Producto[]) => {
    // products filter by category, price, brand
    const productsFilter = products.filter(
      (product: Producto) =>
        state.filters.categories.length === 0 ||
        state.filters.categories.includes(product.categoria.nombre)
    );
    const productsFilterPrice = productsFilter.filter(
      (product: Producto) =>
        state.filters.prices.min === 0 &&
        state.filters.prices.max === 0 ||
        product.precio >= state.filters.prices.min &&
        product.precio <= state.filters.prices.max
    );
    // console.log(productsFilterPrice);
    const productsFilterBrand = productsFilterPrice.filter(
      (product: Producto) =>
        state.filters.brands.length === 0 ||
        state.filters.brands.includes(product.marca?.nombre)
    );
    dispatch({
      type: "[Product] - Filter Product",
      payload: {
        products:productsFilterBrand,
      },
    });
  }

  const clearFilter = () => {
    dispatch({
      type: "[Product] - Clear Filter",
      payload: {
        filters: {
          categories: [],
          prices: {
            min: 0,
            max: 0,
          },
          brands: [],
        },
        productsFilter: [],
      },
    });
  }

  const addFilter = (filters: Filter) => {
    dispatch({
      type: "[Product] - add Filter",
      payload: {
        filters,
      },
    });
  }


  return (
    <ProductContext.Provider
      value={{
        ...state,
        addProduct,
        startUploading,
        productFilter,
        addFilter,
        clearFilter,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
