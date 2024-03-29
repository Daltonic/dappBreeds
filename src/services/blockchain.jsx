import { getGlobalState, setGlobalState } from '../store'
import abi from '../abis/src/contracts/DappBreed.sol/DappBreed.json'
import address from '../abis/contractAddress.json'
import { ethers } from 'ethers'
import { logOutWithCometChat } from './chat'

const { ethereum } = window
const ContractAddress = address.address
const ContractAbi = abi.abi
let tx

const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

const getEthereumContract = async () => {
  const accounts = await ethereum.request({ method: 'eth_accounts' })
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner(accounts[0])

  const contract = new ethers.Contract(ContractAddress, ContractAbi, signer)
  return contract
}

const getContract = async () => {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.REACT_APP_RPC_URL
  )
  const wallet = ethers.Wallet.createRandom()
  const signer = provider.getSigner(wallet.address)

  const contract = new ethers.Contract(ContractAddress, ContractAbi, signer)
  return contract
}

const isWalletConnected = async () => {
  try {
    if (!ethereum) {
      reportError('Please install Metamask')
      return Promise.reject(new Error('Metamask not installed'))
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' })

    if (accounts.length) {
      setGlobalState('connectedAccount', accounts[0])
    } else {
      reportError('Please connect wallet.')
      console.log('No accounts found.')
    }

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload()
    })

    window.ethereum.on('accountsChanged', async () => {
      setGlobalState('connectedAccount', accounts[0])
      await getMyNfts()
      await logOutWithCometChat()
      await isWalletConnected()
    })

    if (accounts.length) {
      setGlobalState('connectedAccount', accounts[0])
    } else {
      setGlobalState('connectedAccount', '')
      console.log('No accounts found')
    }
  } catch (error) {
    reportError(error)
  }
}

const connectWallet = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    setGlobalState('connectedAccount', accounts[0])
  } catch (error) {
    reportError(error)
  }
}

const mintNft = async () => {
  if (!ethereum) return alert('Please install metamask')

  return new Promise(async (resolve, reject) => {
    try {
      const contract = await getEthereumContract()
      const mintCost = getGlobalState('mintCost')

      tx = await contract.mintNft({
        value: toWei(mintCost),
      })

      await tx.wait()
      await getMintedNfts()
      resolve(tx)
    } catch (err) {
      reportError(err)
      reject(err)
    }
  })
}

const breedNft = async (fatherId, motherId) => {
  if (!ethereum) return alert('please install metamask')

  return new Promise(async (resolve, reject) => {
    try {
      const contract = await getEthereumContract()
      const mintCost = getGlobalState('mintCost')

      tx = await contract.breedNft(fatherId, motherId, {
        value: toWei(mintCost),
      })

      await tx.wait()
      await getBreededNfts()
      await getMintedNfts()
      resolve(tx)
    } catch (err) {
      reportError(err)
      reject(err)
    }
  })
}

const getAllNfts = async () => {
  try {
    const contract = await getContract()
    const nfts = await contract.getAllNfts()
    setGlobalState('nfts', structuredMint(nfts))
  } catch (err) {
    reportError(err)
  }
}

const getMintedNfts = async () => {
  try {
    const contract = await getContract()
    const nfts = await contract.getMintedNfts()
    setGlobalState('minted', structuredMint(nfts))
  } catch (err) {
    reportError(err)
  }
}

const getBreededNfts = async () => {
  try {
    const contract = await getContract()
    const nfts = await contract.getBreededNfts()
    setGlobalState('breeded', structuredMint(nfts))
  } catch (err) {
    reportError(err)
  }
}

const getMyNfts = async () => {
  try {
    if (!ethereum) return console.log('please install metamask')
    const contract = await getEthereumContract()
    const nfts = await contract.getMyNfts()
    setGlobalState('collection', structuredMint(nfts))
  } catch (err) {
    reportError(err)
  }
}

const getAnNft = async (tokenId) => {
  try {
    const contract = await getContract()
    const nft = await contract.getNft(tokenId)
    await getParentsNft(tokenId)
    setGlobalState('nft', structuredMint([nft])[0])
  } catch (err) {
    reportError(err)
  }
}

const getParentsNft = async (tokenId) => {
  try {
    const contract = await getContract()
    const nfts = await contract.getParentsOf(tokenId)
    setGlobalState('parents', structuredMint(nfts))
  } catch (err) {
    reportError(err)
  }
}

const loadData = async () => {
  try {
    const contract = await getContract()
    const mintCost = await contract.mintCost()

    await getMyNfts()
    await getAllNfts()
    await getMintedNfts()
    await getBreededNfts()
    setGlobalState('mintCost', fromWei(mintCost))
  } catch (err) {
    reportError(err)
  }
}

const reportError = (error) => {
  console.log(error)
}

const structuredMint = (mintData) =>
  mintData
    .map((mint) => ({
      id: mint.id.toNumber(),
      owner: mint.owner,
      mintCost: fromWei(mint.mintCost),
      timestamp: mint.timestamp.toNumber(),
      traits: {
        name: mint.traits.name,
        description: mint.traits.description,
        weapon: mint.traits.weapon,
        image: mint.traits.image,
        environment: mint.traits.environment,
        rarity: mint.traits.rarity.toNumber(),
        breeded: mint.traits.breeded,
      },
    }))
    .sort((a, b) => b.timestamp - a.timestamp)

export {
  connectWallet,
  isWalletConnected,
  mintNft,
  breedNft,
  getAllNfts,
  getMintedNfts,
  getBreededNfts,
  getMyNfts,
  getAnNft,
  getParentsNft,
  loadData,
}
