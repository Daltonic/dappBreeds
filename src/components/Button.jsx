import React from 'react'

const Button = ({ children }) => {
  return (
    <button class="bg-transparent hover:bg-rose-400 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-blue-500  rounded-sm">
      {children}
    </button>
  )
}
export default Button
