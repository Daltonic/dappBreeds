import { useEffect, useState } from 'react'
import Heroimage3 from '../assets/heroimage3.jpg'
import CreateYourNft from '../components/CreateYourNft'
import { generateFakeNfts } from '../utils/faker'

const Details = () => {
  const [nfts, setNfts] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const nftsData = generateFakeNfts(2)
      setNfts(nftsData)
    }

    fetchData()
  }, [])

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col p-5 w-full items-center justify-center lg:flex-row gap-20 mt-10">
        <NFTImage />
        <NFTInfo />
      </div>

      <CreateYourNft nfts={nfts} title="Father & Mother" />
    </div>
  )
}

const NFTInfo = () => (
  <div className="flex flex-col items-start gap-5 w-full md:w-2/6 text-white">
    <div className="flex flex-col gap-3">
      <h4 className="text-white"> Graduate Ape</h4>

      <span>@You</span>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas
        numquam fugiat excepturi provident accusamus quibusdam blanditiis optio,
        eum nemo minus asperiores sed ipsam ratione, quisquam consectetur unde
        cumque! Non, minima.
      </p>
    </div>

    <div>
      <h4>Mint Cost</h4>
      <span>24 ETH</span>
    </div>

    <div className='flex space-x-4'>
      <div>
        <h6 className="mb-4 font-semibold md:justify-start text-blue-500">
          Weapon
        </h6>
        <ul className="flex space-x-3">
          <li className="text-neutral-600 dark:text-neutral-200">Spear</li>
        </ul>
      </div>
      <div>
        <h6 className="mb-4 font-semibold md:justify-start text-blue-500">
          Environment
        </h6>
        <ul className="flex space-x-3">
          <li className="text-neutral-600 dark:text-neutral-200">Space</li>
        </ul>
      </div>
    </div>
  </div>
)

const NFTImage = () => (
  <div className="flex">
    <li className="bg-[#202938] w-full md:w-[340px] h-[340px] flex justify-center items-center">
      <img
        src={Heroimage3}
        alt="DetailsImage"
        className="w-full h-72 object-contain p-4 md:p-0"
      />
    </li>
  </div>
)

export default Details
