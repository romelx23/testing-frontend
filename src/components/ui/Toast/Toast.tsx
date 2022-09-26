import React, { useEffect, useState } from "react";

interface Props {
  message: string;
  icon: string;
  show: boolean;
  positionY?: string;
  color?: string;
  onClose: (show: boolean) => void;
}

export const Toast = ({
  message,
  icon,
  show,
  positionY,
  color,
  onClose,
}: Props) => {
//   const [time, setTime] = useState(show);

  useEffect(() => {
    //   show during 3 seconds
    const timer = setInterval(() => {
      onClose(false);
    }, 3000);
    return () => {
      clearInterval(timer);
      onClose(false);
    };
  }, []);

  return (
    <div
      className={`${
        show ? "opacity-100" : "opacity-0"
      } transition w-full flex justify-center absolute z-40`}
    >
      <div
        className={`fixed ${positionY ? positionY : "bottom-3"} flex ${
          color ? color : "bg-green-500"
        } p-2 items-center gap-2 rounded-lg opacity-90`}
      >
        {/* <h1>Se agregó al carrito</h1> */}
        <i className={icon}></i>
        <p>{message}</p>
      </div>
    </div>
  );
};
