import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { FiLogIn } from 'react-icons/fi'
import { SiGnuprivacyguard } from 'react-icons/si'
import { Menu } from '@headlessui/react'

const ChatButton = () => {
  return (
    <Menu
      as="div"
      className="inline-block text-left mx-auto fixed right-5 bottom-10"
    >
      <Menu.Button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold
        rounded-full transition-all duration-300 p-3 focus:outline-none
          focus-visible:ring-2 focus-visible:ring-white
          focus-visible:ring-opacity-75 shadow-md shadow-black"
        as="button"
      >
        <AiOutlinePlus size={20} />
      </Menu.Button>
      <Menu.Items
        className="absolute right-0 bottom-14 mt-2 w-56 origin-top-right
          divide-y divide-gray-100 rounded-md bg-white shadow-lg shadow-black
          ing-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <Menu.Item>
          {({ active }) => (
            <button
              className={`flex justify-start items-center space-x-1 ${
                active ? 'bg-gray-200 text-black' : 'text-red-500'
              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
            >
              <SiGnuprivacyguard size={17} />
              <span>Chat SignUp</span>
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`flex justify-start items-center space-x-1 ${
                active ? 'bg-gray-200 text-black' : 'text-gray-900'
              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
            >
              <FiLogIn size={17} />
              <span>Chat Login</span>
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  )
}

export default ChatButton
