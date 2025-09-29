// Enhanced Footer Component with Material Icons
'use client';

import React from 'react';
import Link from 'next/link';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NatureIcon from '@mui/icons-material/Nature';
import HandymanIcon from '@mui/icons-material/Handyman';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="section section-earth-800 mt-20">
      <div className="section-container py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-oak-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">W</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white leading-tight">
                  SIA The Wood and Good
                </h3>
                <p className="text-sm text-oak-200 leading-none">Premium Oak Furniture</p>
              </div>
            </div>
            <p className="text-oak-200 mb-6 leading-relaxed">
              Crafting premium handcrafted oak furniture for over three generations. 
              Every piece is made from sustainably sourced solid oak, ensuring both 
              quality and environmental responsibility.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/woodandgood"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Follow us on Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/woodandgood"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Follow us on Facebook"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a
                href="mailto:info@woodandgood.com"
                className="social-link"
                aria-label="Send us an email"
              >
                <EmailIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="footer-heading">
              <HandymanIcon className="w-5 h-5" />
              <span>Products</span>
            </h4>
            <ul className="space-y-3 text-oak-200">
              <li>
                <Link href="/categories/tabletops" className="footer-link">
                  <span>Table Tops</span>
                </Link>
              </li>
              <li>
                <Link href="/categories/table-legs" className="footer-link">
                  <span>Table Legs</span>
                </Link>
              </li>
              <li>
                <Link href="/products" className="footer-link">
                  <span>All Products</span>
                </Link>
              </li>
              <li>
                <Link href="/categories" className="footer-link">
                  <span>Browse Categories</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="footer-heading">
              <NatureIcon className="w-5 h-5" />
              <span>Company</span>
            </h4>
            <ul className="space-y-3 text-oak-200">
              <li>
                <Link href="/about" className="hover:text-white transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/about/craftsmanship" className="hover:text-white transition-colors duration-200">
                  Craftsmanship
                </Link>
              </li>
              <li>
                <Link href="/about/sustainability" className="hover:text-white transition-colors duration-200">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors duration-200">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Services */}
          <div>
            <h4 className="footer-heading">
              <PhoneIcon className="w-5 h-5" />
              <span>Contact & Services</span>
            </h4>
            <div className="space-y-4 text-oak-200">
              <div className="flex items-start space-x-3">
                <LocationOnIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="footer-text-bold">Visit Our Workshop</p>
                  <p className="footer-text text-sm">Riga, Latvia</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <EmailIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="footer-text-bold">Email Us</p>
                  <a href="mailto:info@woodandgood.com" className="footer-text text-sm hover:text-white">
                    info@woodandgood.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <LocalShippingIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="footer-text-bold">Free Delivery</p>
                  <p className="footer-text text-sm">Throughout Latvia</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Bar */}
        <div className="border-t border-oak-700 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center space-x-3">
              <NatureIcon className="w-8 h-8 text-forest-400" />
              <div className="text-left">
                <p className="footer-text-bold">100% Sustainable</p>
                <p className="footer-text text-sm">Responsibly sourced oak</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              <HandymanIcon className="w-8 h-8 text-oak-400" />
              <div className="text-left">
                <p className="footer-text-bold">Handcrafted Quality</p>
                <p className="footer-text text-sm">Traditional techniques</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              <LocalShippingIcon className="w-8 h-8 text-oak-400" />
              <div className="text-left">
                <p className="footer-text-bold">Free Delivery</p>
                <p className="footer-text text-sm">Latvia-wide shipping</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-oak-700 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="footer-text text-sm">
              &copy; {currentYear} SIA The Wood and Good. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="footer-link">
                Privacy Policy
              </Link>
              <Link href="/terms" className="footer-link">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="footer-link">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}