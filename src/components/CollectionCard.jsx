import React from 'react'
import heroimage1 from '../assets/heroimage1.jpg'

const CollectionCards = ({ nfts }) => {
  return (
    <div className="mt-20 w-full">
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {nfts.map((nft, i) => (
          <CollectionCard key={i} nft={nft} />
        ))}
      </div>
    </div>
  )
}

const CollectionCard = ({ nft }) => (
  <div className="max-w-xs sm:max-w-sm text-white overflow-hidden border-2  rounded-xl border-gray-400 shadow-lg ">
    <div className="flex flex-col gap-2 p-4">
      <img src={heroimage1} alt="heroimage1" className=" w-12 h-12" />
      <h2 className=" font-extrabold">{nft.name}</h2>
      <p>{nft.description}</p>
    </div>
  </div>
)

export default CollectionCards
