import React, { FC } from 'react'
interface Props{
    content:string | number;
    className?:string;
}

export const Badge:FC<Props> = ({content,className}) => {
  return (
    <span className={`absolute -bottom-0.5 right-1 text-white text-xs w-4 h-4 rounded-full ${className}`}>{content}</span>
  )
}
