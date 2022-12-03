import React, { useContext, useEffect, useRef, useState } from "react";
import { ProductContext } from "../../../context/product";
import { useBrands } from "../../../hooks/useBrands";
import { Accordion } from "../Accordion/Accordion";

export const FilterBrand = () => {
  const { brands } = useBrands();
  const { addFilter, filters } = useContext(ProductContext);
  const [select, setSelect] = useState<string[]>([]);
  const [marcas, setMarcas] = useState(brands);
  const [search, setSearch] = useState("");
  const itemRef = useRef<HTMLDivElement>(null);
  const handleBrand = () => {
    addFilter({
      ...filters,
      brands: [...select],
    });
  };

  const handleSelect = (brand: string) => {
    if (select.includes(brand)) {
      setSelect(select.filter((item) => item !== brand));
    } else {
      setSelect([...select, brand]);
    }
  };
  useEffect(() => {
    handleBrand();
    console.log(select);
  }, [select]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleFilter = () => {
    if (!itemRef.current) {
      return;
    }
    const containerItems = itemRef.current;
    if (search.length > 0) {
      const filtered = brands.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      // setCategorias(filtered);
      const brandSelected = containerItems.querySelectorAll(
        ".brand-item"
      );
      brandSelected.forEach((item) => {
        item.classList.remove("active");
        item.classList.add("hidden");
      });
      filtered.forEach((item) => {
        const category = containerItems.querySelector(
          `.brand-item[data-category="${ item.name }"]`
        );
        category?.classList.add("active");
      });
    } else {
      const brandSelected = containerItems.querySelectorAll(
        ".brand-item"
      );
      brandSelected.forEach((item) => {
        item.classList.add("active");
      });
    }
  };

  useEffect(() => {
    handleFilter();
  }, [search]);

  useEffect(() => {
    setMarcas(brands);
  }, [brands]);

  return (
    <Accordion title="Marcas">
      <div className="flex justify-start px-4">
        <input
          type="text"
          name="search"
          value={search}
          onChange={handleSearch}
          placeholder="Buscar marca"
          className="input-filter"
          autoComplete="off"
        />
      </div>
      <div className="select-content" ref={itemRef}>
        {marcas.map((brand) => (
          <div key={brand._id} className="flex px-4 category-item brand-item" data-category={brand.name}>
            <label className="space-x-2 hover:cursor-pointer w-full text-left">
              <input
                type="checkbox"
                name="category"
                value={brand.name}
                onChange={() => handleSelect(brand.name)}
              />
              <span>{brand.name}</span>
            </label>
          </div>
        ))}
      </div>
    </Accordion>
  );
};
