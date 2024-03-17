"use client";
import React from "react";
import { motion } from "framer-motion";
import Gallery, { GallerySmall } from "./Gallery";
// import Cards from '@/app/Cards';
import { LoginButton } from "./auth/login-button";
// import Link from 'next/link';
import Features from "./Features";
import {
  Plus as PlusSmallIcon,
  Minus as MinusSmallIcon,
  Settings as Cog6ToothIcon,
  Lock as LockClosedIcon,
  PencilIcon,
} from "lucide-react";
import { RiNotionFill, RiGoogleFill } from "react-icons/ri";
const features = [
  // {
  //   name: "Open Source",
  //   description: "This gives you the freedom to adapt and customize the tool to your specific needs.",
  //   icon: CloudArrowUpIcon,
  // },
  {
    name: "Secure Document Storage",
    description: "Your documents are stored encrypted with AES-256-CBC encryption for maximum security.",
    icon: LockClosedIcon,
  },
  {
    name: "Notion Integration",
    description: "Seamlessly track with Notion page writing activity.",
    icon: RiNotionFill,
  },
  {
    name: "Google Integration",
    description: "Seamlessly track with Google Docs writing activity.",
    icon: RiGoogleFill,
  },
  {
    name: "Notion-style WYSIWYG editor",
    description: "Write and format your documents with a modern, intuitive WYSIWYG editor similar to Notion's.",
    icon: PencilIcon,
  },
  {
    name: "AI-powered",
    description: "Use AI autocomplete to enhance your writing experience.",
    icon: Cog6ToothIcon,
  },
  // {
  //   name: "Community Support",
  //   description: "Being an open-source project, Clack is backed by a community of developers  ",
  //   icon: ServerIcon,
  // },
];

const Body: React.FC = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-2 pt-5 md:pt-0 md:gap-0">
      <div className="max-w-screen-2xl mx-auto mt-4 mb-8 md:mb-16 md:my-16 px-4 z-30 relative">
        <h1 className="m-0 text-center text-6xl md:text-[80px] font-normal overflow-hidden pb-3 --local-ebgaramond">
          <span className=" ml-4 first:ml-0 inline-block">Track</span>
          <span className=" ml-4 first:ml-0 inline-block">your</span> <br />
          <span className="text-[#1722BE] dark:text-yellow ml-4 first:ml-0 inline-block">writing</span>
          <span className="text-[#1722BE] dark:text-yellow ml-4 first:ml-0 inline-block">progress</span>
          <span className="text-[#1722BE] dark:text-yellow ml-4 mt-2 md:mt-0 first:ml-0 inline-block  animate-pulse">
            effortlessly
          </span>
        </h1>
        <h2 className="m-0 text-center text-[18px] xl:text-2xl leading-tight font-normal mt-5 md:px-28 xl:px-96 md:mt-3 text-gray-500 mb-6">
          Automatically sync your writing activity from Google Docs and Notion, and track your progress on a calendar.
        </h2>
        <div className="flex justify-center items-center mt-11 -mb-11 md:-mb-6 gap-5">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-black border-[1.5px] relative top-[2px] rounded-[8px] w-auto text-primary inline-block border-button text-center group disabled:opacity-50 disabled:cursor-not-allowed  group"
          >
            <span className="relative text-center w-auto bg-[#323DD6] text-white border-black rounded-[8px] text-[15px] font-bold border-[1.5px] px-5 py-2 -translate-y-1 hover:-translate-y-1.5 active:-translate-y-0.5 mx-[-1.5px] group-disabled:hover:!-translate-y-1 block active:transition-all active:duration-100 select-none ">
              <LoginButton mode="modal">Get started - free</LoginButton>
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
        <div
          className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
          aria-hidden="true"
        >
          <div
            className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <Gallery />
      </div>
      <div className="md:block lg:hidden relative max-w-screen hidden z-20 mb-16">
        <GallerySmall />
      </div>
      <span className="md:block mt-32 md:mt-60 md:h-96" />
      {/* <Cards /> */}
      <Features />
      {/* Feature section */}
      <div>
        <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
          <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-500 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-9">
                <dt className="inline font-semibold text-gray-600 dark:text-gray-200">
                  <feature.icon
                    className="absolute left-1 top-1 h-5 w-5 text-black dark:text-white"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>{" "}
                <dd className="inline">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Body;
