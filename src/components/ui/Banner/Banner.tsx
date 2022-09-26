import React, { FC } from 'react'
interface Props{
    title?: string;
    description?: string;
}
export const Banner:FC<Props> = ({title,description}) => {
  return (
    <div className='w-full h-52 flex rounded-lg mt-3 justify-around items-center'
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundColor: '#525252ad',
        backgroundBlendMode: 'multiply',
        backgroundClip: 'content-box',
        backgroundOrigin: 'padding-box',
      }}
    >
      <h1 className='text-white text-4xl font-bold'>{title?title:'Este es el Banner'}</h1>
      <p className='text-white text-lg font-semibold'>{description?description:'Esta es la Descripción del Banner'}</p>
    </div>
  )
}
