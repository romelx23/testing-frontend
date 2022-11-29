import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export const NavbarAuth = () => {
  const { pathname } = useLocation()
  return (
    <div className="flex justify-between items-center">
      <Link to={"/auth/login"}>
        <img
          className="w-20"
          src="https://media.discordapp.net/attachments/789940470578544682/1024054584131461241/unknown.png"
          alt="logo"
        />
      </Link>
      <div className="flex gap-2">
        {
          pathname === "/auth/register" ?
            <Link to={"/auth/login"} className="text-blue-600 hover: border rounded-3xl p-2 px-5 text-center hover:bg-blue-600 hover:text-white">Ingresar</Link>
            :
            <Link to={"/auth/register"} className="text-blue-600 hover: border rounded-3xl p-2 px-5 text-center hover:bg-blue-600 hover:text-white">Registrate</Link>
        }

      </div>
    </div>
  )
}