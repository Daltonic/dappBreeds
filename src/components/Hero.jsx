import React from 'react'
import Heroimage3 from '../assets/heroimage3.jpg'
import { setGlobalState, useGlobalState } from '../store'
import { toast } from 'react-toastify'
import { breedNft, mintNft } from '../services/blockchain'

const Hero = () => {
  return (
    <div className="mt-20 flex flex-col-reverse gap-10 items-center justify-center lg:flex-row  px-2  md:px-10 ">
      <HeroActions />
      <HeroImage />
    </div>
  )
}

const HeroActions = () => {
  const [breeds] = useGlobalState('breeds')
  const [connectedAccount] = useGlobalState('connectedAccount')

  const onMint = async () => {
    if (!connectedAccount) return toast.warning('Wallet not connected')

    await toast.promise(
      new Promise(async (resolve, reject) => {
        await mintNft()
          .then((tx) => {
            console.log(tx)
            resolve(tx)
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      }),
      {
        pending: 'Approve transaction...',
        success: 'NFT Minted successfully 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  const onBreed = async () => {
    if (!connectedAccount) return toast.warning('Wallet not connected')
    const fatherId = breeds[0].id
    const motherId = breeds[1].id

    await toast.promise(
      new Promise(async (resolve, reject) => {
        await breedNft(fatherId, motherId)
          .then((tx) => {
            console.log(tx)
            setGlobalState('breeds', [])
            resolve(tx)
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      }),
      {
        pending: 'Approve transaction...',
        success: 'NFT Breeded successfully 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  return (
    <div className="flex flex-col   gap-8 items-start justify-center  ">
      <div className=" flex  flex-col  font-bold text-white  gap-5">
        <div className=" text-3xl sm:text-5xl  font-bold md:text-7xl ">
          <h2>Create Your</h2>
          <h2>
            Own<span>NFT Dream </span>
          </h2>
          <h2>Gallery</h2>
        </div>
        <p className="flex w-auto  md:w-[450px] font-normal">
          Take it a step further and explore the exciting world of NFT breeding.
          Combine traits, characteristics, and attributes of your existing NFTs
          to create entirely new and extraordinary pieces. Unleash your
          creativity and experiment with endless possibilities to breed your own
          masterpiece.
        </p>
      </div>

      <div className="flex gap-5">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold
          rounded-full transition-all duration-300 py-4 px-6 sm:px-14 shadow-md shadow-black"
          onClick={onMint}
        >
          Mint
        </button>

        <button
          className="border-2 border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500 font-bold
          rounded-full transition-all duration-300 py-4 px-6 sm:px-14 space-x-1 shadow-md shadow-black"
          onClick={onBreed}
        >
          <span>Breed Now</span>
          {breeds.length > 0 && (
            <span className="bg-white p-1 rounded-full text-black">
              {breeds.length}
            </span>
          )}
        </button>
      </div>

      <div className="flex justify-center items-center  ml-5 gap-10 text-white ">
        <div>
          <span>Artworks</span>
          <p className="font-bold">21.5k </p>
        </div>
        <div>
          <span>Artist</span>
          <p className="font-bold">15.6k </p>
        </div>
        <div>
          <span>Breeds</span>
          <p className="font-bold">21.5k </p>
        </div>
      </div>
    </div>
  )
}

const HeroImage = () => (
  <div className="flex flex-1  items-center justify-center">
    <img
      src={Heroimage3}
      alt="HeroImage3"
      className="h-[20rem] object-cover  rounded-md  border-2 border-blue-500  flex items-end justify-end md:h-[25rem]"
    />
  </div>
)

export default Hero
