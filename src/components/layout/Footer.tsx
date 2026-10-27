'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  Phone,
  Shield,
} from 'lucide-react';
import { LOCATIONS_DATA } from '@/config/locationsData';

// Tab Definitions
type FooterTab = 'guests' | 'corporate' | 'services' | 'popular' | 'global';

interface TabItem {
  id: FooterTab;
  label: string;
  heading: string;
}

const TABS: TabItem[] = [
  { id: 'guests', label: 'FOR GUESTS', heading: 'Find Serviced Apartments by City' },
  { id: 'corporate', label: 'FOR CORPORATE', heading: 'Corporate Accommodation & Business Housing Solutions' },
  { id: 'services', label: 'SERVICES', heading: 'Executive Serviced Suite Categories & Hospitality Services' },
  { id: 'popular', label: 'POPULAR SEARCHES', heading: 'High-Demand Business Corridors & Tech Hub Localities' },
  { id: 'global', label: 'GLOBAL HUBS', heading: 'International Serviced Residences & Global Destinations' },
];

export function Footer() {
  const [activeTab, setActiveTab] = useState<FooterTab>('guests');

  // Extract India Cities from LOCATIONS_DATA
  const indiaGroup = LOCATIONS_DATA.find((c) => c.code === 'in');
  const indiaCities: { name: string; slug: string }[] = [];

  if (indiaGroup) {
    indiaGroup.cities.forEach((city) => {
      if (city.locations && city.locations.length > 0 && city.name !== 'Other Indian Cities') {
        indiaCities.push({ name: city.name, slug: city.slug });
      } else if (city.locations && city.name === 'Other Indian Cities') {
        city.locations.forEach((otherLoc) => {
          indiaCities.push({ name: otherLoc.name, slug: otherLoc.slug });
        });
      }
    });
  }

  // International Cities from LOCATIONS_DATA
  const internationalLocations: { name: string; slug: string }[] = [];
  LOCATIONS_DATA.filter((c) => c.code !== 'in').forEach((country) => {
    country.cities.forEach((city) => {
      internationalLocations.push({
        name: `${city.name} (${country.country})`,
        slug: city.slug,
      });
      if (city.locations) {
        city.locations.forEach((loc) => {
          if (loc.name !== city.name) {
            internationalLocations.push({
              name: `${loc.name}, ${city.name}`,
              slug: loc.slug,
            });
          }
        });
      }
    });
  });

  // Corporate Links
  const corporateLinks = [
    { title: 'Corporate Housing in Mumbai', href: '/in/mumbai/' },
    { title: 'Corporate Stays in Gurugram IT Hub', href: '/in/gurugram/' },
    { title: 'Corporate Apartments in Whitefield Bengaluru', href: '/in/bengaluru/whitefield/' },
    { title: 'Executive Suites in Hitech City Hyderabad', href: '/in/hyderabad/hitech-city/' },
    { title: 'Business Stays in Hinjewadi Pune', href: '/in/pune/hinjewadi/' },
    { title: 'Executive Serviced Residences in Chennai', href: '/in/chennai/' },
    { title: 'Enterprise Managed Accommodations', href: '/corporate' },
    { title: 'Dedicated Single Caretaker Stays', href: '/corporate' },
    { title: 'Corporate Relocation & Mobility Services', href: '/corporate' },
    { title: 'Extended Project Stay Management', href: '/corporate' },
    { title: 'Centralized Corporate Billing & Invoicing', href: '/corporate' },
    { title: 'Custom Master Service Agreements (MSA)', href: '/corporate' },
    { title: '100% Verified GST Compliant Invoices', href: '/corporate' },
    { title: 'VIP Executive Transit Suites', href: '/corporate' },
    { title: 'Flexible Monthly & Long-Term Leases', href: '/corporate' },
    { title: '24x7 Dedicated Corporate Concierge', href: '/contact' },
  ];

  // Services Links
  const servicesLinks = [
    { title: '1 BHK Serviced Apartments', href: '/properties' },
    { title: '2 BHK Executive Serviced Apartments', href: '/properties' },
    { title: '3 BHK Luxury Corporate Residences', href: '/properties' },
    { title: 'Studio Serviced Apartments', href: '/properties' },
    { title: 'Fully Equipped Modular Kitchens', href: '/properties' },
    { title: 'High-Speed Fiber Wi-Fi & Workstations', href: '/corporate' },
    { title: 'Daily Housekeeping & Fresh Linen Service', href: '/corporate' },
    { title: 'Clinically Sanitized WHO Standard Rooms', href: '/corporate' },
    { title: 'Long Stay Monthly Serviced Apartments', href: '/properties' },
    { title: 'Short Term Corporate Transit Housing', href: '/properties' },
    { title: 'Corporate Guest House Management', href: '/corporate' },
    { title: 'Executive Airport Transfers & Concierge', href: '/contact' },
    { title: 'Serviced Apartments in Central London', href: '/uk/london/' },
    { title: 'Corporate Suites in Marina Bay Singapore', href: '/sg/' },
    { title: 'Luxury Serviced Residences in Dubai', href: '/ae/dubai/' },
    { title: 'Executive Apartments in Manhattan NYC', href: '/us/new-york/' },
  ];

  // Popular Localities Links
  const popularLocalities = [
    { title: 'Service Apartments in Powai, Mumbai', href: '/in/mumbai/powai/' },
    { title: 'Service Apartments in BKC, Mumbai', href: '/in/mumbai/bkc/' },
    { title: 'Service Apartments in Andheri East, Mumbai', href: '/in/mumbai/andheri/' },
    { title: 'Service Apartments in Bandra West, Mumbai', href: '/in/mumbai/bandra/' },
    { title: 'Service Apartments in Hinjewadi, Pune', href: '/in/pune/hinjewadi/' },
    { title: 'Service Apartments in Baner, Pune', href: '/in/pune/baner/' },
    { title: 'Service Apartments in Kharadi, Pune', href: '/in/pune/kharadi/' },
    { title: 'Service Apartments in Kalyani Nagar, Pune', href: '/in/pune/kalyani-nagar/' },
    { title: 'Service Apartments in Whitefield, Bengaluru', href: '/in/bengaluru/whitefield/' },
    { title: 'Service Apartments in Koramangala, Bengaluru', href: '/in/bengaluru/koramangala/' },
    { title: 'Service Apartments in Electronic City, Bengaluru', href: '/in/bengaluru/electronic-city/' },
    { title: 'Service Apartments in Indiranagar, Bengaluru', href: '/in/bengaluru/indiranagar/' },
    { title: 'Service Apartments in Hitech City, Hyderabad', href: '/in/hyderabad/hitech-city/' },
    { title: 'Service Apartments in Kondapur, Hyderabad', href: '/in/hyderabad/kondapur/' },
    { title: 'Service Apartments in Gachibowli, Hyderabad', href: '/in/hyderabad/gachibowli/' },
    { title: 'Service Apartments in Banjara Hills, Hyderabad', href: '/in/hyderabad/banjara-hills/' },
    { title: 'Service Apartments in DLF Cyber City, Gurugram', href: '/in/gurugram/' },
    { title: 'Service Apartments in Sector 62, Noida', href: '/in/noida/' },
    { title: 'Service Apartments in Anna Nagar, Chennai', href: '/in/chennai/anna-nagar/' },
    { title: 'Service Apartments in Salt Lake City, Kolkata', href: '/in/kolkata/salt-lake-city/' },
  ];

  return (
    <footer className="bg-[#141416] text-[#E4E4E7] border-t border-[#27272A]">
      {/* ========================================================================= */}
      {/* 1. FOOTER DIRECTORY / LINK NAVIGATION AREA WITH TABS                     */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
        
        {/* Horizontal Tab Navigation Row */}
        <div className="border-b border-[#27272A] overflow-x-auto scrollbar-none">
          <nav
            className="flex items-center gap-6 sm:gap-8 min-w-max pb-0"
            aria-label="Footer Directory Tabs"
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative pb-3 text-xs sm:text-[13px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#F59A16] border-b-2 border-[#F59A16]'
                      : 'text-zinc-400 hover:text-zinc-200 border-b-2 border-transparent'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Directory Content Area */}
        <div className="pt-6">
          {/* Subheading indicating current category */}
          <h4 className="text-xs sm:text-sm font-bold text-zinc-200 mb-5 tracking-tight">
            {TABS.find((t) => t.id === activeTab)?.heading}
          </h4>

          {/* TAB 1: FOR GUESTS / CITIES */}
          {activeTab === 'guests' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-2.5">
              {indiaCities.map((city, idx) => (
                <Link
                  key={city.name + idx}
                  href={city.slug}
                  className="text-xs text-zinc-400 hover:text-[#F59A16] transition-colors leading-relaxed py-0.5 truncate block"
                  title={`Service Apartments in ${city.name}`}
                >
                  Service Apartments in {city.name}
                </Link>
              ))}
            </div>
          )}

          {/* TAB 2: FOR CORPORATE */}
          {activeTab === 'corporate' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-2.5">
              {corporateLinks.map((item, idx) => (
                <Link
                  key={item.title + idx}
                  href={item.href}
                  className="text-xs text-zinc-400 hover:text-[#F59A16] transition-colors leading-relaxed py-0.5 truncate block"
                  title={item.title}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          )}

          {/* TAB 3: SERVICES */}
          {activeTab === 'services' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-2.5">
              {servicesLinks.map((item, idx) => (
                <Link
                  key={item.title + idx}
                  href={item.href}
                  className="text-xs text-zinc-400 hover:text-[#F59A16] transition-colors leading-relaxed py-0.5 truncate block"
                  title={item.title}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          )}

          {/* TAB 4: POPULAR SEARCHES */}
          {activeTab === 'popular' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-2.5">
              {popularLocalities.map((item, idx) => (
                <Link
                  key={item.title + idx}
                  href={item.href}
                  className="text-xs text-zinc-400 hover:text-[#F59A16] transition-colors leading-relaxed py-0.5 truncate block"
                  title={item.title}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          )}

          {/* TAB 5: GLOBAL HUBS */}
          {activeTab === 'global' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-2.5">
              {internationalLocations.map((item, idx) => (
                <Link
                  key={item.name + idx}
                  href={item.slug}
                  className="text-xs text-zinc-400 hover:text-[#F59A16] transition-colors leading-relaxed py-0.5 truncate block"
                  title={`Service Apartments in ${item.name}`}
                >
                  Service Apartments in {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN CORPORATE FOOTER AREA                                             */}
      {/* ========================================================================= */}
      <div className="border-t border-[#27272A] bg-[#161619]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            
            {/* COLUMN 1: PAJASA BRAND & SOCIAL ICONS */}
            <div className="space-y-4">
              <Link href="/" className="inline-block focus-visible:outline-hidden">
                <img loading="lazy" decoding="async"
                  src="https://www.pajasaapartments.com/wp-content/uploads/2024/11/pajasa_apartments.webp"
                  alt="PAJASA Service Apartments"
                  className="h-8 sm:h-9 w-auto object-contain brightness-110"
                />
              </Link>
              
              <p className="text-xs text-zinc-400 leading-relaxed">
                PAJASA Stay Solutions is India&apos;s premier corporate accommodation aggregator providing fully furnished serviced apartments with dedicated caretakers across major business hubs.
              </p>

              <div className="pt-1">
                <span className="text-[11px] font-extrabold text-[#F59A16] uppercase tracking-wider block">
                  First Home for Corporate Stays
                </span>
              </div>

              {/* Social Media Icons */}
              <div className="pt-2">
                <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2.5">
                  Follow Us
                </div>
                <div className="flex items-center gap-2.5 text-zinc-400">
                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/company/pajasa-service-apartments/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="PAJASA on LinkedIn"
                    className="w-8 h-8 rounded-full border border-zinc-800 bg-[#1F1F23] flex items-center justify-center hover:border-[#F59A16] hover:text-[#F59A16] transition-all duration-150"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.88 0-1.6.72-1.6 1.6 0 .89.72 1.6 1.6 1.6s1.6-.71 1.6-1.6c0-.88-.72-1.6-1.6-1.6Z"/>
                    </svg>
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/pajasaapartments/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="PAJASA on Facebook"
                    className="w-8 h-8 rounded-full border border-zinc-800 bg-[#1F1F23] flex items-center justify-center hover:border-[#F59A16] hover:text-[#F59A16] transition-all duration-150"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95Z"/>
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/pajasa_apartments/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="PAJASA on Instagram"
                    className="w-8 h-8 rounded-full border border-zinc-800 bg-[#1F1F23] flex items-center justify-center hover:border-[#F59A16] hover:text-[#F59A16] transition-all duration-150"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>

                  {/* X (Twitter) */}
                  <a
                    href="https://twitter.com/pajasaapartment"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="PAJASA on X"
                    className="w-8 h-8 rounded-full border border-zinc-800 bg-[#1F1F23] flex items-center justify-center hover:border-[#F59A16] hover:text-[#F59A16] transition-all duration-150"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>

                  {/* YouTube */}
                  <a
                    href="https://www.youtube.com/@pajasaapartments"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="PAJASA on YouTube"
                    className="w-8 h-8 rounded-full border border-zinc-800 bg-[#1F1F23] flex items-center justify-center hover:border-[#F59A16] hover:text-[#F59A16] transition-all duration-150"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* COLUMN 2: COMPANY */}
            <div className="space-y-3">
              <h5 className="text-xs font-extrabold uppercase text-white tracking-wider">
                Company
              </h5>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li>
                  <Link href="/corporate" className="hover:text-[#F59A16] transition-colors block">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/corporate" className="hover:text-[#F59A16] transition-colors block">
                    Corporate Housing Solutions
                  </Link>
                </li>
                <li>
                  <Link href="/corporate" className="hover:text-[#F59A16] transition-colors block">
                    Why PAJASA
                  </Link>
                </li>
                <li>
                  <Link href="/corporate" className="hover:text-[#F59A16] transition-colors block">
                    Client Testimonials & Trust
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#F59A16] transition-colors block">
                    Careers & Growth
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#F59A16] transition-colors block">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-[#F59A16] transition-colors block">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#F59A16] transition-colors block">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>

            {/* COLUMN 3: SERVICES & EXPLORE */}
            <div className="space-y-3">
              <h5 className="text-xs font-extrabold uppercase text-white tracking-wider">
                Services & Explore
              </h5>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li>
                  <Link href="/properties" className="hover:text-[#F59A16] transition-colors block">
                    Serviced Apartments
                  </Link>
                </li>
                <li>
                  <Link href="/corporate" className="hover:text-[#F59A16] transition-colors block">
                    Enterprise Booking Desk
                  </Link>
                </li>
                <li>
                  <Link href="/properties" className="hover:text-[#F59A16] transition-colors block">
                    Our Presence & Cities
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#F59A16] transition-colors block">
                    Stay Feedback
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#F59A16] transition-colors block">
                    Sitemap
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#F59A16] transition-colors block">
                    Contact Concierge Desk
                  </Link>
                </li>
                <li>
                  <Link href="/corporate" className="hover:text-[#F59A16] transition-colors block">
                    Corporate Login / Register
                  </Link>
                </li>
              </ul>
            </div>

            {/* COLUMN 4: DIRECT DESK CONTACT & OFFICES */}
            <div className="space-y-4">
              <h5 className="text-xs font-extrabold uppercase text-white tracking-wider">
                Direct Desk Contact
              </h5>
              
              <ul className="space-y-2.5 text-xs text-zinc-400">
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#F59A16] shrink-0" />
                  <a
                    href="tel:+919811029789"
                    className="hover:text-[#F59A16] transition-colors font-bold text-white text-sm"
                  >
                    +91 98110 29789
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#F59A16] shrink-0" />
                  <a
                    href="mailto:info@pajasaapartments.com"
                    className="hover:text-[#F59A16] transition-colors font-medium text-zinc-300"
                  >
                    info@pajasaapartments.com
                  </a>
                </li>
              </ul>

              {/* Office Corridors */}
              <div className="pt-2 border-t border-zinc-800/80 space-y-2">
                <div className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider">
                  Corporate Locations
                </div>
                <div className="space-y-1.5 text-[11px] text-zinc-400 leading-snug">
                  <div>
                    <span className="font-semibold text-zinc-300">Mumbai HQ:</span> PAJASA Stay Solutions, Mumbai, Maharashtra
                  </div>
                  <div>
                    <span className="font-semibold text-zinc-300">Hyderabad Hub:</span> Kondapur & Hitech City Corridor
                  </div>
                  <div>
                    <span className="font-semibold text-zinc-300">Gurugram Office:</span> DLF Cyber City & Golf Course Rd
                  </div>
                </div>
              </div>

              {/* Verified Trust Badge */}
              <div className="p-2.5 rounded-lg bg-[#202024] border border-zinc-800 flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-[#F59A16] shrink-0" />
                <span className="text-[11px] text-zinc-300 font-medium leading-tight">
                  24x7 Corporate Concierge Desk & Verified GST Billing
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. SUB-FOOTER / COPYRIGHT BAR                                             */}
      {/* ========================================================================= */}
      <div className="bg-[#0E0E10] py-3.5 border-t border-[#27272A] text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-zinc-400">
            <Shield className="w-3.5 h-3.5 text-[#F59A16]" />
            <span>© {new Date().getFullYear()} PAJASA Stay Solutions Pvt Ltd. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-zinc-400 font-medium">
            <Link href="/privacy" className="hover:text-[#F59A16] transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-[#F59A16] transition-colors">
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-[#F59A16] transition-colors">
              Contact Us
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-[#F59A16] transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

