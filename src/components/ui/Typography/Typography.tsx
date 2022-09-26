import React, { FC } from 'react';
interface Props {
    children: React.ReactNode;
    variant:string;
    className?:string;
    color?:string;
}

export const Typography:FC<Props> = ({children,variant,color,className}) => {

  return (
    <p className={`${variant} ${color} ${className}`}>
      {children}
    </p>
  )
}

// default props
Typography.defaultProps = {
  variant: 'body',
  color: 'text-gray-800'
}