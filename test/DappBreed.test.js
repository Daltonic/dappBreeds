const { expect } = require('chai')

const toWei = (num) => ethers.utils.parseEther(num.toString())

describe('Contracts', () => {
  let contract, result

  const _maxSupply = 99
  const _name = 'Dapp Breeds'
  const _symbol = 'DAB'
  const _baseUri =
    'https://ipfs.io/ipfs/QmTWbe9wDns7aqZQNCuWh5PqybGbBF91kngC5Zf8qmCoyg/'
  const id = 1
  const fatherTokenId = 1
  const motherTokenId = 2
  const childTokenId = 3

  beforeEach(async () => {
    const Contract = await ethers.getContractFactory('DappBreed')
    ;[deployer, user1, user2] = await ethers.getSigners()

    contract = await Contract.deploy(_name, _symbol, _baseUri, _maxSupply)
    await contract.deployed()
  })

  beforeEach(async () => {
    await contract.mintNft({
      value: toWei(0.005),
    })
  })

  describe('Minting', () => {
    it('it should confirm nft minting', async () => {
      result = await contract.getMintedNfts()
      expect(result).to.have.lengthOf(1)

      result = await contract.getNft(id)
      expect(result.id).to.be.equal(id)
    })

    it('it should confirm second mint', async () => {
      result = await contract.getMintedNfts()
      expect(result).to.have.lengthOf(1)

      await contract.connect(user1).mintNft({
        value: toWei(0.005),
      })

      result = await contract.getMintedNfts()
      expect(result).to.have.lengthOf(2)
    })
  })

  describe('Breeding', () => {
    beforeEach(async () => {
      await contract.connect(user1).mintNft({
        value: toWei(0.005),
      })
    })

    it('it should confirm nft breeding', async () => {
      result = await contract.getAllNfts()
      expect(result).to.have.lengthOf(2)

      result = await contract.getBreededNfts()
      expect(result).to.have.lengthOf(0)

      const father = await contract.getNft(fatherTokenId)
      const mother = await contract.getNft(motherTokenId)

      await contract.connect(user1).breedNft(father.id.toNumber(), mother.id.toNumber(), {
        value: toWei(0.005),
      })

      result = await contract.getMyNfts()
      expect(result).to.have.lengthOf(1)

      result = await contract.getBreededNfts()
      expect(result).to.have.lengthOf(1)
    })

    it('it should confirm nft breeded parents', async () => {
      const father = await contract.getNft(fatherTokenId)
      const mother = await contract.getNft(motherTokenId)

      await contract.breedNft(father.id.toNumber(), mother.id.toNumber(), {
        value: toWei(0.005),
      })

      const child = await contract.getNft(childTokenId)
      expect(father.id).to.be.equal(child.traits.parents[0])
      expect(mother.id).to.be.equal(child.traits.parents[1])

      result = await contract.getParentsOf(child.id)
      expect(result).to.have.lengthOf(2)
      expect(result[0].id).to.be.equal(father.id)
      expect(result[1].id).to.be.equal(mother.id)

      expect(father.traits.weapon).to.be.equal(child.traits.weapon)
      expect(mother.traits.environment).to.be.equal(child.traits.environment)
    })
  })
})
