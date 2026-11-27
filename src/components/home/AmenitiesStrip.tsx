'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeftRight, CookingPot, FileText, Heart, Monitor, RefreshCw, ShieldCheck, Sparkles, Sun, Tv, Wifi, Zap,
} from 'lucide-react';

const AMENITIES = [
  { icon: Wifi, title: 'High-Speed Wi-Fi', description: 'Dedicated Fiber Broadband' },
  { icon: CookingPot, title: 'Equipped Kitchen', description: 'Hob, Fridge, Microwave & Cookware' },
  { icon: Sparkles, title: 'Daily Housekeeping', description: 'Linen Change & Sanitization' },
  { icon: ShieldCheck, title: '24/7 Security & CCTV', description: 'Gated Corporate Societies' },
  { icon: Monitor, title: 'Dedicated Workspace', description: 'Ergonomic Desk & Chair' },
  { icon: Tv, title: 'Smart LED TV', description: 'OTT Apps & HD Channels' },
  { icon: RefreshCw, title: 'Washing Machine', description: 'In-Apartment Laundry & Iron' },
  { icon: Sun, title: 'Split Air Conditioning', description: 'Climate Control in All Rooms' },
  { icon: Zap, title: '100% Power Backup', description: 'Uninterrupted Work & Comfort' },
  { icon: ArrowLeftRight, title: 'Reserved Parking', description: 'Covered Resident Car Park' },
  { icon: Heart, title: 'Clubhouse & Gym', description: 'Select Luxury Complexes' },
  { icon: FileText, title: 'GST Corporate Billing', description: 'Compliant Tax Invoices' },
];

export function AmenitiesStrip() {
  return (
    <section className="py-16 sm:py-20 bg-[#FAFAF8] border-t border-[#E8E8E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-5xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#3F3F3F]">
            Amenities in Every <span className="text-[#F59A16]">PAJASA</span> Apartment
          </h2>
          <p className="text-xs sm:text-sm text-[#666666]">Everything you need for a comfortable stay, included.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {AMENITIES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (idx % 4) * 0.06 }}
                className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-[#E8E8E8] shadow-xs hover:shadow-md hover:border-[#F59A16]/40 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#F59A16]" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-sm sm:text-base font-bold text-[#3F3F3F]">{item.title}</p>
                  <p className="text-xs text-[#666666] leading-snug mt-0.5">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
