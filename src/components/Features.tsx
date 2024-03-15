import React from "react";
import Card1 from "./Card1";

const Features = () => {
  return (
    <>
      <div className="flex flex-col items-center text-center">
        <div className="framer-4tink3">
          <div className="framer-mcbbpq">
            <div className="framer-1y2wu24-container">
              <div className="framer-BK4if framer-QFwI9 framer-v-rnu724" style={{ display: "contents" }}>
                <div
                  className="framer-1v2bg1q"
                  data-framer-name="dark bg"
                  style={{ height: "100%", opacity: 1, borderRadius: "44px" }}
                >
                  <div
                    className="framer-5agojo"
                    style={{
                      outline: "none",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      flexShrink: 0,
                      transform: "none",
                      opacity: 1,
                    }}
                    data-framer-component-type="RichTextContainer"
                  >
                    <div className="text-xs md:text-sm text-[#1722BE] font-semibold">POWERFUL FEATURES</div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="framer-12svkuv"
              style={{
                outline: "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                flexShrink: 0,
                transform: "none",
              }}
              data-framer-component-type="RichTextContainer"
            >
              <h2 className="--local-ebgaramond text-[40px] md:text-[54px]">Write, cite, and edit</h2>
            </div>
          </div>
          <div
            className="framer-wppnfz"
            style={{
              outline: "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              flexShrink: 0,
              transform: "none",
            }}
            data-framer-component-type="RichTextContainer"
          >
            <p className=" text-lg md:text-[22px] text-[#52525B]">
              Features built to enhance your research and writing capabilities
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center text-center mt-20 lg:grid lg:grid-cols-2 gap-4 lg:mx-64">
        {" "}
        {/* Adjusted gap-4 */}
        <Card1 />
        <Card1 />
        <Card1 />
        <Card1 />
      </div>
    </>
  );
};

export default Features;
