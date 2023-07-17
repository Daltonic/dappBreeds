import { useEffect, useState } from 'react'
import { getAnNft } from '../services/blockchain'
import { useParams } from 'react-router-dom'
import { truncate, useGlobalState } from '../store'
import { useNavigate } from 'react-router-dom'
import CollectionCard from '../components/CollectionCard'

const Details = () => {
  const [nft] = useGlobalState('nft')
  const [parents] = useGlobalState('parents')
  const { id } = useParams()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      await getAnNft(id)
      setLoaded(true)
    }

    fetchData()
  }, [id])

  return loaded ? (
    <div className="w-full flex flex-col">
      <div className="flex flex-col p-5 w-full items-center justify-center lg:flex-row gap-20 mt-10">
        <NFTImage nft={nft} />
        <NFTInfo nft={nft} />
      </div>

      {parents.length > 0 && (
        <div className="my-10 p-10 md:p-20 w-full space-y-10">
          <h2 className="font-extrabold text-3xl md:text-5xl text-white text-center">
            Inherited From
          </h2>
          <div className="flex justify-center items-center space-x-4">
            {parents.map((nft, i) => (
              <CollectionCard key={i} nft={nft} />
            ))}
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="w-full flex flex-col">
      <h2 className="font-extrabold text-3xl md:text-5xl text-white text-center">
        Loading...
      </h2>
    </div>
  )
}

const NFTInfo = ({ nft }) => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-start gap-5 w-full md:w-2/6 text-white">
      <div className="flex flex-col gap-3">
        <h4 className="text-white">{nft.traits.name}</h4>

        <span>@{truncate(nft.owner, 4, 4, 11)}</span>
        <p>{nft.traits.description}</p>
      </div>

      <div>
        <h4>Mint Cost</h4>
        <span>{nft.mintCost} ETH</span>
      </div>

      <div className="flex space-x-4">
        <div>
          <h6 className="mb-4 font-semibold md:justify-start text-blue-500">
            Weapon
          </h6>
          <ul className="flex space-x-3">
            <li className="text-neutral-600 dark:text-neutral-200">
              {nft.traits.weapon}
            </li>
          </ul>
        </div>
        <div>
          <h6 className="mb-4 font-semibold md:justify-start text-blue-500">
            Environment
          </h6>
          <ul className="flex space-x-3">
            <li className="text-neutral-600 dark:text-neutral-200">
              {nft.traits.environment}
            </li>
          </ul>
        </div>
      </div>

      <button
        onClick={() => navigate('/chats/' + nft.owner)}
        className="bg-transparent hover:bg-blue-500
          text-white font-semibold hover:text-white
          py-2 px-4 border border-white hover:border-blue-500 
          rounded-sm transition-all duration-300"
      >
        Chat with Owner
      </button>
    </div>
  )
}

const NFTImage = ({ nft }) => (
  <div className="flex">
    <li className="bg-[#202938] w-full md:w-[340px] h-[340px] flex justify-center items-center">
      <img
        src={nft.traits.image}
        alt="DetailsImage"
        className="w-full h-72 object-contain p-4 md:p-0"
      />
    </li>
  </div>
)

export default Details
