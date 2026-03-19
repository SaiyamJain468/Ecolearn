import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "NEBULA.IO | Design the Future",
  description: "Next-generation digital infrastructure for the decentralized web.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased dark`}
      style={{ backgroundColor: '#0a0a0a' }}
    >
      <body className="min-h-full flex flex-col bg-dark-bg text-white font-sans">
        {children}
      </body>
    </html>
  );
}
