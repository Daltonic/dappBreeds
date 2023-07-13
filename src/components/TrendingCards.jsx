import React from 'react'
import { Link } from 'react-router-dom'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper'

import './TrendingStyles.css'
import Button from './Button'
import heroimage1 from '../assets/heroimage1.jpg'

const TrendingCards = ({ nfts }) => {
  return (
    <div className="mt-20 w-full flex">
      <Swiper
        loop={true}
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {nfts.map((nft, i) => (
          <SwiperSlide key={i}>
            <div className="max-w-xs sm:max-w-sm text-white overflow-hidden border-2 border-gray-400 shadow-lg ">
              <div>
                <Link to="/details">
                  <img
                    className="w-full block rounded-sm  border-[1px] border-blue-500 "
                    src={heroimage1}
                    alt="Sunset in the mountains"
                  />
                </Link>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <div className="flex flex-col  gap-2 font-bold text-xl">
                  <p>Weapon: {nft.weapon}</p>
                  <span>Environment: {nft.environment}</span>
                </div>
                <p>{nft.description}</p>
                <div className="flex  flex-col gap-2 md:flex-row justify-between">
                  <div>
                    <p className="font-bold">
                      9.61<span>ETH</span>
                    </p>
                    <span>latest Bid</span>
                  </div>
                  <div>
                    <p className="font-bold">
                      14.61 wallet address<span>ETH</span>
                    </p>
                    <span>From</span>
                  </div>
                </div>
              </div>

              <div className=" py-4 flex  justify-center items-center ">
                <Button>Breed Now</Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default TrendingCards
