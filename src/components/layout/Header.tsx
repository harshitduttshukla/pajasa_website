'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown, Menu, Phone } from 'lucide-react';
import { CITIES_DATA } from '@/data/mockData';
import { cityUrl } from '@/lib/utils';
import { MobileNav } from './MobileNav';

interface HeaderProps {
  onOpenBookingModal?: () => void;
}

export function Header({ onOpenBookingModal }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCitySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const city = e.target.value;
    setSelectedCity(city);
    if (city) {
      router.push(cityUrl(city));
    }
  };

  const navLinks = [
    { label: 'HOME', href: '/' },
    { label: 'APARTMENTS', href: '/properties' },
    { label: 'SERVICES', href: '/corporate' },
    { label: 'ABOUT US', href: '/corporate' },
    { label: 'CONTACT', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-white border-b border-[#E8E8E8] ${
          isScrolled ? 'shadow-md' : 'shadow-xs'
        }`}
      >
        {/* Main Primary Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-3.5">
          {/* Logo Left */}
          <Link href="/" className="flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-[#F59A16] rounded-lg shrink-0">
            <img
              src="https://dcdza1qr0mu11.cloudfront.net/uploads/wp/2024/11/pajasa_apartments.webp.webp"
              alt="PAJASA Service Apartments"
              className="h-9 sm:h-10 w-auto object-contain"
            />
          </Link>

          {/* Navigation Links Center */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-xs font-bold tracking-wider transition-colors relative py-1 ${
                    isActive
                      ? 'text-[#F59A16] border-b-2 border-[#F59A16]'
                      : 'text-[#3F3F3F] hover:text-[#F59A16]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Section: City Selector + Phone + Book Now */}
          <div className="hidden lg:flex items-center gap-5">
            {/* Functional City Selector Dropdown */}
            <div className="relative flex items-center gap-1 text-xs font-bold text-[#3F3F3F] hover:text-[#F59A16] cursor-pointer">
              <select
                value={selectedCity}
                onChange={handleCitySelect}
                className="appearance-none bg-transparent pr-5 py-1 text-xs font-bold uppercase tracking-wider text-[#3F3F3F] focus:outline-none cursor-pointer border-none"
                aria-label="Select City Navigation"
              >
                <option value="" className="text-[#3F3F3F]">SELECT CITY</option>
                {CITIES_DATA.map((c) => (
                  <option key={c.id} value={c.name} className="text-[#3F3F3F]">
                    {c.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-0 w-4 h-4" />
            </div>

            {/* Phone Number */}
            <a
              href="tel:+919811029789"
              className="flex items-center gap-1.5 text-xs font-bold text-[#3F3F3F] hover:text-[#F59A16] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#F59A16]" />
              <span>+91 98110 29789</span>
            </a>

            {/* Primary Orange BOOK NOW CTA */}
            <button
              onClick={() => onOpenBookingModal?.()}
              className="px-5 py-2.5 rounded-lg bg-[#F59A16] hover:bg-[#e08a0b] text-[#3F3F3F] font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              BOOK NOW
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-3 lg:hidden">
            <a
              href="tel:+919811029789"
              className="p-2 rounded-lg bg-[#F59A16] text-[#3F3F3F] font-bold text-xs"
              aria-label="Call Helpline"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMobileNavOpen(true)}
              className="p-2 rounded-lg border border-[#E8E8E8] text-[#3F3F3F] hover:text-[#F59A16]"
              aria-label="Open Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        onOpenBookingModal={() => onOpenBookingModal?.()}
      />
    </>
  );
}

