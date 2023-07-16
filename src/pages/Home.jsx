import React from 'react'
import CreateYourNft from '../components/CreateYourNft'
import Hero from '../components/Hero'
import Sponsors from '../components/Sponsors'
import Trending from '../components/Trending'
import { useGlobalState } from '../store'

const Home = () => {
  const [nfts] = useGlobalState('nfts')

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
