import React, { useEffect, useState } from 'react'
import Identicon from 'react-identicons'
import { getMessages, listenForMessage, sendMessage } from '../services/chat'
import { useParams } from 'react-router-dom'
import { setGlobalState, truncate, useGlobalState } from '../store'

const Chat = () => {
  const [message, setMessage] = useState('')
  const [messages] = useGlobalState('messages')
  const [connectedAccount] = useGlobalState('connectedAccount')

  const { id } = useParams()

  const onSendMessage = async (e) => {
    e.preventDefault()
    if (!message) return

    await sendMessage(id, message).then((msg) => {
      setGlobalState('messages', (prevState) => [...prevState, msg])
      setMessage('')
      scrollToEnd()
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      await getMessages(id).then((msgs) => {
        setGlobalState('messages', msgs)
        scrollToEnd()
      })

      await listenForMessage(id).then((msg) => {
        setGlobalState('messages', (prevState) => [...prevState, msg])
        scrollToEnd()
      })
    }

    fetchData()
  }, [])

  const scrollToEnd = () => {
    const elmnt = document.getElementById('messages-container')
    elmnt.scrollTop = elmnt.scrollHeight
  }

  return (
    <div className="mt-4 mb-10 pt-10 md:p-20 flex flex-col justify-center items-center w-full">
      <div className="bg-[#222121] text-gray-400 sm:shadow-lg shadow-slate-900 rounded-xl w-full md:w-2/5 h-7/12 py-6">
        <div className="flex flex-col">
          <div className="flex justify-between items-center px-6">
            <p className="font-semibold">Chat</p>
          </div>

          <div
            id="messages-container"
            className="flex flex-col justify-center items-start rounded-xl my-5 pt-5 max-h-[20rem] overflow-y-auto"
          >
            {messages.map((msg, i) => (
              <Message
                text={msg.text}
                owner={msg.sender.uid}
                time={Number(msg.sentAt + '000')}
                you={connectedAccount == msg.sender.uid}
                key={i}
              />
            ))}
          </div>

          <form className="h-[4rem] w-full mt-4 px-6" onSubmit={onSendMessage}>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="h-full w-full p-5 focus:outline-none focus:ring-0 rounded-md
             placeholder-gray-400 bg-transparent border border-gray-400"
              placeholder="Leave a message..."
            />
          </form>
        </div>
      </div>
    </div>
  )
}

const Message = ({ text, time, owner, you }) => {
  return (
    <div className="flex justify-between items-end space-x-4 px-6 mb-4 w-full">
      <div className="flex justify-start items-center">
        <Identicon
          className="w-12 h-12 rounded-full object-cover mr-4 shadow-md bg-gray-400"
          string={owner}
          size={30}
        />

        <div>
          <h3 className="text-md font-bold">{you ? '@You' : truncate(owner, 4, 4, 11)}</h3>
          <p className="flex flex-col text-gray-500 text-xs font-semibold">
            {text} 
          </p>
        </div>
      </div>

      <span className="text-xs">{new Date(time).toLocaleString()}</span>
    </div>
  )
}

export default Chat
