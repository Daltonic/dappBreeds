import React from 'react'

const Spacer = ({ spaces }) => {
  const range = Array.from({ length: spaces }, (_, index) => index)

  return (
    <div>
      {range.map((_, i) => (
        <div key={i} className="h-10" />
      ))}
    </div>
  )
}

export default Spacer
