"use client";
import React, { useEffect } from "react";

const Form: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://tally.so/widgets/embed.js";
    document.head.appendChild(script);
  }, []);

  return (
    <div className=" flex flex-col items-center gap-5 md:mx-[calc(20%)] p-5 md:p-10">
     <p className=" text-5xl">Clack feedback form</p>
      <iframe
        data-tally-src="https://tally.so/embed/wb7ld1?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
        loading="lazy"
        width="100%"
        height={427}
        title="Rate your City"
      />
    </div>
  );
};

export default Form;
