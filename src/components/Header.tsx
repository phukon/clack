import Image from 'next/image';
import React from 'react';

const Header: React.FC = (): JSX.Element => {
  return (
    <header className="relative z-[999999] md:sticky md:top-0 bg-gradient-to-b from-primary-dark/100 via-primary-dark/100 to-primary-dark/50 dark:from-dark/100 dark:via-dark/100 dark:to-dark/50 backdrop-blur">
      <div className="border-b border-light dark:border-dark bg-accent dark:bg-accent-dark mb-1">
        <div className="flex mx-auto px-2 md:px-0 mdlg:px-5 justify-between transition-all max-w-screen-3xl box-content">
          <div className="flex-1 flex">
            <a
              aria-current="page"
              className="py-4 grow-0 shrink-0 basis-[auto] dark:text-primary-dark relative"
              href="/"
            >
              <span
                className="bg-light dark:bg-dark absolute w-full h-[calc(100%+1px)] left-0 inset-0
                before:absolute before:border-r before:top-0 before:h-full before:border-light dark:before:border-dark before:w-[10px] before:left-0 before:bg-accent dark:before:bg-accent-dark before:z-10
                after:absolute after:border-l after:top-0 after:h-full after:border-light dark:after:border-dark after:w-[10px] after:right-0 after:bg-accent dark:after:bg-accent-dark before:rounded-br-lg after:rounded-bl-lg before:border-b after:border-b"
              >
                <span className="absolute bottom-0 left-0 border-b border-bg-light dark:border-bg-dark w-full"></span>
              </span>
              {/* <svg
                className="h-[24px] fill-current relative px-2 box-content"
                width="157"
                height="30"
                viewBox="0 0 157 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.8914 17.2058C10.5229 17.9429 9.47109 17.9429 9.10256 17.2058L8.2212 15.4431C8.08043 15.1616 8.08043 14.8302 8.2212 14.5487L9.10256 12.7859C9.47109 12.0489 10.5229 12.0489 10.8914 12.7859L11.7728 14.5487C11.9135 14.8302 11.9135 15.1616 11.7728 15.4431L10.8914 17.2058Z"
                  fill="#1D4AFF"
                ></path>
                <path
                  d="M10.8914 27.2026C10.5229 27.9397 9.47109 27.9397 9.10256 27.2026L8.2212 25.4399C8.08043 25.1584 8.08043 24.827 8.2212 24.5455L9.10256 22.7828C9.47109 22.0457 10.5229 22.0457 10.8914 22.7828L11.7728 24.5455C11.9135 24.827 11.9135 25.1584 11.7728 25.4399L10.8914 27.2026Z"
                  fill="#1D4AFF"
                ></path>
                <path
                  d="M0 23.4082C0 22.5173 1.07714 22.0711 1.70711 22.7011L6.29049 27.2845C6.92046 27.9145 6.47429 28.9916 5.58339 28.9916H0.999999C0.447715 28.9916 0 28.5439 0 27.9916V23.4082ZM0 18.5804C0 18.8456 0.105357 19.1 0.292893 19.2875L9.70411 28.6987C9.89164 28.8862 10.146 28.9916 10.4112 28.9916H15.5804C16.4713 28.9916 16.9175 27.9145 16.2875 27.2845L1.70711 12.7041C1.07714 12.0741 0 12.5203 0 13.4112V18.5804ZM0 8.58339C0 8.8486 0.105357 9.10296 0.292893 9.29049L19.7011 28.6987C19.8886 28.8862 20.143 28.9916 20.4082 28.9916H25.5774C26.4683 28.9916 26.9145 27.9145 26.2845 27.2845L1.70711 2.70711C1.07715 2.07715 0 2.52331 0 3.41421V8.58339ZM9.997 8.58339C9.997 8.8486 10.1024 9.10296 10.2899 9.29049L28.2839 27.2845C28.9139 27.9145 29.991 27.4683 29.991 26.5774V21.4082C29.991 21.143 29.8856 20.8886 29.6981 20.7011L11.7041 2.7071C11.0741 2.07714 9.997 2.52331 9.997 3.41421V8.58339ZM21.7011 2.70711C21.0711 2.07714 19.994 2.52331 19.994 3.41421V8.58339C19.994 8.8486 20.0994 9.10296 20.2869 9.29049L28.2839 17.2875C28.9139 17.9175 29.991 17.4713 29.991 16.5804V11.4112C29.991 11.146 29.8856 10.8916 29.6981 10.7041L21.7011 2.70711Z"
                  fill="#F9BD2B"
                ></path>
                <path
                  className="fill-primary dark:fill-white"
                  d="M42.5248 23.5308L33.1121 14.118C32.4821 13.488 31.405 13.9342 31.405 14.8251V27.9915C31.405 28.5438 31.8527 28.9915 32.405 28.9915H46.9856C47.5379 28.9915 47.9856 28.5438 47.9856 27.9915V26.7925C47.9856 26.2402 47.536 25.7992 46.9883 25.7279C45.3076 25.509 43.7355 24.7414 42.5248 23.5308ZM36.2035 25.7925C35.3206 25.7925 34.604 25.0759 34.604 24.193C34.604 23.31 35.3206 22.5934 36.2035 22.5934C37.0865 22.5934 37.8031 23.31 37.8031 24.193C37.8031 25.0759 37.0865 25.7925 36.2035 25.7925Z"
                  fill="black"
                ></path>
                <path
                  d="M0 27.9915C0 28.5438 0.447715 28.9915 1 28.9915H5.58339C6.47429 28.9915 6.92046 27.9144 6.2905 27.2844L1.70711 22.701C1.07714 22.071 0 22.5172 0 23.4081V27.9915Z"
                  fill="#1D4AFF"
                ></path>
                <path
                  d="M9.997 10.997L1.70711 2.70711C1.07714 2.07714 0 2.52331 0 3.41421V8.58339C0 8.8486 0.105357 9.10296 0.292893 9.29049L9.997 18.9946V10.997Z"
                  fill="#1D4AFF"
                ></path>
                <path
                  d="M1.70711 12.7042C1.07714 12.0742 0 12.5204 0 13.4113V18.5805C0 18.8457 0.105357 19.1 0.292893 19.2876L9.997 28.9917V20.9941L1.70711 12.7042Z"
                  fill="#1D4AFF"
                ></path>
                <path
                  d="M19.994 11.4112C19.994 11.146 19.8887 10.8916 19.7011 10.7041L11.7041 2.70711C11.0742 2.07714 9.99701 2.52331 9.99701 3.41421V8.58339C9.99701 8.8486 10.1024 9.10296 10.2899 9.29049L19.994 18.9946V11.4112Z"
                  fill="#F54E00"
                ></path>
                <path
                  d="M9.99701 28.9915H15.5804C16.4713 28.9915 16.9175 27.9144 16.2875 27.2844L9.99701 20.9939V28.9915Z"
                  fill="#F54E00"
                ></path>
                <path
                  d="M9.99701 10.9971V18.5805C9.99701 18.8457 10.1024 19.1 10.2899 19.2876L19.994 28.9917V21.4083C19.994 21.1431 19.8887 20.8887 19.7011 20.7012L9.99701 10.9971Z"
                  fill="#F54E00"
                ></path>
                <path
                  className="fill-primary dark:fill-white"
                  d="M59.6496 25H63.7576V18.188H67.1896C70.9596 18.188 73.3776 15.9521 73.3776 12.494C73.3776 9.03605 70.9596 6.80005 67.1896 6.80005H59.6496V25ZM63.7576 14.678V10.3101H66.7736C68.3336 10.3101 69.2696 11.142 69.2696 12.494C69.2696 13.8461 68.3336 14.678 66.7736 14.678H63.7576Z"
                  fill="black"
                ></path>
                <path
                  className="fill-primary dark:fill-white"
                  d="M80.8095 25.208C84.8135 25.208 87.7255 22.348 87.7255 18.448C87.7255 14.548 84.8135 11.688 80.8095 11.688C76.7535 11.688 73.8935 14.548 73.8935 18.448C73.8935 22.348 76.7535 25.208 80.8095 25.208ZM77.6895 18.448C77.6895 16.368 78.9375 14.938 80.8095 14.938C82.6555 14.938 83.9035 16.368 83.9035 18.448C83.9035 20.528 82.6555 21.958 80.8095 21.958C78.9375 21.958 77.6895 20.528 77.6895 18.448Z"
                  fill="black"
                ></path>
                <path
                  className="fill-primary dark:fill-white"
                  d="M94.2995 25.208C97.3675 25.208 99.4475 23.284 99.4475 21.022C99.4475 15.718 92.4015 17.434 92.4015 15.354C92.4015 14.7821 92.9995 14.4181 93.8575 14.4181C94.7415 14.4181 95.8075 14.964 96.1455 16.16L99.2135 14.886C98.6155 12.988 96.4055 11.688 93.7275 11.688C90.8415 11.688 89.0475 13.404 89.0475 15.458C89.0475 20.424 95.9895 19.046 95.9895 21.1C95.9895 21.828 95.3135 22.3221 94.2995 22.3221C92.8435 22.3221 91.8295 21.3081 91.5175 20.0861L88.4495 21.282C89.1255 23.258 91.1015 25.208 94.2995 25.208Z"
                  fill="black"
                ></path>
                <path
                  className="fill-primary dark:fill-white"
                  d="M109.33 24.8701L109.07 21.5681C108.628 21.8021 108.056 21.88 107.588 21.88C106.652 21.88 106.028 21.2041 106.028 20.034V15.068H109.2V11.896H106.028V8.10005H102.206V11.896H100.126V15.068H102.206V20.528C102.206 23.7001 104.364 25.208 107.198 25.208C107.978 25.208 108.706 25.0781 109.33 24.8701Z"
                  fill="black"
                ></path>
                <path
                  className="fill-primary dark:fill-white"
                  d="M122.656 6.80005V13.872H115.428V6.80005H111.32V25H115.428V17.382H122.656V25H126.79V6.80005H122.656Z"
                  fill="black"
                ></path>
                <path
                  className="fill-primary dark:fill-white"
                  d="M135.908 25.208C139.912 25.208 142.824 22.348 142.824 18.448C142.824 14.548 139.912 11.688 135.908 11.688C131.852 11.688 128.992 14.548 128.992 18.448C128.992 22.348 131.852 25.208 135.908 25.208ZM132.788 18.448C132.788 16.368 134.036 14.938 135.908 14.938C137.754 14.938 139.002 16.368 139.002 18.448C139.002 20.528 137.754 21.958 135.908 21.958C134.036 21.958 132.788 20.528 132.788 18.448Z"
                  fill="black"
                ></path>
                <path
                  className="fill-primary dark:fill-white"
                  d="M150.201 24.584C151.631 24.584 152.905 24.09 153.581 23.232V24.48C153.581 25.936 152.411 26.9501 150.617 26.9501C149.343 26.9501 148.225 26.326 148.043 25.26L144.559 25.806C145.027 28.276 147.549 29.9401 150.617 29.9401C154.647 29.9401 157.325 27.574 157.325 24.064V11.896H153.555V13.014C152.853 12.208 151.657 11.688 150.123 11.688C146.483 11.688 144.195 14.184 144.195 18.136C144.195 22.088 146.483 24.584 150.201 24.584ZM147.913 18.136C147.913 16.186 149.057 14.938 150.825 14.938C152.619 14.938 153.763 16.186 153.763 18.136C153.763 20.086 152.619 21.334 150.825 21.334C149.057 21.334 147.913 20.086 147.913 18.136Z"
                  fill="black"
                ></path>
              </svg> */}
            </a>
            <div className="max-w-[80px] max-h-[60px] flex flex-row align-middle">
              <Image src="/logo.png" height={740} width={740} alt="=logo" />
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
              className="bg-yellow/50 border-dark/30 dark:bg-white/10 dark:border-white/20 border-[1.5px] relative top-[1px] rounded-[6px] w-auto text-primary border-button text-center group disabled:opacity-50 disabled:cursor-not-allowed hidden sm:flex mr-2 group"
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
                    fill-rule="evenodd"
                    clip-rule="evenodd"
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
