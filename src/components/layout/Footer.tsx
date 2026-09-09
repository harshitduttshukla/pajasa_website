'use client';

import React from 'react';
import Link from 'next/link';
import { Building, Mail, MapPin, Phone, Shield } from 'lucide-react';
import { LOCATIONS_DATA } from '@/config/locationsData';

export function Footer() {
  return (
    <footer className="bg-[#18181B] text-[#E4E4E7] border-t border-[#27272A]">
      {/* 1. Locations & Service Apartments Directory Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 border-b border-[#27272A]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-6 border-b border-[#27272A]">
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
              PAJASA Service Apartments Directory
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Explore corporate housing and executive serviced residences across India and global business hubs.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[11px] font-bold text-[#F59A16] uppercase tracking-wider bg-[#202023] px-3 py-1.5 rounded-md border border-zinc-800">
              Corporate Housing Network
            </span>
          </div>
        </div>

        {/* Locations Grid by Country / Region */}
        <div className="pt-6 space-y-7">
          {LOCATIONS_DATA.map((countryGroup) => (
            <div key={countryGroup.country} className="space-y-3">
              {/* Country Dot Badge Header */}
              <div className="flex items-center gap-2">
                <span className="text-[#F59A16] text-[10px]">●</span>
                <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-[#F59A16]">
                  {countryGroup.country.toUpperCase()} SERVICE APARTMENTS
                </h4>
              </div>

              {/* Responsive 4-Column Grid for Desktop (1 Col Mobile, 2 Col Tablet, 4 Col Desktop) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
                {countryGroup.cities.map((city) => (
                  <div
                    key={city.name}
                    className="bg-[#202023] p-3 rounded-xl border border-zinc-800/80 space-y-1.5 shadow-xs transition-all hover:border-zinc-700"
                  >
                    {/* Card Header Row */}
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5">
                      <Link
                        href={city.slug}
                        className="text-xs font-extrabold text-white hover:text-[#F59A16] transition-colors"
                      >
                        {city.name}
                      </Link>
                      <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">
                        CITY
                      </span>
                    </div>

                    {/* Locality Links - Service Apartments in [City/Locality] */}
                    {city.locations && city.locations.length > 0 && (
                      <ul className="space-y-1 pt-1 text-[11px]">
                        {city.locations.map((loc, idx) => (
                          <li key={loc.slug + idx}>
                            <Link
                              href={loc.slug}
                              className="text-zinc-400 hover:text-[#F59A16] transition-colors font-medium block leading-tight"
                            >
                              Service Apartments in {loc.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Corporate Information, Offices & Services Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-[#27272A]">
          
          {/* Column 1: Brand & About PAJASA */}
          <div className="space-y-3">
            <Link href="/" className="inline-block">
              <img
                src="https://www.pajasaapartments.com/wp-content/uploads/2024/11/pajasa_apartments.webp"
                alt="PAJASA Service Apartments"
                className="h-9 w-auto object-contain brightness-110"
              />
            </Link>
            <div className="space-y-1">
              <h5 className="text-xs font-extrabold uppercase text-white tracking-wider">About PAJASA</h5>
              <p className="text-xs text-zinc-400 leading-relaxed">
                PAJASA Stay Solutions is India&apos;s premier corporate accommodation aggregator providing fully furnished serviced apartments with dedicated caretakers across major business hubs.
              </p>
            </div>
            <div className="pt-1">
              <span className="text-xs font-extrabold text-[#F59A16] uppercase tracking-wider">
                First Home for Corporate Stays
              </span>
            </div>
          </div>

          {/* Column 2: Regional Offices */}
          <div className="space-y-3">
            <h5 className="text-xs font-extrabold uppercase text-white tracking-wider">Corporate Offices</h5>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li className="space-y-0.5">
                <span className="font-bold text-zinc-200 block">Corporate Office (Mumbai)</span>
                <span className="text-[11px] block">PAJASA Stay Solutions Pvt Ltd, Mumbai, Maharashtra, India</span>
              </li>
              <li className="space-y-0.5">
                <span className="font-bold text-zinc-200 block">Hyderabad Office</span>
                <span className="text-[11px] block">Kondapur & Hitech City Corporate Corridor, Hyderabad</span>
              </li>
              <li className="space-y-0.5">
                <span className="font-bold text-zinc-200 block">Gurgaon Office</span>
                <span className="text-[11px] block">DLF Cyber City & Golf Course Road Hub, Gurugram</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links & Services */}
          <div className="space-y-3">
            <h5 className="text-xs font-extrabold uppercase text-white tracking-wider">Our Services & Links</h5>
            <ul className="space-y-2 text-xs font-medium text-zinc-400">
              <li><Link href="/corporate" className="hover:text-[#F59A16] transition-colors">Our Services</Link></li>
              <li><Link href="/corporate" className="hover:text-[#F59A16] transition-colors">Corporate Housing Solutions</Link></li>
              <li><Link href="/properties" className="hover:text-[#F59A16] transition-colors">Our-Presence & Cities</Link></li>
              <li><Link href="/contact" className="hover:text-[#F59A16] transition-colors">Stay Feedback</Link></li>
              <li><Link href="/contact" className="hover:text-[#F59A16] transition-colors">Sitemap</Link></li>
              <li><Link href="/corporate" className="hover:text-[#F59A16] transition-colors">Login / Register</Link></li>
              <li><Link href="/contact" className="hover:text-[#F59A16] transition-colors">Contact Concierge</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Inquiries */}
          <div className="space-y-3">
            <h5 className="text-xs font-extrabold uppercase text-white tracking-wider">Direct Desk Contact</h5>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F59A16] shrink-0 mt-0.5" />
                <span>Executive Concierge Desk, PAJASA Stay Solutions</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F59A16] shrink-0" />
                <a href="tel:+919811029789" className="hover:text-[#F59A16] transition-colors font-bold text-white">+91 98110 29789</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F59A16] shrink-0" />
                <a href="mailto:info@pajasaapartments.com" className="hover:text-[#F59A16] transition-colors font-bold text-white">info@pajasaapartments.com</a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* 3. Sub-footer Bar with Copyright */}
      <div className="bg-[#121214] py-3.5 border-t border-[#27272A] text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#F59A16]" />
            <span>© {new Date().getFullYear()} PAJASA Stay Solutions Pvt Ltd. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 font-semibold text-zinc-400">
            <Link href="/privacy" className="hover:text-[#F59A16] transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-[#F59A16] transition-colors">Terms & Conditions</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-[#F59A16] transition-colors">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
