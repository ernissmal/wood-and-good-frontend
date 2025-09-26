import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wood & Good - Premium Oak Furniture",
  description: "Handcrafted solid oak wood furniture for your home. Premium quality, sustainable materials, timeless design.",
  keywords: "oak furniture, solid wood furniture, handcrafted furniture, premium furniture, sustainable furniture",
  authors: [{ name: "Wood & Good" }],
  creator: "Wood & Good",
  publisher: "Wood & Good",
  openGraph: {
    title: "Wood & Good - Premium Oak Furniture",
    description: "Handcrafted solid oak wood furniture for your home. Premium quality, sustainable materials, timeless design.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-wood-light text-gray-900`}>
        <header className="bg-white shadow-sm border-b border-oak-200">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-oak-700">Wood and Good</h1>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  <a href="/" className="text-oak-600 hover:text-oak-800 px-3 py-2 text-sm font-medium">Home</a>
                  <a href="/products" className="text-oak-600 hover:text-oak-800 px-3 py-2 text-sm font-medium">Products</a>
                  <a href="/blog" className="text-oak-600 hover:text-oak-800 px-3 py-2 text-sm font-medium">Blog</a>
                  <a href="/about" className="text-oak-600 hover:text-oak-800 px-3 py-2 text-sm font-medium">About</a>
                  <a href="/contact" className="text-oak-600 hover:text-oak-800 px-3 py-2 text-sm font-medium">Contact</a>
                  <a href="/cart" className="bg-oak-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-oak-700">Cart</a>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="bg-oak-800 text-white mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Wood & Good</h3>
                <p className="text-oak-200">Premium handcrafted oak furniture for your home.</p>
              </div>
              <div>
                <h4 className="text-md font-semibold mb-4">Products</h4>
                <ul className="space-y-2 text-oak-200">
                  <li><a href="/categories/tabletops" className="hover:text-white">Table Tops</a></li>
                  <li><a href="/categories/table-legs" className="hover:text-white">Table Legs</a></li>
                  <li><a href="/products" className="hover:text-white">All Products</a></li>
                  <li><a href="/categories" className="hover:text-white">Browse Categories</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-md font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-oak-200">
                  <li><a href="/about" className="hover:text-white">About Us</a></li>
                  <li><a href="/about/craftsmanship" className="hover:text-white">Craftsmanship</a></li>
                  <li><a href="/about/sustainability" className="hover:text-white">Sustainability</a></li>
                  <li><a href="/contact" className="hover:text-white">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-md font-semibold mb-4">Connect</h4>
                <ul className="space-y-2 text-oak-200">
                  <li><a href="/newsletter" className="hover:text-white">Newsletter</a></li>
                  <li><a href="#" className="hover:text-white">Instagram</a></li>
                  <li><a href="#" className="hover:text-white">Facebook</a></li>
                  <li><a href="/blog" className="hover:text-white">Blog</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-oak-700 mt-8 pt-8 text-center text-oak-200">
              <p>&copy; 2025 SIA WOOD AND GOOD. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
