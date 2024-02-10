import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Header: React.FC = (): JSX.Element => {
  return (
    <header className="relative z-[999999] md:sticky md:top-0 bg-white">
      <div className="border-b border-light dark:border-dark bg-accent dark:bg-accent-dark mb-1">
        <div className="flex mx-auto px-2 md:px-0 mdlg:px-5 justify-items-center transition-all max-w-screen-3xl box-content">
          <div className="flex-1 flex">
            <div className="max-w-[60px] max-h-[60px] flex flex-row align-middle">
              <Image
                src="/logo.png"
                height={740}
                width={740}
                alt="=logo"
                priority
              />
            </div>
            <Link
              className="flex h-full items-center relative px-3 py-4 mdlg:p-4 opacity-70 hover:opacity-100"
              href="/"
            >
              <span className="relative text-3xl font-extrabold --local-comfortaa">
                clack
              </span>
            </Link>
          </div>
          <ul className="md:flex hidden list-none m-0 p-0">
            <li className="h-full">
              <Link
                className=" text-base font-medium flex h-full items-center relative px-3 py-4 mdlg:p-4 opacity-70 hover:opacity-100"
                href="/docs"
              >
                <span className="relative">Docs</span>
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
                href="/about"
              >
                <span className="relative">About</span>
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
              <Link
                className="text-base font-medium md:hidden h-full items-center relative px-3 py-4 mdlg:p-4 opacity-70 hover:opacity-100"
                href="/about"
              >
                <span className="relative">About</span>
              </Link>
              <button className="my-1 p-2 rounded hover:bg-border dark:hover:bg-border-dark ">
                <svg
                  className="LemonIcon opacity-50 inline-block w-6 group-hover/parent:opacity-75"
                  width="100%"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 3.5a8.5 8.5 0 0 0-6.223 14.29C7.247 16.074 9.417 15 12 15c2.583 0 4.752 1.074 6.223 2.79A8.5 8.5 0 0 0 12 3.5Zm5.108 15.294C15.917 17.388 14.151 16.5 12 16.5c-2.15 0-3.917.888-5.109 2.294A8.46 8.46 0 0 0 12 20.5a8.46 8.46 0 0 0 5.108-1.706ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 2.974-1.3 5.646-3.359 7.476A9.965 9.965 0 0 1 12 22a9.965 9.965 0 0 1-6.641-2.524A9.977 9.977 0 0 1 2 12Zm10-4.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM8 10a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"
                  ></path>
                </svg>
              </button>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
