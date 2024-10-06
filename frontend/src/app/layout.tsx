import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai } from "next/font/google";
import { NavBar } from "../components/NavBar";
import { Toaster } from "../components/ui/toaster";
import "./globals.css";
import Providers from "./providers";

const IBMPlex = IBM_Plex_Sans_Thai({
  weight: ["100", "300", "400", "600", "700"],
  subsets: ["thai"],
});

export const metadata: Metadata = {
  title: "ourcourseville",
  description: "Seizing the means of learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${IBMPlex.className} max-w-screen bg-default flex min-h-screen flex-col`}
      >
        <Providers>
          <NavBar />
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
