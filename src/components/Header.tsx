// Enhanced Header Component with Material Icons
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../hooks/api';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import ArticleIcon from '@mui/icons-material/Article';
import InfoIcon from '@mui/icons-material/Info';
import ContactPageIcon from '@mui/icons-material/ContactPage';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navigationItems = [
    { href: '/', label: 'Home', icon: HomeIcon },
    { href: '/products', label: 'Products', icon: CategoryIcon },
    { href: '/blog', label: 'Blog', icon: ArticleIcon },
    { href: '/about', label: 'About', icon: InfoIcon },
    { href: '/contact', label: 'Contact', icon: ContactPageIcon },
  ];

  const totalItems = cart?.total_items || 0;

  return (
    <header className="bg-white shadow-warm border-b border-oak-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-oak-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">W</span>
              </div>
              <div>
                                <h1 className="text-2xl font-bold text-textPrimary leading-tight">
                  Wood & Good
                </h1>
                <p className="text-sm text-textMuted leading-none">Premium Oak Furniture</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-8">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-textPrimary hover:text-oak-600 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center space-x-2 group"
                  >
                    <IconComponent className="w-4 h-4 transition-transform group-hover:scale-110" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              
              {/* Cart Button */}
              <Link
                href="/cart"
                className="bg-oak-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-oak-700 transition-all duration-200 flex items-center space-x-2 group relative"
              >
                <ShoppingCartIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span>Cart</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-forest-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-textSecondary hover:text-oak-600 hover:bg-oak-50 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <CloseIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-6 space-y-1 bg-white border-t border-oak-200">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className="text-textPrimary hover:text-oak-600 hover:bg-oak-50 px-4 py-3 text-base font-medium transition-colors duration-200 rounded-lg flex items-center space-x-3"
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              
              {/* Mobile Cart Button */}
              <Link
                href="/cart"
                onClick={closeMenu}
                className="bg-oak-600 text-white px-4 py-3 text-base font-medium hover:bg-oak-700 transition-colors duration-200 rounded-lg flex items-center space-x-3 relative"
              >
                <ShoppingCartIcon className="w-5 h-5" />
                <span>Cart</span>
                {totalItems > 0 && (
                  <span className="bg-forest-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-auto">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}