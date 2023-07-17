import { createGlobalState } from 'react-hooks-global-state'

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  connectedAccount: '',
  nfts: [],
  minted: [],
  breeded: [],
  collection: [],
  breeds: [],
  nft: null,
  father: null,
  mother: null,
  mintCost: 0,
})

const truncate = (text, startChars, endChars, maxLength) => {
  if (text.length > maxLength) {
    let start = text.substring(0, startChars)
    let end = text.substring(text.length - endChars, text.length)
    while (start.length + end.length < maxLength) {
      start = start + '.'
    }
    return start + end
  }
  return text
}

const addToLab = (nft) => {
  const breeds = getGlobalState('breeds')
  if (breeds.length == 2) return
  setGlobalState('breeds', [nft, ...breeds])
}

const remFromLab = (nft) => {
  const breeds = getGlobalState('breeds')
  const index = breeds.findIndex((breed) => breed.tokenId == nft.tokenId)
  breeds.splice(index, 1)
  setGlobalState('breeds', [...breeds])
}

export {
  setGlobalState,
  useGlobalState,
  getGlobalState,
  addToLab,
  remFromLab,
  truncate,
}
