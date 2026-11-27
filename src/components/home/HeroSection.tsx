'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Star, Building2, MapPin } from 'lucide-react';
import { SearchCard } from './SearchCard';

export function HeroSection() {
  return (
    <section className="relative bg-[#fafaf8] pt-[68px] pb-12 lg:pb-16">
      {/* Edge-to-edge banner image with text overlay */}
      <div className="relative w-full min-h-[480px] sm:min-h-[540px] lg:min-h-[600px] overflow-hidden">
          <img
            src="/images/hero-service-apartment.jpg"
            alt="Premium service apartment living room with city view"
            className="absolute inset-0 w-full h-full object-cover object-center"
            fetchPriority="high"
          />
          {/* Navy gradient on the left so text stays readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d2b4e] via-[#0d2b4e]/80 to-transparent lg:via-[#0d2b4e]/60 lg:to-transparent pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 max-w-7xl mx-auto flex flex-col justify-center min-h-[480px] sm:min-h-[540px] lg:min-h-[600px] px-6 sm:px-10 lg:px-8 pb-16"
          >
            <div className="max-w-xl space-y-5">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              PREMIUM <span className="text-[#F59A16]">Service Apartments</span>
            </h1>

            <p className="text-base sm:text-lg text-white/90 font-medium leading-relaxed">
              Corporate accommodation for business travel, employee relocation and long-term stays.
            </p>

            <div className="pt-2">
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#F59A16] hover:bg-[#e08a0b] text-[#1f1f1f] font-bold text-sm shadow-md transition-all transform hover:-translate-y-0.5"
              >
                <span>Explore Apartments</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            </div>
          </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Overlapping Booking Search Bar Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="-mt-10 relative z-20 px-2 sm:px-8 lg:px-16"
        >
          <SearchCard />
        </motion.div>
      </div>

      {/* Stats strip */}
      <div className="mt-8 bg-[#FFF4E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-y-5">
          {[
            { Icon: Users, value: '5,000+', label: 'Guests Served' },
            { Icon: Star, value: '4.8/5', label: 'Guest Rating' },
            { Icon: Building2, value: '500+', label: 'Properties' },
            { Icon: MapPin, value: '6+', label: 'Cities' },
          ].map(({ Icon, value, label }, i) => (
            <div
              key={label}
              className={`flex items-center justify-center gap-3 ${i > 0 ? 'md:border-l md:border-[#E5D5C0]' : ''}`}
            >
              <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-[#F59A16] shrink-0" strokeWidth={1.5} />
              <div>
                <div className="text-xl sm:text-2xl font-bold text-[#F59A16] leading-tight">{value}</div>
                <div className="text-xs sm:text-sm text-[#3F3F3F]">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
