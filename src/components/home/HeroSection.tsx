'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SearchCard } from './SearchCard';

export function HeroSection() {
  return (
    <section className="relative bg-[#fafaf8] pt-36 sm:pt-40 pb-12 lg:pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Grid: Left Content (~42%), Right Large Image (~58%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[480px]">
          
          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-5 text-left"
          >
            {/* Small Orange Eyebrow */}
            <span className="inline-block text-xs font-extrabold tracking-widest text-[#F59A16] uppercase">
              PREMIUM LIVING. PERSONAL TOUCH.
            </span>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#3F3F3F] leading-[1.1]">
              Your <span className="text-[#F59A16]">Comfort.</span>
              <br />
              Our Priority.
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#666666] font-normal leading-relaxed max-w-md">
              Experience fully furnished serviced apartments designed for comfort, convenience, and a memorable stay.
            </p>

            {/* Primary CTA */}
            <div className="pt-2">
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#F59A16] hover:bg-[#e08a0b] text-[#3F3F3F] font-bold text-xs uppercase tracking-wider shadow-md transition-all transform hover:-translate-y-0.5"
              >
                <span>EXPLORE APARTMENTS</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Right Large Apartment Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7 relative w-full h-[320px] sm:h-[400px] lg:h-[460px] rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
              alt="PAJASA Premium Serviced Apartment Living Room"
              className="w-full h-full object-cover object-center"
            />
            {/* Subtle Gradient Accent Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </motion.div>

        </div>

        {/* Overlapping Booking Search Bar Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 lg:-mt-10 relative z-20"
        >
          <SearchCard />
        </motion.div>

      </div>
    </section>
  );
}

