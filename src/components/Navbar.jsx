import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'
import { BiMenuAltRight } from 'react-icons/bi'
import { navdata } from '../constants'
import { truncate, useGlobalState } from '../store'
import { connectWallet } from '../services/blockchain'

const MobileMenu = () => {
  const [breeds] = useGlobalState('breeds')

  return (
    <div className="p-6 fixed top-20 right-0 mx-4 my-2 w-auto flex bg-[#1b1b1b] rounded-xl tilt-in-fwd-tr shadow-md z-10 ">
      <ul className="flex flex-col space-y-8 text-white align-center justify-center items-start align-center">
        {navdata.map((data) => (
          <li
            key={data.id}
            className=" flex items-center cursor-pointer font-bold hover:text-blue-700"
          >
            <Link to={data.path}>
              <div className="relative">
                <span>{data.title}</span>
                {data.counter && breeds.length > 0 && (
                  <span className="bg-white p-1 w-1 rounded-full text-black">
                    {breeds.length}
                  </span>
                )}
              </div>
            </Link>
          </li>
        ))}

        <li className=" flex items-center  shadow-md cursor-pointer  hover:text-gray-500">
          <ConnectButton />
        </li>
      </ul>
    </div>
  )
}

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [breeds] = useGlobalState('breeds')

  return (
    <div
      className="flex fixed top-0 right-0 left-0 justify-between
      items-center w-full h-[80px] bg-gray-400 px-2 lg:px-10 z-10"
    >
      <Link to="/" className="font-bold">
        DappBreed
      </Link>

      <div className="hidden justify-between items-center  gap-10 md:flex ">
        <div className="flex  gap-5">
          {navdata.map((data) => (
            <div key={data.id}>
              <Link to={data.path}>
                <div className="font-bold hover:text-blue-700 ">
                  <span>{data.title}</span>
                  {data.counter && breeds.length > 0 && (
                    <span className="bg-white p-1 w-1 rounded-full text-black">
                      {breeds.length}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="flex justify-start mr-20">
          <ConnectButton />
        </div>
      </div>

      <div className="flex md:hidden">
        {toggleMenu ? (
          <AiOutlineClose
            className="text-3xl cursor-pointer"
            onClick={() => setToggleMenu(!toggleMenu)}
          />
        ) : (
          <BiMenuAltRight
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

const ConnectButton = () => {
  const [connectedAccount] = useGlobalState('connectedAccount')

  return connectedAccount ? (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4
      px-6 rounded-full transition-all duration-300 shadow-md shadow-black"
    >
      {truncate(connectedAccount, 4, 4, 11)}
    </button>
  ) : (
    <button
      onClick={connectWallet}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4
      px-6 rounded-full transition-all duration-300 shadow-md shadow-black"
    >
      Connect Wallet
    </button>
  )
}

export default Navbar
