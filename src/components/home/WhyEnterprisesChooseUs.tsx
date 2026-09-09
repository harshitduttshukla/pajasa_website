'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, DollarSign, Hand, Home, PlusCircle, ShieldCheck, Sparkles, Utensils, Wifi } from 'lucide-react';
import { PAJASA_WHY_CHOOSE } from '@/data/mockData';

export function WhyEnterprisesChooseUs() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'PlusCircle': return <PlusCircle className="w-6 h-6 text-[#F59A16]" strokeWidth={1.5} />;
      case 'Hand': return <Hand className="w-6 h-6 text-[#F59A16]" strokeWidth={1.5} />;
      case 'Utensils': return <Utensils className="w-6 h-6 text-[#F59A16]" strokeWidth={1.5} />;
      case 'DollarSign': return <DollarSign className="w-6 h-6 text-[#F59A16]" strokeWidth={1.5} />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-[#F59A16]" strokeWidth={1.5} />;
      default: return <Home className="w-6 h-6 text-[#F59A16]" strokeWidth={1.5} />;
    }
  };

  return (
    <section className="py-20 bg-[#FAFAF8] text-[#3F3F3F] border-t border-[#E8E8E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#F59A16] text-xs font-extrabold tracking-wider uppercase inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            ENTERPRISE STANDARDS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#3F3F3F]">
            Why Companies Choose PAJASA
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] font-normal leading-relaxed">
            World-class hygiene, single caretaker security, and corporate travel desk SLAs tailored for Fortune 500 enterprises.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PAJASA_WHY_CHOOSE.slice(0, 6).map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-white border border-[#E8E8E8] rounded-2xl p-6 space-y-3 shadow-xs hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
                {getIcon(feature.icon)}
              </div>

              <h3 className="text-base font-extrabold text-[#3F3F3F]">
                {feature.title}
              </h3>

              <p className="text-xs text-[#666666] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

