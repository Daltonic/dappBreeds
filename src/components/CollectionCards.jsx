import React from 'react'
import CollectionCard from './CollectionCard'

const CollectionCards = ({ nfts }) => {
  return (
    <div className="flex justify-center mt-20 w-full">
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {nfts.map((nft, i) => (
          <CollectionCard key={i} nft={nft} />
        ))}
      </div>
    </div>
  )
}

export default CollectionCards
