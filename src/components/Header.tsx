import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const Header: React.FC = (): JSX.Element => {
  return (
    <header className="z-[23] sticky top-0 bg-white">
      <div className="border-b border-light dark:border-dark mb-1">
        <div className="flex mx-auto px-2 md:px-0 mdlg:px-5 justify-items-center transition-all max-w-screen-3xl box-content">
          <div className="flex-1 flex">
            <div className="max-w-[60px] max-h-[60px] flex flex-row align-middle">
              <Image src="/logo.png" height={740} width={740} alt="=logo" priority />
            </div>
            <Link className="flex h-full items-center relative px-3 py-4 mdlg:p-4" href="/">
              <span className="relative text-3xl font-extrabold --local-comfortaa">clack</span>
            </Link>
          </div>
          <ul className="md:flex hidden list-none m-0 p-0">
            <li className="h-full">
              <Link
                className=" text-base font-medium flex h-full items-center relative px-3 py-4 mdlg:p-4 opacity-70 hover:opacity-100"
                href="/features"
              >
                <span className="relative">Features</span>
              </Link>
            </li>
            <li className="h-full">
              <Link
                rel="noopener noreferrer"
                href="/blog"
                className="text-base font-medium flex h-full items-center relative px-3 py-4 mdlg:p-4 opacity-70 hover:opacity-100 group"
                target=""
              >
                <span className="relative">Blog</span>
              </Link>
            </li>
            <li className="h-full">
              <Link
                className="text-base font-medium flex h-full items-center relative px-3 py-4 mdlg:p-4 opacity-70 hover:opacity-100"
                href="/pricing"
              >
                <span className="relative">Pricing</span>
              </Link>
            </li>
          </ul>
          <div className="flex items-center justify-end flex-1">
            {/* <span className="">
              <button className="group my-1mr-[1px] p-2 hover:bg-border dark:hover:bg-border-dark rounded">
                <svg
                  className="LemonIcon opacity-50 inline-block w-6 group-hover:opacity-75"
                  width="100%"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11 4.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM3 11a8 8 0 1 1 14.162 5.102l3.618 3.618a.75.75 0 1 1-1.06 1.06l-3.618-3.618A8 8 0 0 1 3 11Z"
                  ></path>
                </svg>
              </button>
            </span> */}
            <span className="group/parent relative text-primary dark:text-primary-dark flex flex-row gap-4">
              <Link href='/auth/login'>
                <Button className="my-1 p-2 rounded hover:bg-border dark:hover:bg-border-dark mr-2">Login</Button>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
