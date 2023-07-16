import { setGlobalState } from '../store'
import abi from '../abis/src/contracts/DappBreed.sol/DappBreed.json'
import address from '../abis/contractAddress.json'
import { ethers } from 'ethers'

const { ethereum } = window
const ContractAddress = address.address
const ContractAbi = abi.abi
let tx

const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

const getEthereumContract = async () => {
  const accounts = await ethereum.request({ method: 'eth_accounts' })
  const provider = accounts[0]
    ? new ethers.providers.Web3Provider(ethereum)
    : new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL)
  const wallet = accounts[0] ? null : ethers.Wallet.createRandom()
  const signer = provider.getSigner(accounts[0] ? undefined : wallet.address)

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

const mintNft = async (mintCost) => {
  if (!ethereum) return alert('Please install metamask')

  return new Promise(async (resolve, reject) => {
    try {
      const contract = await getEthereumContract()
      tx = await contract.mintNft({
        value: toWei(mintCost),
      })
      await tx.wait()
      resolve(tx)
    } catch (err) {
      reportError(err)
      reject(err)
    }
  })
}

const breedNft = async ({ fatherId, motherId, mintCost }) => {
  if (!ethereum) return alert('please install metamask')

  return new Promise(async (resolve, reject) => {
    try {
      const contract = await getEthereumContract()

      tx = await contract.breedNft(fatherId, motherId, {
        value: toWei(mintCost),
      })

      await tx.wait()
      resolve(tx)
    } catch (err) {
      reportError(err)
      reject(err)
    }
  })
}

const getMintedNfts = async () => {
  try {
    if (!ethereum) return console.log('please install metamask')
    const contract = await getEthereumContract()

    const nfts = await contract.getMintedNfts()
    console.log(nfts)
  } catch (err) {
    reportError(err)
  }
}

const getMintedNft = async (tokenId) => {
  try {
    if (!ethereum) return console.log('please install metamask')
    const contract = await getEthereumContract()

    const nft = await contract.getMintedNft(tokenId)
    console.log(nft)
  } catch (err) {
    reportError(err)
  }
}

const reportError = (error) => {
  console.log(error)
}

export {
  connectWallet,
  isWalletConnected,
  mintNft,
  breedNft,
  getMintedNfts,
  getMintedNft,
}
