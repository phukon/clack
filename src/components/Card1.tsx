import Image from "next/image";
import React from "react";

const Card1: React.FC = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center align-middle mb-8">
      {" "}
      {/* Reduced mb-8 from mb-16 */}
      <div className="relative h-full">
        <div className=" ">
          <Image
            alt="yo"
            height={1100}
            width={1100}
            src="/showcase/a.jpg"
            objectFit="cover"
            className="max-w-96 max-h-60 md:max-w-[728px] md:max-h-[440px] lg:max-w-[500px] lg:max-h-[302px] px-4"
          />
        </div>
      </div>
      <div className="flex flex-col items-start mt-4 max-w-96 max-h-60 px-5 md:max-w-[728px] md:max-h-[440px] lg:max-w-[500px] lg:max-h-[302px] text-left">
        <div
          style={{
            outline: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            flexShrink: 0,
            transform: "none",
          }}
        >
          <h3 className="--local-ebgaramond text-[26px] md:text-[26px] text-[#27272A]">AI Autocomplete</h3>
        </div>
        <div
          style={{
            outline: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            flexShrink: 0,
            transform: "none",
          }}
        >
          <p className="text-[#71717A] md:text-[16px] text-base leading-[1.4em]">
            Autocomplete will write alongside you to beat writer&apos;s block whenever you need a helping hand
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card1;
