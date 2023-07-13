import React from 'react'

const Button = ({ children }) => {
  return (
    <button
      className="bg-transparent hover:bg-blue-500
      text-white font-semibold hover:text-white
      py-2 px-4 border border-white hover:border-blue-500 
      rounded-sm transition-all duration-300"
    >
      {children}
    </button>
  )
}
export default Button
