import React from 'react'
import coinbase from '../assets/coinbase.png'
import dropbox from '../assets/dropbox.png'

import slack from '../assets/slack.png'

import webflow from '../assets/webflow.png'

const Sponsors = () => {
  return (
    <>
      <div>
        <ul className="flex flex-col md:flex-row justify-around  items-center p-10 ">
          <li>
            <img
              src={dropbox}
              alt="dropbox"
              className=" flex w-[200px] object-contain"
            />
          </li>

          <li>
            <img
              src={coinbase}
              alt="coinbase"
              className=" flex w-[200px] object-contain"
            />
          </li>
          <li>
            <img
              src={slack}
              alt="slack"
              className=" flex w-[200px] object-contain"
            />
          </li>
          <li>
            <img
              src={webflow}
              alt="webflow"
              className=" flex w-[200px] object-contain"
            />
          </li>
        </ul>
      </div>
    </>
  )
}

export default Sponsors
