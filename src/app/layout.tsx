import type { Metadata } from "next";
import { Inter } from "next/font/google";
// @ts-ignore: Missing type declarations for CSS side-effect import
import './globals-clean.css';
import Header from "../components/Header";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SIA The Wood and Good - Premium Oak Furniture | Handcrafted in Latvia",
  description: "Discover premium handcrafted solid oak furniture from SIA The Wood and Good. Sustainably sourced, expertly crafted tables, chairs and furniture for your home. Made in Latvia with traditional techniques.",
  keywords: "oak furniture, solid wood furniture, handcrafted furniture, premium furniture, sustainable furniture, Latvia furniture, wooden tables, oak tables, custom furniture, SIA The Wood and Good",
  authors: [{ name: "SIA The Wood and Good" }],
  creator: "SIA The Wood and Good",
  publisher: "SIA The Wood and Good",
  robots: "noindex, nofollow", // Prevent indexing until launch
  openGraph: {
    title: "The Wood and Good - Premium Oak Furniture",
    description: "Discover premium handcrafted solid oak furniture from SIA The Wood and Good. Sustainably sourced, expertly crafted for your home.",
    type: "website",
    locale: "en_US",
    siteName: "SIA The Wood and Good",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SIA The Wood and Good - Premium Oak Furniture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SIA The Wood and Good - Premium Oak Furniture",
    description: "Handcrafted solid oak furniture, sustainably sourced and expertly crafted in Latvia.",
    images: ["/images/og-image.jpg"],
  },
  viewport: "width=device-width, initial-scale=1",
  alternates: {
    canonical: "https://woodandgood.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#d4823a" />
      </head>
      <body className={`${inter.className} bg-wood-light text-textPrimary antialiased`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
