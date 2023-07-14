import React from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination, Autoplay } from 'swiper'
import './TrendingStyles.css'
import heroimage1 from '../assets/heroimage1.jpg'
import { truncate } from '../utils/faker'
import { addToLab, remFromLab, useGlobalState } from '../store'

const TrendingCards = ({ nfts }) => {
  const [breeds] = useGlobalState('breeds')

  const onAddToLab = (nft) => {
    if (breeds.some((breed) => breed.tokenId == nft.tokenId)) return
    nft.selected = true
    addToLab(nft)
  }

  const onRemFromLab = (nft) => {
    if (!breeds.some((breed) => breed.tokenId == nft.tokenId)) return
    nft.selected = false
    remFromLab(nft)
  }

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
                  <span>
                    {nft.weapon} & {nft.environment}
                  </span>
                </div>
                <span>{nft.description}</span>
                <div className="flex flex-col gap-2 md:flex-row justify-between">
                  <p className="flex flex-col text-center">
                    <span className="font-bold ">
                      <span>{nft.price}</span>
                      <span>ETH</span>
                    </span>

                    <span className="text-blue-500">
                      {truncate(nft.owner, 4, 4, 11)}
                    </span>
                  </p>
                </div>
              </Link>

              <div className="flex justify-center items-center py-4">
                {nft.selected ? (
                  <button
                    onClick={() => onRemFromLab(nft)}
                    className="bg-blue-500 hover:bg-blue-600
                    text-white font-semibold hover:text-white
                    py-2 px-4 border-0 rounded-sm transition-all duration-300"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    onClick={() => onAddToLab(nft)}
                    className="bg-transparent hover:bg-blue-500
                    text-white font-semibold hover:text-white
                    py-2 px-4 border border-white hover:border-blue-500 
                    rounded-sm transition-all duration-300"
                  >
                    Breed Now
                  </button>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default TrendingCards
