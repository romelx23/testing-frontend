import React from 'react'

export const CardSqueleton = () => {
  return (
    <div className="btn-product relative">
      <button className="btn-favorite">
          <i className="fas fa-heart"></i>
          <i className="far fa-heart"></i>
      </button>
      <div className="card__product p-5 py-8">
        <div
          className="w-60 h-52 rounded-md bg-gray-500 animate-pulse"
          style={{ width: "240px",height: "208px" }}
        ></div>
        <div className="w-full text-left pt-2">
          <h1 className="h-4 w-40 bg-slate-400 animate-pulse"></h1>
          <p className="h-4 w-40 bg-slate-400 animate-pulse"></p>
          <p className="h-4 w-9 bg-slate-400 animate-pulse"></p>
        </div>
      </div>
    </div>
  )
}
