import { useEffect, useState } from "react";

export function usePaginate<T extends {nombre:string}>(elements: T[]) {
  const [items, setItems] = useState<T[]>([]);
  const [numberPage, setNumberPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [search, setSearch] = useState("");
  const numberLastPage = Math.ceil(elements.length / 6);
  const searchItems = () => {
    if (search.length === 0) {
      return elements.slice(currentPage, currentPage + 6);
    }
    const filtered = elements.filter((item) =>
      item.nombre.toLowerCase().includes(search.toLowerCase())
    );
    return filtered.slice(currentPage, currentPage + 6);
  };
  const nextPage = () => {
    if (
      elements.filter((item) =>
        item.nombre.toLowerCase().includes(search.toLowerCase())
      ).length >
      currentPage + 6
    ) {
      setCurrentPage(currentPage + 6);
      setNumberPage(numberPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 6);
      setNumberPage(numberPage - 1);
    }
  };
  const searchItemsInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCurrentPage(0);
    setNumberPage(1);
    setSearch(value);
  };

  const handlePage = () => {
    const page=Math.ceil(elements.length/6);
    setQuantity(page);
  }

  const handleSearchPage = (page:number) => {
    setCurrentPage(page*6);
  }

  useEffect(() => {
    setItems(searchItems());
    handlePage();
    // console.log('usePaginate');
    // console.log(quantity);
    // console.log(currentPage);
  }, [currentPage, search, elements]);

  return {
    items,
    searchItems,
    currentPage,
    setCurrentPage,
    prevPage,
    nextPage,
    search,
    searchItemsInput,
    quantity,
    handleSearchPage,
    numberPage,
    numberLastPage,
  };
}
