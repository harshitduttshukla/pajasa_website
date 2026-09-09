'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, MapPin, Sparkles, Star, Wifi } from 'lucide-react';
import { PROPERTIES_DATA } from '@/data/mockData';
import { formatCurrency } from '@/lib/utils';

export function LuxuryCollection() {
  const featuredProperties = PROPERTIES_DATA.slice(0, 3);

  return (
    <section className="py-24 bg-white dark:bg-[#090e1a] text-slate-900 dark:text-white border-t border-slate-200/60 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="px-3.5 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-bold tracking-editorial inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              CURATED SUITES
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
              The Luxury Collection
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
              Handpicked executive penthouses and 5-star serviced residences designed for visiting corporate leaders and long-term project teams.
            </p>
          </div>

          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#d4af37] hover:text-[#b59226] transition-colors group"
          >
            <span>Explore All 1,200+ Residences</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProperties.map((property, idx) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="billion-card group flex flex-col justify-between overflow-hidden"
            >
              <div>
                <div className="relative h-64 overflow-hidden rounded-t-3xl">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-[#d4af37] text-slate-950 text-[10px] font-bold tracking-editorial shadow-md">
                      LUXURY RESIDENCE
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-xs font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{property.rating.toFixed(2)}</span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs text-[#d4af37] font-semibold tracking-wider uppercase">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{property.locality}, {property.city}</span>
                  </div>

                  <Link href={`/properties/${property.slug}`}>
                    <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white group-hover:text-[#d4af37] transition-colors line-clamp-1">
                      {property.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {property.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800/80 mt-4 flex items-center justify-between">
                <div>
                  <div className="text-xl font-bold font-display text-slate-900 dark:text-white">
                    {formatCurrency(property.pricePerNight)}
                    <span className="text-xs font-normal text-slate-500 font-sans"> / night</span>
                  </div>
                </div>

                <Link
                  href={`/properties/${property.slug}`}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs hover:bg-[#d4af37] dark:hover:bg-[#d4af37] dark:hover:text-slate-950 transition-colors"
                >
                  Explore Stay
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
