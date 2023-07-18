import React, { useEffect } from 'react'
import { useGlobalState } from '../store'
import Collection from '../components/Collection'
import { getMyNfts } from '../services/blockchain'

const Collections = () => {
  const [collection] = useGlobalState('collection')

  useEffect(() => {
    const fetchData = async () => {
      await getMyNfts()
    }
    
    fetchData()
  }, [])

  return collection.length > 0 ? (
    <div className="mt-4 p-10 flex flex-col w-full ">
      <Collection collection={collection} title="Your Collection" />
    </div>
  ) : (
    <div className="mt-4 p-10 flex flex-col w-full ">
      <h2 className="font-extrabold text-3xl md:text-5xl text-white text-center">
        You have no collection yet...
      </h2>
    </div>
  )
}

export default Collections
