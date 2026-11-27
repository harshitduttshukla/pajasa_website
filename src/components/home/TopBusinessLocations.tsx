'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Briefcase, Building } from 'lucide-react';
import { PAJASA_LOCATIONS } from '@/data/mockData';

export function TopBusinessLocations() {
  return (
    <section className="py-20 bg-[#FAFAF8] text-[#3F3F3F] border-t border-[#E8E8E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#F59A16] text-xs font-extrabold tracking-wider uppercase inline-flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5" />
            TOP BUSINESS LOCATIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#3F3F3F]">
            Top Business Locations
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] font-normal leading-relaxed">
            Stay minutes away from India&apos;s leading IT parks, business districts and corporate corridors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PAJASA_LOCATIONS.slice(0, 8).map((loc, idx) => (
            <motion.div
              key={loc.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative h-80 rounded-2xl overflow-hidden shadow-xs border border-[#E8E8E8] hover:shadow-md transition-all"
            >
              <img loading="lazy" decoding="async" src={loc.image} alt={loc.name} className="w-full h-full object-cover img-zoom filter brightness-90" />
              <Link href={loc.link} aria-label={loc.desc} className="absolute inset-0 z-20" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-md bg-[#F59A16] text-[#3F3F3F] text-[10px] font-extrabold flex items-center gap-1">
                  <Building className="w-3.5 h-3.5" />
                  {loc.count.replace('Listings', 'Properties')}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10 space-y-1">
                <h3 className="text-xl font-extrabold text-[#F59A16]! drop-shadow-md group-hover:text-white! transition-colors">{loc.name}</h3>
                <p className="text-xs text-slate-200 line-clamp-1">{loc.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
