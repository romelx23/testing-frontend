import React from "react";

export const Zoom = () => {
  // mouse over the image to zoom in
  // mouse out to zoom out
  const cursor = React.useRef<HTMLDivElement>(null);
  const cursorMove = (e: any) => {
    var x = e.clientX;
    var y = e.clientY;
    if (cursor.current) {
      cursor.current.style.left = x + "px";
      cursor.current.style.top = y + "px";
    }
  };
  document.addEventListener("mousemove", cursorMove);
  return (
    <div
      id="cursor"
      ref={cursor}
      className="absolute w-40 h-40 border border-black bg-[#ffffff7a] -translate-x-24 -translate-y-52 hover:scale-125 hover:cursor-pointer z-10"
    ></div>
  );
};
