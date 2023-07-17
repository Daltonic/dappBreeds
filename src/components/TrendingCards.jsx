import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { truncate } from '../utils/faker'
import { addToLab, remFromLab, useGlobalState } from '../store'

const TrendingCards = ({ collection }) => {
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

  const onAddToLab = (nft) => {
    if (breeds.some((breed) => breed.id == nft.id)) return
    nft.selected = true
    addToLab(nft)
  }

  const onRemFromLab = (nft) => {
    if (!breeds.some((breed) => breed.id == nft.id)) return
    nft.selected = false
    remFromLab(nft)
  }

  return (
    <div className="mt-20 w-full flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-3 py-2.5">
        {nfts.map((nft, i) => (
          <div
            key={i}
            className="max-w-xs sm:max-w-sm text-white overflow-hidden border border-blue-500 shadow-lg "
          >
            <div>
              <Link to={'/nft/' + nft.id}>
                <img
                  className="w-full block rounded-sm  border-b border-blue-500 "
                  src={nft.traits.image}
                  alt="Sunset in the mountains"
                />
              </Link>
            </div>
            <Link
              to={'/nft/' + nft.id}
              className="p-4 flex flex-col items-center gap-2"
            >
              <div className="flex flex-col gap-2 font-bold text-xl text-blue-500">
                <span>
                  {nft.traits.name} {nft.traits.weapon} &{' '}
                  {nft.traits.environment}
                </span>
              </div>
              <span>{nft.description}</span>
              <div className="flex flex-col gap-2 md:flex-row justify-between">
                <p className="flex flex-col text-center">
                  <span className="font-bold space-x-1">
                    <span>{nft.mintCost}</span>
                    <span>ETH</span>
                  </span>

                  <span className="text-blue-500">
                    {truncate(nft.owner, 4, 4, 11)}
                  </span>
                </p>
              </div>
            </Link>

            <div className="flex justify-center items-center py-4">
              {nft.selected ? (
                <button
                  onClick={() => onRemFromLab(nft)}
                  className="bg-blue-500 hover:bg-blue-600
                text-white font-semibold hover:text-white
                py-2 px-4 border-0 rounded-sm transition-all duration-300"
                >
                  Remove
                </button>
              ) : (
                <button
                  onClick={() => onAddToLab(nft)}
                  className="bg-transparent hover:bg-blue-500
                text-white font-semibold hover:text-white
                py-2 px-4 border border-white hover:border-blue-500 
                rounded-sm transition-all duration-300"
                >
                  Add Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="h-24" />

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

export default TrendingCards
