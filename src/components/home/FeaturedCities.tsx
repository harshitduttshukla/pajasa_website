'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Building, MapPin } from 'lucide-react';
import { PAJASA_CITIES, PAJASA_LOCATIONS } from '@/data/mockData';

export function FeaturedCities() {
  return (
    <section id="cities" className="py-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section 1: Top Cities */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight">Top Cities</h2>
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
              Serviced Apartments in Top Cities, Near to your Work Location
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PAJASA_CITIES.map((city, idx) => (
              <motion.div
                key={city.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative h-80 rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 hover:shadow-2xl transition-all"
              >
                <img loading="lazy" decoding="async"
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute top-3 left-3 z-10">
                  <span className="px-3 py-1 rounded-full bg-black/70 text-[#F59A16] text-xs font-bold flex items-center gap-1">
                    <Building className="w-3.5 h-3.5" />
                    {city.propertyCount} Listings
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                  <Link href={`/in/${city.slug}/`}>
                    <h3 className="text-2xl font-bold text-white group-hover:text-[#F59A16] transition-colors">
                      {city.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-slate-300 mt-1">{city.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 2: Top Locations */}
        <div className="space-y-10 pt-10 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight">Top Locations</h2>
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
              Serviced Apartments by PAJASA – Right Where You Work
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PAJASA_LOCATIONS.map((loc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative h-64 rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 hover:shadow-2xl transition-all"
              >
                <img loading="lazy" decoding="async"
                  src={loc.image}
                  alt={loc.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-full bg-[#F59A16] text-slate-950 text-[11px] font-bold">
                    {loc.count}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#F59A16] transition-colors flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#F59A16] shrink-0" />
                    <span>{loc.name}</span>
                  </h3>
                  <p className="text-[11px] text-slate-300 line-clamp-1">{loc.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
