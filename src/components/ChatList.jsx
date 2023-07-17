import React from 'react'
import { FaTimes } from 'react-icons/fa'
import Identicon from 'react-identicons'
import { setGlobalState, useGlobalState } from '../store'

const ChatList = () => {
  const [chatListModal] = useGlobalState('chatListModal')
  const chats = [
    {
      id: 1,
      name: 'John Doe',
      message: 'Hey, how are you?',
      time: '10:30 AM',
    },
    {
      id: 2,
      name: 'Jane Smith',
      message: 'I have a question for you.',
      time: '11:45 AM',
    },
    {
      id: 3,
      name: 'Alex Johnson',
      message: "Let's meet up later.",
      time: '1:15 PM',
    }
  ]

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black
      bg-opacity-50 transform z-50 transition-transform duration-300 ${chatListModal}`}
    >
      <div className="bg-[#222121] text-gray-400 shadow-lg shadow-slate-900 rounded-xl w-11/12 md:w-2/5 h-7/12 py-6">
        <div className="flex flex-col">
          <div className="flex justify-between items-center px-6">
            <p className="font-semibold">Chat List</p>
            <button
              type="button"
              className="border-0 bg-transparent focus:outline-none"
              onClick={() => setGlobalState('chatListModal', 'scale-0')}
            >
              <FaTimes className="text-gray-400" />
            </button>
          </div>
          <div className="flex flex-col justify-center items-start rounded-xl mt-5 mb-5 max-h-60 overflow-y-auto">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className="flex justify-between items-center mb-4 w-full hover:bg-[#151414]
                transition-all duration-300 px-6"
              >
                <div className="flex items-center">
                  <Identicon
                    className="w-12 h-12 rounded-full object-cover mr-4 shadow-md bg-gray-400"
                    string={chat.name}
                    size={35}
                  />

                  <div>
                    <h3 className="text-lg font-bold">{chat.name}</h3>
                    <p className="text-gray-500">{chat.message}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 ml-auto">{chat.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatList
