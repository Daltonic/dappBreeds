import React from 'react'
import { Link } from 'react-router-dom'

const CollectionCard = ({ nft }) => (
  <Link
    to={'/nft/' + nft.id}
    className="max-w-xs sm:max-w-sm text-white overflow-hidden
    border-2 rounded-xl border-gray-400 shadow-lg"
  >
    <div className="flex justify-start items-center gap-2 p-4">
      <img
        src={nft.traits.image}
        alt={nft.traits.name}
        className=" w-12 h-24 object-cover"
      />
      <div className="flex-col gap-2">
        <h2 className=" font-extrabold">{nft.traits.name}</h2>
        <p>{nft.traits.description}</p>
        {nft.traits.breeded ? (
          <span className="text-sm font-semibold text-blue-500">
            {nft.traits.weapon} & {nft.traits.environment} (Inherited)
          </span>
        ) : (
          <span className="text-sm font-semibold text-blue-500">
            {nft.traits.weapon} & {nft.traits.environment} (Minted)
          </span>
        )}
      </div>
    </div>
  </Link>
)

export default CollectionCard
