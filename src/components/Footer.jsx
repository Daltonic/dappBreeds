import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-400 text-center lg:text-left">
      <div className="mx-6 py-10 text-center md:text-left p-6">
        <div className="flex justify-between items-start">
          <div className="w-full md:w-2/6">
            <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
              DappBreed
            </h6>
            <p>
              Here you can use rows and columns to organize your footer content.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>

          <div className="w-full md:w-2/6">
            <h6 className="mb-4 font-semibold  md:justify-start">NFT</h6>
            <ul className="text-white">
              <li>Breeding</li>
              <li>Minting</li>
              <li>Earnings</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center space-x-2 bg-gray-400 text-center dark:bg-neutral-700 p-6">
        <span>With Love ❤️</span>
        <a
          href="https://dappmentors.org/"
          className="font-semibold text-neutral-600 dark:text-neutral-400"
        >
          Dapp Mentors {new Date().getFullYear()}
        </a>
      </div>
    </footer>
  )
}

export default Footer
