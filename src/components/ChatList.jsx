import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import Identicon from 'react-identicons'
import { setGlobalState, truncate, useGlobalState } from '../store'
import { getConversations, getMessages } from '../services/chat'
import { useNavigate } from 'react-router-dom'

const ChatList = () => {
  const [chatListModal] = useGlobalState('chatListModal')
  const [currentUser] = useGlobalState('currentUser')
  const [conversations] = useGlobalState('conversations')

  useEffect(() => {
    getConversations().then((convs) => setGlobalState('conversations', convs))
  }, [currentUser])

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
          <div className="flex flex-col justify-center items-start mt-5 mb-5 max-h-60 overflow-y-auto">
            {conversations.map((conv, i) => (
              <Conversation
                key={i}
                text={conv.lastMessage.text}
                owner={conv.conversationWith.uid}
                time={Number(conv.lastMessage.sentAt + '000')}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const Conversation = ({ text, owner, time }) => {
  const navigate = useNavigate()

  const navTo = () => {
    navigate('/chats/' + owner)
    setGlobalState('chatListModal', 'scale-0')
    getMessages(owner).then((msgs) => setGlobalState('messages', msgs))
  }
  return (
    <div
      onClick={navTo}
      className="flex justify-between items-center mb-4 w-full hover:bg-[#151414]
    transition-all duration-300 px-6 py-2 cursor-pointer"
    >
      <div className="flex items-center">
        <Identicon
          className="w-12 h-12 rounded-full object-cover mr-4 shadow-md bg-gray-400"
          string={owner}
          size={35}
        />

        <div>
          <h3 className="text-lg font-bold">{truncate(owner, 4, 4, 11)}</h3>
          <p className="text-gray-500">{truncate(text, 37, 0, 40)}</p>
        </div>
      </div>
      <p className="text-sm text-gray-500 ml-auto">
        {new Date(time).toLocaleString()}
      </p>
    </div>
  )
}

export default ChatList
