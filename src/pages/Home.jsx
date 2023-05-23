import React from 'react'
import CreateYourNft from '../components/CreateYourNft'

import Hero from '../components/Hero'
import Sponsors from '../components/Sponsors'

import Trending from '../components/Trending'


const Home = () => {
  return (
    <div>
      <Hero />
      <Sponsors />
      <Trending />
      <CreateYourNft />
      
    </div>
  )
}

export default Home
