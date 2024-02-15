'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Gallery, { GallerySmall } from './Gallery';
import Cards from '@/app/Cards';
import { LoginButton } from './auth/login-button';
import Link from 'next/link';
import Features from './Features';

const Body: React.FC = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-2 pt-5 md:pt-0 md:gap-0">
      <div className="max-w-screen-2xl mx-auto mt-4 mb-8 md:mb-16 md:my-16 px-4 z-10 relative">
        <h1 className="m-0 text-center text-6xl md:text-[80px] font-normal overflow-hidden pb-3 --local-ebgaramond">
          <span className=" ml-4 first:ml-0 inline-block">Track</span>
          <span className=" ml-4 first:ml-0 inline-block">your</span> <br />
          <span className="text-[#1722BE] dark:text-yellow ml-4 first:ml-0 inline-block">
            writing
          </span>
          <span className="text-[#1722BE] dark:text-yellow ml-4 first:ml-0 inline-block">
            progress
          </span>
          <span className="text-[#1722BE] dark:text-yellow ml-4 first:ml-0 inline-block  animate-pulse">
            effortlessly
          </span>
        </h1>
        <h2 className="m-0 text-center text-[18px] xl:text-2xl leading-tight font-normal mt-2 md:px-28 xl:px-96 md:mt-3 text-gray-500 mb-6">
          Automatically sync your writing activity from your Google Doc and view
          your progress on a calendar
        </h2>
        <div className="flex justify-center items-center mt-11 -mb-11 md:-mb-6 gap-5">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-black border-[1.5px] relative top-[2px] rounded-[8px] w-auto text-primary inline-block border-button text-center group disabled:opacity-50 disabled:cursor-not-allowed  group"
          >
            <span className="relative text-center w-auto bg-[#323DD6] text-white border-black rounded-[8px] text-[15px] font-bold border-[1.5px] px-5 py-2 -translate-y-1 hover:-translate-y-1.5 active:-translate-y-0.5 mx-[-1.5px] group-disabled:hover:!-translate-y-1 block active:transition-all active:duration-100 select-none ">
              <LoginButton mode='modal'>Get started - free</LoginButton>
            </span>
          </motion.div>

          {/* <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-black border-[1.5px] relative top-[2px] rounded-[8px] w-auto text-primary inline-block border-button text-center group disabled:opacity-50 disabled:cursor-not-allowed "
            href="#"
          >
            <span className="relative text-center w-auto bg-white text-primary hover:text-primary dark:text-primary-dark dark:hover:text-primary-dark border-button dark:border-orange dark:bg-dark rounded-[8px] text-[15px] font-bold border-[1.5px] px-5 py-2 -translate-y-1 hover:-translate-y-1.5 active:-translate-y-0.5 mx-[-1.5px] group-disabled:hover:!-translate-y-1 block active:transition-all active:duration-100 select-none ">
              Get a demo
            </span>
          </motion.a> */}
        </div>
      </div>
      <div className="relative max-w-screen hidden z-20 md:hidden lg:block mb-16">
        <Gallery />
      </div>
      <div className="md:block lg:hidden relative max-w-screen hidden z-20 mb-16">
        <GallerySmall />
      </div>
      <span className="md:block mt-60 md:h-96" />
      {/* <Cards /> */}
      <Features />
    </div>
  );
};

export default Body;
