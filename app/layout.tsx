import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maya-burger.vercel.app"),

  title: "Maya Burger",

  description: "Offers Best, fast and fresh Foods!",

  openGraph: {
    title: "Maya Burger",
    description: "Offers Best, fast and fresh Foods!",
    url: "https://maya-burger.vercel.app",
    siteName: "Maya Burger",
    type: "website",

    images: [
      {
        url: "/images/maya-og.png",
        width: 1200,
        height: 630,
        alt: "Maya Burger - Best Food Fast and Fresh",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Maya Burger",
    description: "Offers Best, fast and fresh Foods!",
    images: ["/images/maya-og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#000000]">
        {children}
      </body>
    </html>
  );
}