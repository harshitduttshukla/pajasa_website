'use client';

import React from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, ChevronRight, MessageCircle, Phone, X } from 'lucide-react';
import { CITIES_DATA } from '@/data/mockData';
import { cityUrl } from '@/lib/utils';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBookingModal: () => void;
}

export function MobileNav({ isOpen, onClose, onOpenBookingModal }: MobileNavProps) {
  const navLinks = [
    { label: 'HOME', href: '/' },
    { label: 'APARTMENTS', href: '/properties' },
    { label: 'SERVICES', href: '/corporate' },
    { label: 'ABOUT US', href: '/corporate' },
    { label: 'CONTACT', href: '/contact' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs lg:hidden"
          />

          {/* Drawer Menu */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-50 w-4/5 max-w-sm h-full bg-white text-[#3F3F3F] shadow-2xl flex flex-col justify-between p-6 border-l border-[#E8E8E8] lg:hidden overflow-y-auto"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#E8E8E8]">
                <Link href="/" onClick={onClose} className="flex items-center gap-2">
                  <img
                    src="https://www.pajasaapartments.com/wp-content/uploads/2024/11/pajasa_apartments.webp"
                    alt="PAJASA Service Apartments"
                    className="h-8 w-auto object-contain"
                  />
                </Link>

                <button
                  onClick={onClose}
                  className="p-2 rounded-full text-[#3F3F3F] hover:bg-slate-100 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Quick Contact Actions */}
              <div className="my-6 grid grid-cols-2 gap-3">
                <a
                  href="tel:+919811029789"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#3F3F3F] font-bold text-xs border border-[#E8E8E8] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#F59A16]" />
                  Call Us
                </a>
                <a
                  href="https://wa.me/919811029789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  WhatsApp
                </a>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href + link.label}
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center justify-between py-3 px-4 rounded-lg text-[#3F3F3F] hover:text-[#F59A16] hover:bg-orange-50 font-bold text-xs tracking-wider transition-all"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                ))}
              </nav>

              {/* Select City Mobile Selector */}
              <div className="mt-4 pt-4 border-t border-[#E8E8E8]">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Select Destination City
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {CITIES_DATA.slice(0, 6).map((c) => (
                    <Link
                      key={c.id}
                      href={cityUrl(c.name)}
                      onClick={onClose}
                      className="p-2 rounded-md bg-slate-50 text-xs font-semibold text-[#3F3F3F] hover:bg-orange-50 hover:text-[#F59A16] border border-[#E8E8E8] truncate"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="pt-6 border-t border-[#E8E8E8] space-y-4">
              <button
                onClick={() => {
                  onClose();
                  onOpenBookingModal();
                }}
                className="w-full py-3 px-4 rounded-lg bg-[#F59A16] hover:bg-[#e08a0b] text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                BOOK NOW
              </button>

              <div className="text-center text-[11px] text-slate-500 font-medium">
                © {new Date().getFullYear()} PAJASA Apartments. All rights reserved.
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

