'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, AlertCircle } from 'lucide-react';
import { PropertyCard } from '../property/PropertyCard';
import { Property } from '@/types';
import { BookingModal } from '../ui/BookingModal';
import { fetchProperties, transformBackendProperty } from '@/lib/api';

const BADGES = ['POPULAR', 'BEST VALUE', 'PREMIUM', 'LUXURY'];

export function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadProperties() {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetchProperties({ limit: 8 });
        if (isMounted) {
          const transformed = res.items.map(transformBackendProperty);
          setProperties(transformed);
        }
      } catch (err: any) {
        if (isMounted) {
          setError('Unable to load apartments. Please try again.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    loadProperties();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleBookNow = (prop: Property) => {
    setSelectedProperty(prop);
    setBookingModalOpen(true);
  };

  const featuredList = properties.slice(0, 4);

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

        {/* Loading State */}
        {isLoading && (
          <div className="py-12 text-center space-y-3">
            <div className="inline-block w-8 h-8 border-3 border-[#F59A16] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-semibold text-[#666666]">Loading apartments...</p>
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="p-8 text-center bg-white border border-red-100 rounded-2xl space-y-3">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
            <p className="text-xs font-bold text-red-600">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && featuredList.length === 0 && (
          <div className="p-12 text-center bg-white border border-[#E8E8E8] rounded-2xl space-y-3 shadow-xs">
            <Building2 className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-sm font-extrabold text-[#3F3F3F]">No apartments available</h3>
            <p className="text-xs text-[#666666]">Check back soon for newly listed executive residences.</p>
          </div>
        )}

        {/* 4-Column Horizontal Desktop Grid */}
        {!isLoading && !error && featuredList.length > 0 && (
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
        )}

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


