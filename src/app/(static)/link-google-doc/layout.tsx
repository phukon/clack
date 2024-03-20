import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Link Google Doc",
  description: "Link Google Doc with Clack",
  openGraph: {
    images: [
      {
        url: "https://clack.rkph.me/api/og?title=Link%20a%20Google%20Doc",
        alt: "clack.rkph.me",
      },
    ],
  },
};

const Glayout = async ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default Glayout;
