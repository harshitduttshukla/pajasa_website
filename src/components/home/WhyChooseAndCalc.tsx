'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Coffee, DollarSign, Hand, Home, PlusCircle, ShieldCheck, Smile, Utensils, Wifi } from 'lucide-react';
import { PAJASA_WHY_CHOOSE } from '@/data/mockData';
import { formatCurrency } from '@/lib/utils';

const ICONS: Record<string, React.ElementType> = { PlusCircle, Hand, Utensils, DollarSign, ShieldCheck, Smile, Wifi, Coffee };

export function WhyChooseAndCalc() {
  const [employees, setEmployees] = useState(5);
  const [days, setDays] = useState(30);
  const hotelCost = employees * days * 8500;
  const pajasaCost = employees * days * 4500;
  const savings = hotelCost - pajasaCost;
  const gst = Math.round(pajasaCost * 0.12);

  return (
    <section id="why-us" className="py-12 sm:py-16 bg-[#FAFAF8] border-t border-[#E8E8E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left: Why Choose PAJASA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 bg-white border border-[#E8E8E8] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col"
          >
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#3F3F3F] mb-6">
              Why Choose <span className="text-[#F59A16]">PAJASA?</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 flex-1 content-between">
              {PAJASA_WHY_CHOOSE.slice(0, 6).map((f) => {
                const Icon = ICONS[f.icon] ?? Home;
                return (
                  <div key={f.id} className="flex flex-col gap-2">
                    <div className="inline-flex p-2.5 rounded-xl bg-orange-50 w-fit">
                      <Icon className="w-6 h-6 text-[#F59A16]" strokeWidth={1.75} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm sm:text-base font-extrabold text-[#3F3F3F]">{f.title}</h3>
                      <p className="text-xs text-[#666666] leading-relaxed">{f.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-6 bg-white border border-[#E8E8E8] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col justify-between gap-5"
          >
            <div className="flex items-center gap-3">
              <div className="inline-flex p-2.5 rounded-xl bg-orange-50">
                <Calculator className="w-5 h-5 text-[#F59A16]" strokeWidth={1.75} />
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#3F3F3F]">Corporate Savings Calculator</h2>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[#666666]">Number of Executives</span>
                <span className="text-[#F59A16] text-sm font-extrabold">{employees} People</span>
              </div>
              <input type="range" aria-label="Number of executives" min={1} max={50} value={employees}
                onChange={(e) => setEmployees(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-slate-100 accent-[#F59A16] cursor-pointer" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[#666666]">Stay Duration</span>
                <span className="text-[#F59A16] text-sm font-extrabold">{days} Days</span>
              </div>
              <input type="range" aria-label="Stay duration in days" min={5} max={180} step={5} value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-slate-100 accent-[#F59A16] cursor-pointer" />
            </div>

            <div className="rounded-xl bg-orange-50/60 border border-orange-100 p-4 space-y-2">
              <span className="text-[11px] font-extrabold text-[#F59A16] uppercase tracking-wider block">Estimated Savings</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#3F3F3F]">{formatCurrency(savings)}</div>
              <p className="text-xs text-emerald-700 font-bold">+ {formatCurrency(gst)} GST credit claimable</p>
              <div className="flex justify-between text-xs text-[#666666] pt-2 border-t border-orange-100">
                <span>Hotel: <span className="line-through">{formatCurrency(hotelCost)}</span></span>
                <span>PAJASA: <strong className="text-[#3F3F3F]">{formatCurrency(pajasaCost)}</strong></span>
              </div>
            </div>

            <a href="tel:+917738777602"
              className="block w-full py-3 rounded-xl bg-[#F59A16] hover:bg-[#e08a0b] text-[#1f1f1f] font-extrabold text-xs text-center uppercase tracking-wider transition-all">
              Get Corporate Quote
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
