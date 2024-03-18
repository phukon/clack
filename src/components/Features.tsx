// import Card1 from "./Card1";
import Image from "next/image";

const featureList = [
  {
    isVideo: true,
    blobUrl: "https://d1g2o751bxy91o.cloudfront.net/ai-autocomp.mp4",
    name: "AI Autocomplete",
    desc: "Autocomplete will write alongside you to beat writer&apos;s block whenever you need a helping hand",
  },
  { isVideo: false, blobUrl: "/showcase/cat.png", name: "FX2", desc: "desc2 desc2 desc2 desc2 desc2 desc2 " },
  { isVideo: false, blobUrl: "/showcase/plant.png", name: "desc2 ", desc: "desc2 desc2 desc2 desc2 desc2 desc2 " },
  { isVideo: false, blobUrl: "/showcase/plant.png", name: "desc2 ", desc: "desc2 desc2 desc2 desc2 desc2 desc2 " },
];

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
              Features built to enhance your writing capabilities
            </p>
          </div>
        </div>
      </div>
      <div className="relative overflow-hidden pt-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  <img
                    src="/showcase/cat.png"
                    alt="App screenshot"
                    className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10"
                    width={2432}
                    height={1442}
                  />
                  <div className="relative" aria-hidden="true">
                    <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-black pt-[7%]" />
                  </div>
                </div>
                </div>
      <div className="mx-auto mt-5 grid max-w-lg grid-cols-1 gap-x-6 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
        {featureList.map((f, i) => (
          <div key={i} className="mx-auto max-w-7xl px-6 mt-16 lg:px-8">
            {f.isVideo ? (
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
                <source src={f.blobUrl} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={f.blobUrl}
                alt="App screenshot"
                className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10"
                width={2432}
                height={1442}
              />
            )}
            <div className="relative" aria-hidden="true">
              <div className="flex flex-col items-start mt-5 md:mt-8 max-w-96 max-h-60 px-5 md:max-w-[728px] md:max-h-[440px] lg:max-w-[500px] lg:max-h-[302px] text-left">
                <div
                  style={{
                    outline: "none",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    flexShrink: 0,
                    transform: "none",
                    marginTop: "40px",
                  }}
                >
                  <h3 className="--local-ebgaramond text-[26px] md:text-[26px] text-[#27272A]">{f.name}</h3>
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
                  <p className="text-[#71717A] md:text-[16px] text-base leading-[1.4em]">{f.desc}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="flex flex-col items-center text-center mt-20 lg:grid lg:grid-cols-2 gap-4 lg:mx-64">
        <Card1 />
        <Card1 />
        <Card1 />
        <Card1 />
      </div> */}
    </>
  );
};

export default Features;
