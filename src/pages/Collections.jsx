import React from 'react'
import { useGlobalState } from '../store'
import CreateYourNft from '../components/CreateYourNft'

const Collections = () => {
  const [collection] = useGlobalState('collection')

  return (
    <div className="mt-4 mb-10 p-10 md:p-20 flex flex-col w-full ">
      <CreateYourNft collection={collection} title="Your Collection" />
    </div>
  )
}

export default Collections
