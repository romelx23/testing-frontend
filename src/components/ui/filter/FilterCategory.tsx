import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { ProductContext } from "../../../context/product";
import { useCategories } from "../../../hooks";
import { Accordion } from "../Accordion/Accordion";

export const FilterCategory = () => {
  const { categories } = useCategories();
  const { addFilter, filters } = useContext(ProductContext);
  const [select, setSelect] = useState<string[]>([]);
  const [categorias, setCategorias] = useState(categories);
  const [search, setSearch] = useState("");
  const itemRef = useRef<HTMLDivElement>(null);
  const handleCategory = () => {
    addFilter({
      ...filters,
      categories: [...select],
    });
  };

  const handleSelect = (category: string) => {
    if (select.includes(category)) {
      setSelect(select.filter((item) => item !== category));
    } else {
      setSelect([...select, category]);
    }
  };
  useEffect(() => {
    handleCategory();
    console.log(select);
  }, [select]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleFilter = () => {
    if(!itemRef.current){
      return;
    }
    const containerItems = itemRef.current;
    if (search.length > 0) {
      const filtered = categories.filter((item) =>
        item.nombre.toLowerCase().includes(search.toLowerCase())
      );
      // setCategorias(filtered);
      const categorySelected = containerItems.querySelectorAll(
        ".category-item"
      );
      categorySelected.forEach((item) => {
        item.classList.remove("active");
        item.classList.add("hidden");
      });
      filtered.forEach((item) => {
        const category = containerItems.querySelector(
          `.category-item[data-category="${item.nombre}"]`
        );
        category?.classList.add("active");
      });
    } else {
      // setCategorias(categories);
      const categorySelected = containerItems.querySelectorAll(
        ".category-item"
      );
      categorySelected.forEach((item) => {
        item.classList.add("active");
      });
    }
  };

  // función para deseleccionar todos los elementos
  // const handleChecked=()=>{
  //   if(filters.categories.length === 0){
  //     setSelect([]);
  //   }
  // }

  useEffect(() => {
  handleFilter();
  // console.log('filter');
  }, [search]);

  useEffect(() => {
    setCategorias(categories);
    // console.log('categorias');
  }, [categories]);

  return (
    <Accordion title="Categorías">
      <div className="flex justify-start px-4">
        <input
          type="text"
          name="search"
          value={search}
          onChange={handleSearch}
          placeholder="Buscar categoría"
          className="input-filter"
          autoComplete="off"
        />
      </div>
      <div className="select-content" ref={itemRef}>
        {categorias.map((category) => (
          <div key={category._id} className="flex px-4 category-item" data-category={category.nombre}>
            <label className="space-x-2 hover:cursor-pointer">
              <input
                type="checkbox"
                name="category"
                value={category.nombre}
                onChange={() => handleSelect(category.nombre)}
              />
              <span>{category.nombre}</span>
            </label>
          </div>
        ))}
      </div>
    </Accordion>
  );
};
