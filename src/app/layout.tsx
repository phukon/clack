import "./globals.css";
import type { Metadata } from "next";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import { localEbgaramond, localComfortaa } from "@/fonts/fonts";
import { Toaster } from "@/components/ui/toaster";
import { NotesProvider } from "@/context/NotesContext";
import Script from "next/script";
const inter = Inter({ subsets: ["latin"] });
import { CSPostHogProvider } from "@/context/CSPostHogProvider";

export const metadata: Metadata = {
  title: "Clack",
  description: "Track your writing progress effortlessly",
  metadataBase: new URL('https://clack.rkph.me'),
  openGraph: {
    images: [
      {
        url: "https://clack.rkph.me/api/og?title=Sync,%20Think,%20and%20Shine&image=/og.png",
        alt: "clack.rkph.me"
      },
    ]
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <NotesProvider>
        <html lang="en">
          <CSPostHogProvider>
            <body className={`${inter.className} ${localComfortaa.variable} ${localEbgaramond.variable} scrollbar-hide`}>
              {process.env.NODE_ENV === "production" && (
                <Script
                  async
                  src="https://analytics.rkph.me/script.js"
                  data-website-id="33d1a924-b267-439a-a436-c87b06326707"
                />
              )}
              <Toaster />
              {children}
            </body>
          </CSPostHogProvider>
        </html>
      </NotesProvider>
    </SessionProvider>
  );
}
