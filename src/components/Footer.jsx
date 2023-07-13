import React from 'react'
import { HiHome, HiPhone } from 'react-icons/hi'
import { MdEmail } from 'react-icons/md'

const Footer = () => {
  return (
    <footer className="bg-gray-400 text-center lg:text-left">
      <div className="mx-6 py-10 text-center md:text-left p-6">
        <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="">
            <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
              DappBreed
            </h6>
            <p>
              Here you can use rows and columns to organize your footer content.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>

          <div className="">
            <h6 className="mb-4 font-semibold  md:justify-start">Tools</h6>
            <p className="mb-4">
              <a href="#!" className="text-neutral-600 dark:text-neutral-200">
                Angular
              </a>
            </p>
            <p className="mb-4">
              <a href="#!" className="text-neutral-600 dark:text-neutral-200">
                React
              </a>
            </p>
            <p className="mb-4">
              <a href="#!" className="text-neutral-600 dark:text-neutral-200">
                Vue
              </a>
            </p>
          </div>

          <div>
            <h6 className="mb-4  md:justify-start">Company</h6>
            <div className="mb-4 flex items-center justify-center md:justify-start space-x-2">
              <HiHome size={24} />
              <span> New York, NY 10012, US</span>
            </div>
            <div className="mb-4 flex items-center justify-center md:justify-start space-x-2">
              <MdEmail size={24} />
              <span>info@example.com</span>
            </div>
            <div className="mb-4 flex items-center justify-center md:justify-start space-x-2">
              <HiPhone size={24} />
              <span>+ 01 234 567 88</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center space-x-2 bg-gray-400 text-center dark:bg-neutral-700 p-6">
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
