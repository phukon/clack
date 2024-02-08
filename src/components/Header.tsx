import Image from 'next/image';
import React from 'react';

const Header: React.FC = (): JSX.Element => {
  return (
    <header className="relative z-[999999] md:sticky md:top-0 bg-white">
      <div className="border-b border-light dark:border-dark bg-accent dark:bg-accent-dark mb-1">
        <div className="flex mx-auto px-2 md:px-0 mdlg:px-5 justify-between transition-all max-w-screen-3xl box-content">
          <div className="flex-1 flex">
            <a
              aria-current="page"
              className="py-4 grow-0 shrink-0 basis-[auto] dark:text-primary-dark relative"
              href="/"
            >
              <span
                className="bg-white absolute w-full h-[calc(100%+1px)] left-0 inset-0
                before:absolute before:border-r before:top-0 before:h-full before:border-light dark:before:border-dark before:w-[10px] before:left-0 before:bg-accent dark:before:bg-accent-dark before:z-10
                after:absolute after:border-l after:top-0 after:h-full after:border-light dark:after:border-dark after:w-[10px] after:right-0 after:bg-accent dark:after:bg-accent-dark before:rounded-br-lg after:rounded-bl-lg before:border-b after:border-b"
              >
                <span className="absolute bottom-0 left-0 border-b border-bg-light dark:border-bg-dark w-full"></span>
              </span>
            </a>
            <div className="max-w-[60px] max-h-[60px] flex flex-row align-middle">
              <Image src="/logo.png" height={740} width={740} alt="=logo" priority />
            </div>
            <a
              className="text-[13.5px] font-bold flex h-full items-center relative px-3 py-4 mdlg:p-4 opacity-70 hover:opacity-100"
              href="/product-analytics"
            >
              <span className="relative">Tangerine</span>
            </a>
          </div>
          <ul className="md:flex hidden list-none m-0 p-0">
            <li className="h-full">
              <a
                className="text-[13.5px] font-medium flex h-full items-center relative px-3 py-4 mdlg:p-4 opacity-70 hover:opacity-100"
                href="/product-analytics"
              >
                <span className="relative">Products</span>
              </a>
            </li>
            <li className="h-full">
              <a
                className="text-[13.5px] font-medium flex h-full items-center relative px-3 py-4 mdlg:p-4 opacity-70 hover:opacity-100"
                href="/pricing"
              >
                <span className="relative">Pricing</span>
              </a>
            </li>
            <li className="h-full">
              <a
                className="text-[13.5px] font-medium flex h-full items-center relative px-3 py-4 mdlg:p-4 opacity-70 hover:opacity-100"
                href="/docs"
              >
                <span className="relative">Docs</span>
              </a>
            </li>
            <li className="h-full">
              <a
                rel="noopener noreferrer"
                href="https://posthog.com/posts"
                className="text-[13.5px] font-medium flex h-full items-center relative px-3 py-4 mdlg:p-4 opacity-70 hover:opacity-100 group"
                target=""
              >
                <span className="relative">Community</span>
              </a>
            </li>
            <li className="h-full">
              <a
                className="text-[13.5px] font-medium flex h-full items-center relative px-3 py-4 mdlg:p-4 opacity-70 hover:opacity-100"
                href="/about"
              >
                <span className="relative">Company</span>
              </a>
            </li>
          </ul>
          <div className="flex items-center justify-end flex-1">
            <a
              rel="noopener noreferrer"
              href="https://app.posthog.com/signup"
              className="bg-yellow-500 border-[1.5px] relative top-[1px] rounded-[6px] w-auto text-primary border-button text-center group disabled:opacity-50 disabled:cursor-not-allowed hidden sm:flex mr-2 group"
              target=""
            >
              <span className="relative text-center w-auto border-yellow bg-white text-primary hover:text-primary dark:bg-dark dark:text-primary-dark dark:hover:text-primary-dark rounded-[6px] text-[13px] font-bold px-3.5 py-1.5 translate-y-[-2px] hover:translate-y-[-3px] active:translate-y-[-1px] border-[1.5px] mx-[-1.5px] group-disabled:hover:!translate-y-[-2px] block active:transition-all active:duration-100 select-none ">
                Get started
              </span>
            </a>
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
            <span className="group/parent relative text-primary dark:text-primary-dark">
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
