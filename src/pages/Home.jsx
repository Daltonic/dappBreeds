import React from 'react'
import CreateYourNft from '../components/CreateYourNft'
import Hero from '../components/Hero'
import Sponsors from '../components/Sponsors'
import Trending from '../components/Trending'
import { useGlobalState } from '../store'

const Home = () => {
  const [minted] = useGlobalState('minted')
  const [breeded] = useGlobalState('breeded')

  return (
    <div>
      <Hero />
      <Sponsors />
      <Trending nfts={minted} />
      {breeded.length > 0 && <CreateYourNft collection={breeded} />}
    </div>
  )
}

export default Home
