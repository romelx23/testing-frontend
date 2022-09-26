import React, { useRef } from "react";

export const ButtonTop = () => {
    const topBtn = useRef<HTMLDivElement>(null);
    const {current}=topBtn;
    const goTop=()=>{
        window.scroll(0,0)
    }
    if(current!==null){
        window.onscroll = () => window.scrollY > 500 ? current.style.opacity = '1' : current.style.opacity = '0'
    }
  return (
    <div className="fixed bottom-3 right-3 w-10 h-8 bg-gray-400 text-white hover:cursor-pointer hover:bg-blue-400 transition-colors delay-75" onClick={goTop} ref={topBtn}>
      <i className="fas fa-arrow-up"></i>
    </div>
  );
};
