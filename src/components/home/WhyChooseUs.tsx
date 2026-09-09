'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, DollarSign, Hand, Home, PlusCircle, ShieldCheck, Smile, Utensils, Wifi } from 'lucide-react';
import { PAJASA_WHY_CHOOSE } from '@/data/mockData';

export function WhyChooseUs() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'PlusCircle': return <PlusCircle className="w-8 h-8 text-amber-500" />;
      case 'Hand': return <Hand className="w-8 h-8 text-amber-500" />;
      case 'Utensils': return <Utensils className="w-8 h-8 text-amber-500" />;
      case 'DollarSign': return <DollarSign className="w-8 h-8 text-amber-500" />;
      case 'ShieldCheck': return <ShieldCheck className="w-8 h-8 text-amber-500" />;
      case 'Smile': return <Smile className="w-8 h-8 text-amber-500" />;
      case 'Wifi': return <Wifi className="w-8 h-8 text-amber-500" />;
      case 'Coffee': return <Coffee className="w-8 h-8 text-amber-500" />;
      default: return <Home className="w-8 h-8 text-amber-500" />;
    }
  };

  return (
    <section id="why-us" className="py-20 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Why Choose <span className="text-amber-500">PAJASA?</span>
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Dedicated care, 5-star hygiene, and complete safety measures tailored for corporate long stays.
          </p>
        </div>

        {/* 9 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PAJASA_WHY_CHOOSE.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center hover:shadow-xl hover:border-amber-500/50 transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                {getIcon(feature.icon)}
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {feature.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
