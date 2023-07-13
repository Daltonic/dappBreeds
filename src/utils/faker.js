export function generateFakeNfts(count) {
  const fakeData = []

  // Generate fake data entries
  for (let i = 0; i < count; i++) {
    const tokenId = i + 1
    const name = `Trait ${i + 1}`
    const description = `This is the description for Trait ${i + 1}`
    const weapon = `Weapon ${i + 1}`
    const environment = `Environment ${i + 1}`
    const rarity = (i % 5) + 1
    const price = 0.05
    const owner = generateRandomAddress() // Function to generate a random Ethereum address

    const trait = {
      tokenId,
      name,
      description,
      weapon,
      environment,
      rarity,
      price,
      owner,
    }

    fakeData.push(trait)
  }

  return fakeData
}

function generateRandomAddress() {
  const characters = 'abcdef0123456789'
  let address = '0x'

  for (let i = 0; i < 40; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    address += characters[randomIndex]
  }

  return address
}

export const truncate = (text, startChars, endChars, maxLength) => {
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
