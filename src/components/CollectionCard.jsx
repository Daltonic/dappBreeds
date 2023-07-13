import React from 'react'
import heroimage1 from '../assets/heroimage1.jpg'
import { Link } from 'react-router-dom'

const CollectionCard = ({ nft }) => (
  <Link
    to={'/nft/' + nft.tokenId}
    className="max-w-xs sm:max-w-sm text-white overflow-hidden border-2  rounded-xl border-gray-400 shadow-lg "
  >
    <div className="flex flex-col gap-2 p-4">
      <img src={heroimage1} alt="heroimage1" className=" w-12 h-12" />
      <h2 className=" font-extrabold">{nft.name}</h2>
      <p>{nft.description}</p>
    </div>
  </Link>
)

export default CollectionCard
