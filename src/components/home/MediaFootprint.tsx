'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { MEDIA_LOGOS } from '@/data/mockData';

export function MediaFootprint() {
  return (
    <section className="py-12 sm:py-16 bg-[#FAFAF8] text-[#3F3F3F] border-t border-[#E8E8E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left: Media Footprint */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 bg-white border border-[#E8E8E8] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col"
          >
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#3F3F3F] tracking-tight mb-6">
              Our Media <span className="text-[#F59A16]">Footprint</span>
            </h2>
            <div className="grid grid-cols-3 gap-4 flex-1 content-center justify-items-center">
              {MEDIA_LOGOS.map((media, idx) => (
                <a
                  key={idx}
                  href={media.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-2xl bg-white border border-[#E8E8E8] hover:border-[#F59A16] hover:scale-105 transition-all flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 shadow-xs"
                >
                  <img loading="lazy" decoding="async"
                    src={media.image}
                    alt={`PAJASA Media Feature - ${media.name}`}
                    className="max-w-full max-h-full object-contain rounded-xl"
                  />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-6 bg-white border border-[#E8E8E8] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col justify-center gap-5"
          >
            <div className="h-44 sm:h-52 rounded-xl overflow-hidden">
              <img loading="lazy" decoding="async"
                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80"
                alt="Serviced Apartment Interior"
                className="w-full h-full object-cover"
              />
            </div>
            <Quote className="w-8 h-8 text-[#F59A16]" strokeWidth={1.5} />
            <p className="text-sm sm:text-base text-[#3F3F3F] font-medium leading-relaxed italic">
              &ldquo;Pajasa Apartments made my stay in Gurugram truly comfortable. The apartment was clean, well-equipped, and the service was excellent.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <span className="text-sm font-extrabold text-[#3F3F3F]">&mdash; Rahul Mehta</span>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F59A16] text-[#F59A16]" strokeWidth={1} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
