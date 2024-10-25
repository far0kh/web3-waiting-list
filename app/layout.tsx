import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "NFTs for Real-World Arts",
    template: `%s | Tezuka`,
  },
  metadataBase: new URL("https://www.tezuka.xyz/"),
  description: "Tokenize Art into Asset-backed NFTs to Realize their Latent Liquidity",
  keywords: [
    "Tezuka",
    "Art",
    "Artwork",
    "Blockchain",
    "Bitcoin",
    "Ethereum",
    "NFTs",
    "NFT",
    "RWA"
  ],
  // authors: [
  //   {
  //     name: "Farokh Madah",
  //     url: "https://t.me/FAR0KH",
  //   },
  // ],
  // creator: "Farokh Madah",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://www.tezuka.xyz/",
    title: "NFTs for Real-World Arts",
    description: "Tokenize Art into Asset-backed NFTs to Realize their Latent Liquidity",
    siteName: "Tezuka",
    images: [
      {
        url: `/og.jpg`,
        width: 1200,
        height: 630,
        alt: "Tezuka",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tezuka",
    description: "NFTs for Real-World Arts",
    images: [`/og.png`],
    creator: "@tezuka_xyz",
  },
  icons: {
    icon: "/favicon.ico",
    // shortcut: "/favicon-16x16.png",
    shortcut: "/logo.webp",
    apple: "/apple-touch-icon.png",
  },
  manifest: `/site.webmanifest`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
