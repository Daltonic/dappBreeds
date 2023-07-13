import React from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination, Autoplay } from 'swiper'
import './TrendingStyles.css'
import Button from './Button'
import heroimage1 from '../assets/heroimage1.jpg'
import { truncate } from '../utils/faker'

const TrendingCards = ({ nfts }) => {
  return (
    <div className="mt-20 w-full flex">
      <Swiper
        loop={true}
        slidesPerView={1}
        spaceBetween={10}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
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
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {nfts.map((nft, i) => (
          <SwiperSlide key={i}>
            <div className="max-w-xs sm:max-w-sm text-white overflow-hidden border border-blue-500 shadow-lg ">
              <div>
                <Link to={'/nft/' + nft.tokenId}>
                  <img
                    className="w-full block rounded-sm  border-b border-blue-500 "
                    src={heroimage1}
                    alt="Sunset in the mountains"
                  />
                </Link>
              </div>
              <Link
                to={'/nft/' + nft.tokenId}
                className="p-4 flex flex-col items-center gap-2"
              >
                <div className="flex flex-col gap-2 font-bold text-xl text-blue-500">
                  <p>
                    {nft.weapon} & {nft.environment}
                  </p>
                </div>
                <p>{nft.description}</p>
                <div className="flex flex-col gap-2 md:flex-row justify-between">
                  <div>
                    <p className="text-center">
                      <span className="font-bold ">
                        {nft.price}
                        <span>ETH</span>
                      </span>
                      <p className="text-blue-500">
                        {truncate(nft.owner, 4, 4, 11)}
                      </p>
                    </p>
                  </div>
                </div>
              </Link>

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
