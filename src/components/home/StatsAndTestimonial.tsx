'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building2, MapPin, Quote, Star, Users } from 'lucide-react';

export function StatsAndTestimonial() {
  const stats = [
    {
      icon: Users,
      value: '500+',
      label: 'Happy Guests',
    },
    {
      icon: Building2,
      value: '50+',
      label: 'Premium Apartments',
    },
    {
      icon: MapPin,
      value: '10+',
      label: 'Prime Locations',
    },
    {
      icon: Star,
      value: '4.8/5',
      label: 'Guest Rating',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Column: Statistics Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 bg-white border border-[#E8E8E8] rounded-2xl p-6 sm:p-8 flex items-center shadow-xs"
          >
            <div className="grid grid-cols-2 gap-6 sm:gap-8 w-full text-center sm:text-left">
              {stats.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="space-y-1">
                    <div className="inline-flex p-2.5 rounded-xl bg-orange-50 text-[#F59A16] mb-1">
                      <Icon className="w-6 h-6 text-[#F59A16]" strokeWidth={1.75} />
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#3F3F3F]">
                      {item.value}
                    </div>
                    <div className="text-xs text-[#666666] font-medium">
                      {item.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Testimonial Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-7 bg-white border border-[#E8E8E8] rounded-2xl p-6 sm:p-8 flex items-center shadow-xs"
          >
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center w-full">
              {/* Left Testimonial Text */}
              <div className="sm:col-span-7 space-y-3">
                <Quote className="w-8 h-8 text-[#F59A16]" strokeWidth={1.5} />
                <p className="text-xs sm:text-sm text-[#3F3F3F] font-medium leading-relaxed italic">
                  &ldquo;Pajasa Apartments made my stay in Gurugram truly comfortable. The apartment was clean, well-equipped, and the service was excellent.&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-1">
                  <span className="text-xs font-extrabold text-[#3F3F3F]">
                    &mdash; Rahul Mehta
                  </span>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-[#F59A16] text-[#F59A16]"
                        strokeWidth={1}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Apartment Image Thumbnail */}
              <div className="sm:col-span-5 h-40 sm:h-44 rounded-xl overflow-hidden shadow-xs">
                <img
                  src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80"
                  alt="Serviced Apartment Interior"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
