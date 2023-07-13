export function generateFakeNfts(count) {
  const fakeData = []

  // Generate 10 fake data entries
  for (let i = 0; i < count; i++) {
    const tokenId = i + 1
    const name = `Trait ${i + 1}`
    const description = `This is the description for Trait ${i + 1}`
    const weapon = `Weapon ${i + 1}`
    const environment = `Environment ${i + 1}`
    const rarity = (i % 5) + 1

    const trait = {
      tokenId,
      name,
      description,
      weapon,
      environment,
      rarity,
    }

    fakeData.push(trait)
  }

  return fakeData
}
