import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { NavBar } from "../components/NavBar";
import "./globals.css";

const IBMPlex = IBM_Plex_Sans({
  weight: ["100", "300", "400", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
        <NavBar />
        {children}
      </body>
    </html>
  );
}
