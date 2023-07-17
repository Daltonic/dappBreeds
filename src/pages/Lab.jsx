import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { setGlobalState, useGlobalState } from '../store'
import { breedNft } from '../services/blockchain'
import { toast } from 'react-toastify'

const Lab = () => {
  const [nfts] = useGlobalState('nfts')
  const [breeds] = useGlobalState('breeds')
  const [connectedAccount] = useGlobalState('connectedAccount')

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

  const onRandomSelect = () => {
    setGlobalState('breeds', shuffleArray(nfts).slice(0, 2))
  }

  const shuffleArray = (array) => {
    const shuffledArray = [...array]

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1))
      ;[shuffledArray[i], shuffledArray[randomIndex]] = [
        shuffledArray[randomIndex],
        shuffledArray[i],
      ]
    }

    return shuffledArray
  }

  return (
    <div className="mt-4 mb-10">
      {breeds.length > 0 ? (
        <div className=" p-10 md:p-20 flex flex-col gap-20 items-center justify-center lg:flex-row  px-2">
          {breeds.map((nft, i) => (
            <div
              key={i}
              className="flex items-center justify-center cursor-pointer relative
              h-[20rem] w-[20rem] bg-transparent border-2 border-blue-500"
              style={{ backgroundImage: `url(${nft.traits.image})` }}
            >
              <div className="absolute inset-0 bg-black opacity-50">
                <div
                  className="flex flex-col justify-center items-center
                  gap-3 text-white h-full font-bold text-5xl"
                >
                  <span>{nft.traits.name}</span>
                </div>
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

      <div className="py-4 flex flex-col md:flex-row justify-center items-center  gap-4">
        <button
          className="bg-transparent hover:bg-blue-500
            text-white font-semibold hover:text-white
            py-2 px-4 border border-white hover:border-blue-500 
            rounded-sm transition-all duration-300"
          onClick={onRandomSelect}
        >
          Randomly Select
        </button>
        {breeds.length >= 2 && (
          <button
            className="bg-transparent hover:bg-blue-500
            text-white font-semibold hover:text-white
            py-2 px-4 border border-white hover:border-blue-500 
            rounded-sm transition-all duration-300"
            onClick={onBreed}
          >
            Breed Now
          </button>
        )}
        <button
          className="bg-transparent hover:bg-blue-500
            text-white font-semibold hover:text-white
            py-2 px-4 border border-white hover:border-blue-500 
            rounded-sm transition-all duration-300"
          onClick={() => setGlobalState('breeds', [])}
        >
          Clear Selection
        </button>
      </div>
    </div>
  )
}

export default Lab
