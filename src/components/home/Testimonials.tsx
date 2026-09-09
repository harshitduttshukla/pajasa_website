'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { REVIEWS_DATA } from '@/data/mockData';

export function Testimonials() {
  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Quote className="w-4 h-4 text-amber-400" />
            <span>Executive Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            What Corporate <span className="gold-gradient-text">Leaders Say</span>
          </h2>
          <p className="text-sm text-slate-400">
            Hear from corporate travel heads, tech founders, and visiting leaders who make Aura their home during business trips.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS_DATA.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/30 transition-all shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "{review.comment}"
                </p>
              </div>

              {/* Author */}
              <div className="pt-6 mt-6 border-t border-slate-800 flex items-center gap-3">
                <img
                  src={review.authorAvatar}
                  alt={review.authorName}
                  className="w-11 h-11 rounded-full object-cover border border-amber-500/40"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{review.authorName}</h4>
                  <p className="text-[11px] text-amber-400 font-medium">{review.authorCompany}</p>
                  <span className="text-[10px] text-slate-500 block">{review.stayType}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
