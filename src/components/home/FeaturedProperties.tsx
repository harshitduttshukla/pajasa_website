'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PROPERTIES_DATA } from '@/data/mockData';
import { PropertyCard } from '../property/PropertyCard';
import { Property } from '@/types';
import { BookingModal } from '../ui/BookingModal';

const BADGES = ['POPULAR', 'BEST VALUE', 'PREMIUM', 'LUXURY'];

export function FeaturedProperties() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const handleBookNow = (prop: Property) => {
    setSelectedProperty(prop);
    setBookingModalOpen(true);
  };

  const featuredList = PROPERTIES_DATA.slice(0, 4);

  return (
    <section className="py-16 sm:py-20 bg-[#FAFAF8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-1">
            <span className="block text-xs font-extrabold tracking-wider text-[#F59A16] uppercase">
              FEATURED APARTMENTS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#3F3F3F] tracking-tight">
              Handpicked Stays for You
            </h2>
            <p className="text-xs sm:text-sm text-[#666666] font-normal">
              Premium apartments with the best amenities for your comfortable stay.
            </p>
          </div>

          <Link
            href="/properties"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#E8E8E8] hover:border-[#F59A16] text-xs font-bold text-[#3F3F3F] hover:text-[#F59A16] transition-all shadow-xs shrink-0 self-start sm:self-auto"
          >
            <span>VIEW ALL APARTMENTS</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F59A16]" />
          </Link>
        </div>

        {/* 4-Column Horizontal Desktop Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredList.map((property, idx) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <PropertyCard
                property={property}
                badgeText={BADGES[idx % BADGES.length]}
                onBookNow={handleBookNow}
              />
            </motion.div>
          ))}
        </div>

      </div>

      {/* Quick Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        selectedProperty={selectedProperty}
      />
    </section>
  );
}

