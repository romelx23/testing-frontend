import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../../context/product";
import { useForm } from "../../../hooks";
import { Accordion } from "../Accordion/Accordion";

export const FilterPrice = () => {
  const {addFilter,filters}=useContext(ProductContext);
  const {values,handleInputChange}=useForm({
      min: "0",
      max: "200",
      range:"50",
  })
  const handlePrice=()=>{
      addFilter({
          ...filters,
          prices:{
              min:parseInt(values.min),
              max:parseInt(values.range),
          },
      });
  }

  useEffect(() => {
      handlePrice();
  }, [values])
  
  
        
  return (
    <Accordion title="Precios">
      <div className="px-4">
        <span>{values.range}</span>
        <input
          id="default-range"
          type="range"
          value={values.range}
          min={values.min}
          max={values.max}
          name="range"
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            onChange={handleInputChange}
        ></input>
        <div className="flex justify-between">
          <div className="w-24">
            <span>Min</span>
            <input 
            onChange={handleInputChange}
            type="number" 
            className="w-24 p-1" 
            value={values.min}
            name="min"
            min={0}
            />
          </div>
          <div className="separator">-</div>
          <div className="w-24">
            <span>Max</span>
            <input 
            onChange={handleInputChange}
            type="number" 
            className="w-24 p-1" 
            value={values.max}
            name="max"
            min={0}
            max={200}
            />
          </div>
        </div>
      </div>
    </Accordion>
  );
};
