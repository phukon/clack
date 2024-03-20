import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Link a Notion page",
  description: "Link Notion page with Clack",
  openGraph: {
    images: [
      {
        url: "https://clack.rkph.me/api/og?title=Link%20a%20Notion%20Page",
        alt: "clack.rkph.me",
      },
    ],
  },
};

const Nlayout = async ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default Nlayout;
