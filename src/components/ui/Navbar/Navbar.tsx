import React from 'react'
import { NavTop } from './NavTop';
import { NavBottom } from './NavBottom';

export const Navbar = () => {
  return (
    <nav>
      <NavTop />
      <hr className='my-2'/>
      <NavBottom />
    </nav>
  )
}
