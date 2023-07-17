import React, { useEffect, useState } from 'react'
import CollectionCard from './CollectionCard'
import { useGlobalState } from '../store'

const CreateYourNft = ({ collection, title }) => {
  const [breeds] = useGlobalState('breeds')

  const [end, setEnd] = useState(4)
  const [count] = useState(4)

  const [nfts, setNfts] = useState([])

  const getNfts = () => {
    return collection.slice(0, end)
  }

  useEffect(() => {
    setNfts(getNfts())
  }, [collection, end])

  return (
    <div className="my-5 py-10  flex flex-col w-full ">
      <div className="flex items-center justify-center ">
        <h2 className="font-extrabold text-3xl md:text-5xl text-white ">
          {title ? title : 'Recent Breedings'}
        </h2>
      </div>

      <div className="my-10 w-full">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-3">
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
  )
}

export default CreateYourNft
