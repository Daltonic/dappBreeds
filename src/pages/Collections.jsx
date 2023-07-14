import React, { useState } from 'react'
import CollectionCards from '../components/CollectionCards'
import { useEffect } from 'react'
import { generateFakeNfts } from '../utils/faker'

const Collections = () => {
  const [nfts, setNfts] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const nftsData = generateFakeNfts(6)
      setNfts(nftsData)
    }

    fetchData()
  }, [])
  return (
    <div className="mt-4 mb-10 p-10 md:p-20  flex flex-col w-full ">
      <div className="flex items-center justify-center ">
        <h2 className="  font-extrabold text-3xl md:text-5xl text-white ">
          My Collection
        </h2>
      </div>
      <CollectionCards nfts={nfts} />
    </div>
  )
}

export default Collections
