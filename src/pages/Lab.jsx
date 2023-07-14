import React from 'react'

import { AiOutlinePlus } from 'react-icons/ai'
import Button from '../components/Button'
import { useGlobalState } from '../store'

const Lab = () => {
  const [breeds] = useGlobalState('breeds')
  return (
    <div className="mt-4 mb-10">
      {breeds.length > 0 ? (
        <div className=" p-10 md:p-20 flex flex-col gap-20 items-center justify-center lg:flex-row  px-2">
          {breeds.map((nft, i) => (
            <div
              key={i}
              className="flex items-center justify-center cursor-pointer
            h-[20rem] w-[20rem] bg-transparent border-2 border-blue-500"
            >
              <div className="flex flex-col items-center gap-3 ">
                <AiOutlinePlus size={32} />
                <span>Add Mother</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-10 md:p-20 flex flex-col gap-20 items-center justify-center lg:flex-row  px-2">
          <div
            className="flex items-center justify-center cursor-pointer
            h-[20rem] w-[20rem] bg-transparent border-2 border-blue-500"
          >
            <div className="flex flex-col items-center gap-3 ">
              <AiOutlinePlus size={32} />
              <span>Add Father</span>
            </div>
          </div>
          <div
            className="flex items-center justify-center cursor-pointer
            h-[20rem] w-[20rem] bg-transparent border-2 border-blue-500"
          >
            <div className="flex flex-col items-center gap-3 ">
              <AiOutlinePlus size={32} />
              <span>Add Mother</span>
            </div>
          </div>
        </div>
      )}

      <div className=" py-4  flex   flex-col md:flex-row justify-center items-center  gap-4">
        <Button>Random Selection</Button>
        <Button>Mint NFT</Button>
        <Button>Clear Selection</Button>
      </div>
    </div>
  )
}

export default Lab
