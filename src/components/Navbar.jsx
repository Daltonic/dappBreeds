import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import { RiMenuAddLine, RiScissorsLine } from 'react-icons/ri'
import { navdata } from '../constants'

const MobileMenu = () => (
  <div className="p-6 absolute top-20 right-0 mx-4 my-2 w-auto flex bg-[#1b1b1b] rounded-xl tilt-in-fwd-tr shadow-md z-10 ">
    <ul className="flex flex-col space-y-8 text-white align-center justify-center items-start align-center    ">
      {navdata.map((data) => (
        <li
          key={data.id}
          className=" flex items-center cursor-pointer font-bold hover:text-blue-700"
        >
          <Link to={data.path}>
            <p>{data.title}</p>
          </Link>
        </li>
      ))}
      <li className=" flex items-center  shadow-md cursor-pointer  hover:text-gray-500">
        <Link to="/">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-full">
            connect wallet
          </button>
        </Link>
      </li>
    </ul>
  </div>
)

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false)
  return (
    <div className=" flex justify-between items-center w-full h-[80px] bg-gray-400 mt-4  px-2 lg:px-10">
      <div className="flex">
        <Link to="/">
          <p className="  font-bold">DappBreed</p>
        </Link>
      </div>
      <div className="hidden justify-between items-center  gap-10 md:flex ">
        <div className="flex  gap-5">
          {navdata.map((data) => (
            <div key={data.id}>
              <Link to={data.path}>
                <p className="font-bold hover:text-blue-700 ">{data.title}</p>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex justify-start mr-20">
          <Link to="/">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full">
              connect wallet
            </button>
          </Link>
        </div>
      </div>
      <div className="flex md:hidden">
        {toggleMenu ? (
          <RiScissorsLine
            className="text-3xl cursor-pointer"
            onClick={() => setToggleMenu(!toggleMenu)}
          />
        ) : (
          <RiMenuAddLine
            className="cursor-pointer text-3xl"
            onClick={() => setToggleMenu(!toggleMenu)}
          />
        )}
        <div className={`${!toggleMenu ? 'hidden' : 'flex'}`}>
          <MobileMenu />
        </div>
      </div>
    </div>
  )
}

export default Navbar
