"use client";

import { notFound } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";
import NovelEditor from "./[id]/novelEditor";
import Link from "next/link";

function Page({ searchParams }: { searchParams: { id: string } }) {
  if (!searchParams.id) {
    notFound();
  }

  return (
    <div className=" flex flex-col justify-center">
      <Link className="pt-5 flex flex-row px-5 text-gray-500 hover:underline" href="/dash">
        <IoChevronBack className=" w-6 h-6" />
        ... Dash
      </Link>
      <div className="mb-12 flex min-h-[100svh] flex-col items-center sm:px-5 sm:pt-[calc(20vh)] md:mb-0">
        <NovelEditor id={searchParams.id} />
      </div>
    </div>
  );
}

export default Page;
