import React from 'react'
import TrendingCards from './TrendingCards'

const Trending = ({ nfts }) => {
  return (
    <div className="mt-4 mb-10 p-10 md:p-20  flex flex-col w-full ">
      <div className="flex items-center justify-center ">
        <h2 className="font-extrabold text-3xl md:text-5xl text-white text-center">
          {nfts.length > 0 ? 'Trending' : 'No minted NFTs yet...'}
        </h2>
      </div>

      <TrendingCards nfts={nfts} />
    </div>
  )
}

export default Trending
