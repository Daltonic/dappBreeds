import React from 'react'
import CollectionCards from '../components/CollectionCards'
import { useGlobalState } from '../store'

const Collections = () => {
  const [collection] = useGlobalState('collection')

  return (
    <div className="mt-4 mb-10 p-10 md:p-20  flex flex-col w-full ">
      <div className="flex items-center justify-center ">
        <h2 className="  font-extrabold text-3xl md:text-5xl text-white ">
          My Collection
        </h2>
      </div>
      <CollectionCards nfts={collection} />
    </div>
  )
}

export default Collections
