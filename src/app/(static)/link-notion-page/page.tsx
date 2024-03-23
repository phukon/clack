"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Disclosure } from "@headlessui/react";
import { RiNotionFill } from "react-icons/ri";
import {
  Plus as PlusSmallIcon,
  Minus as MinusSmallIcon,
  RefreshCw as ArrowPathIcon,
  GitPullRequestArrow as CloudArrowUpIcon,
  Settings as Cog6ToothIcon,
  Fingerprint as FingerPrintIcon,
  Lock as LockClosedIcon,
  HardDrive as ServerIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const faqs = [
  {
    question: "What is Clack?",
    answer:
      "Clack is a dynamic,  writing activity tracker alternative to Quillcap that integrates with Google Docs and Notion, has an AI writing assistant and a built-in rich text editor.",
  },
  {
    question: "How can I use Clack?",
    answer: "You can subscribe to one of our plans or use it for free.",
  },
  {
    question: "Is Clack free?",
    answer: "Yes, Clack has a generous free tier that also includes the AI writing assistant.",
  },
];

export default function Home() {
  return (
    <div>
      <Header />

      <main>
        {/* Hero section */}
        <div className="relative isolate overflow-hidden bg-white dark:bg-black pb-16 pt-14 sm:pb-20">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#00FFD0] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-12 sm:py-12 lg:py-32 ">
              <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                <div className="relative rounded-full px-3 py-1 text-sm leading-6 flex flex-row text-black dark:text-white ring-1 ring-black/10 dark:ring-white/10 hover:ring-white/20">
                  Clack for Notion <RiNotionFill className=" ml-1 mt-1" />
                </div>
              </div>
              <div className="text-center">
                <h1 className=" tracking-tight text-black dark:text-white sm:text-6xl text-6xl md:text-[80px] font-normal --local-ebgaramond">
                  Link a Notion Page
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-500">
                  Connect the Clack integration Notion and add the page link in{" "}
                  <span className=" --local-comfortaa">Clack</span> dashboard.
                </p>
                {/* <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link
                    className="rounded-md bg-black dark:bg-white px-3.5 py-2.5 text-sm font-semibold text-white dark:text-black shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                    href="/dash"
                  >
                    Link now
                  </Link>
                </div> */}
              </div>
              <div className=" text-left mt-10 pt-14">
                <h3 className=" text-3xl font-bold --local-ebgaramond">
                  1. Go to the settings page
                </h3>
                <div className="relative max-w-[900px] overflow-hidden pt-16">
                  <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <img
                      src="https://d1g2o751bxy91o.cloudfront.net/n0.png"
                      alt="App screenshot"
                      className=" rounded-xl shadow-2xl ring-1 ring-gray-900/10"
                      width={2432}
                      height={1442}
                    />
                  </div>
                  <p className=" mt-10 text-center leading-8 text-gray-500 font-medium">
                    In the settings page you&apos;ll find three tabs namely General, Edit, and
                    Integrations
                  </p>
                </div>
                <h3 className=" mt-10 pt-14 text-3xl font-bold --local-ebgaramond">
                  2. Go to the Integrations tab
                </h3>
                <div className="relative max-w-[900px] overflow-hidden pt-16">
                  <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <img
                      src="https://d1g2o751bxy91o.cloudfront.net/n1.png"
                      alt="App screenshot"
                      className=" rounded-xl shadow-2xl ring-1 ring-gray-900/10"
                      width={2432}
                      height={1442}
                    />
                    {/* <div className="relative" aria-hidden="true">
                      <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-black pt-[7%]" />
                    </div> */}
                  </div>
                  <p className=" mt-10 text-center leading-8 text-gray-500 font-medium">
                    Click on the &apos;Integrations&apos; tab. Then click on the connect button.
                  </p>
                </div>
                <h3 className=" mt-10 pt-14 text-3xl font-bold --local-ebgaramond">
                  3. Give the necessary permissions and page access.
                </h3>
                <div className="relative max-w-[900px] overflow-hidden pt-16">
                  <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <img
                      src="https://d1g2o751bxy91o.cloudfront.net/n2.png"
                      alt="App screenshot"
                      className=" rounded-xl shadow-2xl ring-1 ring-gray-900/10"
                      width={2432}
                      height={1442}
                    />
                    {/* <div className="relative" aria-hidden="true">
                      <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-black pt-[7%]" />
                    </div> */}
                  </div>
                  <p className=" mt-10 text-center leading-8 text-gray-500 font-medium">
                    A prompt apperas from Notion, it describes the integration&apos;s capabilities.
                  </p>
                </div>

                <div className="relative max-w-[900px] overflow-hidden pt-16">
                  <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className=" mx-auto w-full max-w-5xl">
                      <video
                        width="100%"
                        id="video1"
                        style={{ borderRadius: "6px" }}
                        aria-hidden="true"
                        playsInline
                        autoPlay
                        muted
                        loop
                      >
                        <source src="https://d1g2o751bxy91o.cloudfront.net/vlong.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </div>
                  <p className=" mt-10 text-center leading-8 text-gray-500 font-medium">
                   Clack can now help you track your writing habits effortlessly!
                  </p>
                </div>

                <div className="relative max-w-[900px] overflow-hidden pt-16">

                <h3 className=" mt-10 pt-14 text-3xl font-bold --local-ebgaramond">
                 Happy writing!
                </h3>
                  <div className="mx-auto max-w-7xl pt-14 px-6 lg:px-8">
                    <div className=" mx-auto w-full max-w-5xl">
                      <video
                        width="100%"
                        id="video1"
                        style={{ borderRadius: "6px" }}
                        aria-hidden="true"
                        playsInline
                        autoPlay
                        muted
                        loop
                      >
                        <source src="https://d1g2o751bxy91o.cloudfront.net/add-doc.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </div>
                  <p className=" mt-10 text-center leading-8 text-gray-500 font-medium">
                Great! You can now paste the link of your Notion document in your dashboard.
                  </p>
                </div>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link
                    className="rounded-md bg-black dark:bg-white px-3.5 py-2.5 text-sm font-semibold text-white dark:text-black shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                    href="/dash"
                  >
                    Link now
                  </Link>
                </div>
              </div>
            </div>

            {/* <div className=" mx-auto w-full max-w-5xl">
              <video
                width="100%"
                id="video1"
                style={{ borderRadius: "6px" }}
                aria-hidden="true"
                playsInline
                autoPlay
                muted
                loop
              >
                <source
                  src="https://dknlay9ljaq1f.cloudfront.net/Clack-notion-video.mp4"
                  type="video/mp4"
                />
              </video>
            </div> */}

            {/* FAQ section */}
            <div className="mx-auto mt-24 max-w-7xl px-6 sm:mt-32 lg:px-8">
              <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
                <h2 className="text-2xl font-bold leading-10 tracking-tight text-white">
                  Frequently asked questions
                </h2>
                <dl className="mt-10 space-y-6 divide-y divide-gray-900/10 dark:divide-gray-200/10">
                  {faqs.map((faq) => (
                    <Disclosure as="div" key={faq.question} className="pt-6">
                      {({ open }) => (
                        <>
                          <dt>
                            <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900 dark:text-gray-200">
                              <span className="text-base font-semibold leading-7">
                                {faq.question}
                              </span>
                              <span className="ml-6 flex h-7 items-center">
                                {open ? (
                                  <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                                ) : (
                                  <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                                )}
                              </span>
                            </Disclosure.Button>
                          </dt>
                          <Disclosure.Panel as="dd" className="mt-2 pr-12">
                            <p className="text-base leading-7 text-gray-500">{faq.answer}</p>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </main>
    </div>
  );
}
