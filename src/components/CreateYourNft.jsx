import React from 'react'
import CollectionCard from './CollectionCard'

const CreateYourNft = ({ nfts }) => {
  return (
    <div className="mt-4 mb-10 p-10 md:p-20  flex flex-col w-full ">
      <div className="flex items-center justify-center ">
        <h2 className="  font-extrabold text-3xl md:text-5xl text-white ">
          Recent Breedings
        </h2>
      </div>

      <div className="mt-20 w-full">
        <div className=" flex flex-col lg:flex-row justify-center items-center gap-3">
          {nfts.map((nft, i) => (
            <CollectionCard key={i} nft={nft} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CreateYourNft
