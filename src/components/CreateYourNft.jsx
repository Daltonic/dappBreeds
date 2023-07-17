import React, { useEffect, useState } from 'react'
import CollectionCard from './CollectionCard'

const CreateYourNft = ({ collection, title }) => {
  const [end, setEnd] = useState(4)
  const [count] = useState(4)
  const [nfts, setNfts] = useState([])

  const getNfts = () => {
    return collection.slice(0, end)
  }

  useEffect(() => {
    setNfts(getNfts())
  }, [collection, end])

  return collection?.length > 0 ? (
    <div className="my-5 py-10 flex flex-col w-full mx-auto">
      <div className="flex items-center justify-center ">
        <h2 className="font-extrabold text-3xl md:text-5xl text-white ">
          {title ? title : 'Recent Breedings'}
        </h2>
      </div>

      <div className="my-10 p-10 md:p-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-3 py-2.5">
          {nfts.map((nft, i) => (
            <CollectionCard key={i} nft={nft} />
          ))}
        </div>
      </div>

      {collection.length > 0 && collection.length > nfts.length && (
        <div className="flex justify-center items-center mx-auto">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4
          px-6 rounded-full transition-all duration-300 shadow-lg shadow-black"
            onClick={() => setEnd(end + count)}
          >
            Load more
          </button>
        </div>
      )}
    </div>
  ) : null
}

export default CreateYourNft
