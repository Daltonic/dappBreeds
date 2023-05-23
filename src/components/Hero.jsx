import React from 'react'
import Heroimage3 from '../assets/heroimage3.jpg'

const Hero = () => {
  return (
    <div className="mt-20  flex flex-col-reverse gap-10 items-center justify-center lg:flex-row  px-2  md:px-10 ">
      <div className="flex flex-col   gap-8 items-start justify-center  ">
        <div className=" flex  flex-col  font-bold text-white  gap-5">
          <div className=" text-3xl sm:text-5xl  font-bold md:text-7xl ">
            <h2>Create Your</h2>
            <h2>
              Own<span>NFT Dream </span>
            </h2>
            <h2>Gallery</h2>
          </div>
          <div>
            <p className="flex w-auto  md:w-[450px]">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not
            </p>
          </div>
        </div>

        <div className="flex gap-5">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold   py-4 px-6 sm:px-14 rounded-full">
            Explore
          </button>

          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold  py-4 px-6 sm:px-14  rounded-full">
           Mint
          </button>
        </div>

        <div className="flex justify-center items-center  ml-5 gap-10 text-white ">
          <div>
            <span>Art Work</span>
            <p>21.5k </p>
          </div>
          <div>
            <span>Artist</span>
            <p>15.6k </p>
          </div>
          <div>
            <span>Auction</span>
            <p>21.5k </p>
          </div>
        </div>
      </div>

      <div className="flex flex-1  items-center justify-center">
        <img
          src={Heroimage3}
          alt="HeroImage3"
          className="h-[20rem] object-cover  rounded-md  border-2 border-blue-500  flex items-end justify-end md:h-[25rem]"
        />
      </div>
    </div>
  )
}

export default Hero
