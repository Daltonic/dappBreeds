import React from 'react'
import heroimage1 from '../assets/heroimage1.jpg'

const CreateYourNft = () => {
  return (
    <div className="mt-4 mb-10 p-10 md:p-20  flex flex-col w-full ">
      <div className="flex items-center justify-center ">
        <h2 className="  font-extrabold text-3xl md:text-5xl text-white ">
          Create and Sell Your NFT
        </h2>
      </div>

      <div className="mt-20 w-full">
        <div className=" flex flex-col lg:flex-row justify-center items-center gap-3">
          <div className="   max-w-xs  sm:max-w-sm text-white overflow-hidden border-2  rounded-xl border-gray-400 shadow-lg ">
            <div className="flex flex-col gap-2 p-4">
              <div>
                <img
                  src={heroimage1}
                  alt="heroimage1"
                  className=" w-12 h-12 "
                />
              </div>
              <div>
                <h2 className=" font-extrabold">Connect Wallet</h2>
              </div>
              <div>
                <p>
                  This growth plan will help you reach your resolutions and
                  achieve the goals you have been striving towards
                </p>
              </div>
            </div>
          </div>

          <div className="   max-w-xs  sm:max-w-sm text-white overflow-hidden border-2  rounded-xl border-gray-400 shadow-lg ">
            <div className="flex flex-col gap-2 p-4">
              <div>
                <img
                  src={heroimage1}
                  alt="heroimage1"
                  className=" w-12 h-12 "
                />
              </div>
              <div>
                <h2 className=" font-extrabold">NFT Market Place</h2>
              </div>
              <div>
                <p>
                  This growth plan will help you reach your resolutions and
                  achieve the goals you have been striving towards
                </p>
              </div>
            </div>
          </div>

          <div className="   max-w-xs  sm:max-w-sm text-white overflow-hidden border-2  rounded-xl border-gray-400 shadow-lg ">
            <div className="flex flex-col gap-2 p-4">
              <div>
                <img
                  src={heroimage1}
                  alt="heroimage1"
                  className=" w-12 h-12 "
                />
              </div>
              <div>
                <h2 className=" font-extrabold">Collect NFT</h2>
              </div>
              <div>
                <p>
                  This growth plan will help you reach your resolutions and
                  achieve the goals you have been striving towards
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateYourNft
