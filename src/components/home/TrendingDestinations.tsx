'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Building, Compass } from 'lucide-react';
import { PAJASA_CITIES } from '@/data/mockData';

export function TrendingDestinations() {
  return (
    <section className="py-20 bg-white text-[#3F3F3F] border-t border-[#E8E8E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#F59A16] text-xs font-extrabold tracking-wider uppercase inline-flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            TOP BUSINESS HUBS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#3F3F3F]">
            Trending Destinations
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] font-normal leading-relaxed">
            Serviced apartments located right next to India&apos;s major IT parks, financial districts, and business corridors.
          </p>
        </div>

        {/* 8 City Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PAJASA_CITIES.slice(0, 8).map((city, idx) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative h-80 rounded-2xl overflow-hidden shadow-xs border border-[#E8E8E8] hover:shadow-md transition-all"
            >
              <img loading="lazy" decoding="async"
                src={city.image}
                alt={city.name}
                className="w-full h-full object-cover img-zoom filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-md bg-[#F59A16] text-[#3F3F3F] text-[10px] font-extrabold flex items-center gap-1">
                  <Building className="w-3.5 h-3.5" />
                  {city.propertyCount} Stays
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 z-10 space-y-1">
                <Link href={`/in/${city.slug}/`}>
                  <h3 className="text-xl font-extrabold text-[#F59A16]! drop-shadow-md group-hover:text-white! transition-colors">
                    {city.name}
                  </h3>
                </Link>
                <p className="text-xs text-slate-200 line-clamp-1">{city.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

