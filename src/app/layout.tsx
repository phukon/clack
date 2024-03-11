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

export const metadata: Metadata = {
  title: "Clack",
  description: "Track your writing progress effortlessly",
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
          <body className={`${inter.className} ${localComfortaa.variable} ${localEbgaramond.variable}`}>
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
        </html>
      </NotesProvider>
    </SessionProvider>
  );
}
