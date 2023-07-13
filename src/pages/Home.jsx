import React, { useEffect } from 'react'
import CreateYourNft from '../components/CreateYourNft'
import Hero from '../components/Hero'
import Sponsors from '../components/Sponsors'
import Trending from '../components/Trending'
import { useState } from 'react'
import { generateFakeNfts } from '../utils/faker'

const Home = () => {
  const [nfts, setNfts] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const nftsData = generateFakeNfts(6)
      setNfts(nftsData)
    }

    fetchData()
  }, [])

  return (
    <div>
      <Hero />
      <Sponsors />
      <Trending nfts={nfts} />
      <CreateYourNft nfts={nfts} />
    </div>
  )
}

export default Home
