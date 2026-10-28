'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export function CorporateHousingCalc() {
  const [employees, setEmployees] = useState(5);
  const [stayDurationDays, setStayDurationDays] = useState(30);

  const hotelAvgDaily = 8500;
  const pajasaAvgDaily = 4500;

  const totalHotelCost = employees * stayDurationDays * hotelAvgDaily;
  const totalPajasaCost = employees * stayDurationDays * pajasaAvgDaily;
  const totalSavings = totalHotelCost - totalPajasaCost;
  const gstCreditSavings = Math.round(totalPajasaCost * 0.12);

  return (
    <section className="py-20 bg-[#FAFAF8] text-[#3F3F3F] border-t border-[#E8E8E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#F59A16] text-xs font-extrabold tracking-wider uppercase inline-flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5 text-[#F59A16]" />
            ENTERPRISE ROI CALCULATOR
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#3F3F3F]">
            Corporate Savings Estimator
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] font-normal leading-relaxed">
            See how much your enterprise saves by switching from traditional 5-star hotels to PAJASA Serviced Apartments with 100% GST tax credit.
          </p>
        </div>

        {/* Calculator Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch max-w-5xl mx-auto">
          
          {/* Controls */}
          <div className="lg:col-span-6 bg-white border border-[#E8E8E8] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs flex flex-col justify-between">
            <h3 className="text-base font-extrabold text-[#3F3F3F]">
              Configure Corporate Deployment
            </h3>

            {/* Slider 1: Employees */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[#666666]">Number of Executives:</span>
                <span className="text-[#F59A16] text-sm font-extrabold">{employees} People</span>
              </div>
              <input
                type="range"
                aria-label="Number of executives"
                min={1}
                max={50}
                value={employees}
                onChange={(e) => setEmployees(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-slate-100 accent-[#F59A16] cursor-pointer"
              />
            </div>

            {/* Slider 2: Duration */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[#666666]">Stay Duration:</span>
                <span className="text-[#F59A16] text-sm font-extrabold">{stayDurationDays} Days</span>
              </div>
              <input
                type="range"
                aria-label="Stay duration in days"
                min={5}
                max={180}
                step={5}
                value={stayDurationDays}
                onChange={(e) => setStayDurationDays(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-slate-100 accent-[#F59A16] cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-100 text-xs space-y-2 text-[#3F3F3F]">
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Single Caretaker Security (WHO Sanitation Compliant)</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>100% Tax Deductible GST B2B Invoice SLA</span>
              </div>
            </div>
          </div>

          {/* Results Display Card */}
          <div className="lg:col-span-6 bg-[#3F3F3F] border border-[#3F3F3F] rounded-2xl p-6 sm:p-8 text-white space-y-6 shadow-xs flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-extrabold text-[#F59A16] uppercase tracking-wider block">Estimated Total Savings</span>
              <div className="text-3xl sm:text-4xl font-extrabold text-white">
                {formatCurrency(totalSavings)}
              </div>
              <p className="text-xs text-emerald-400 font-extrabold">
                + {formatCurrency(gstCreditSavings)} Additional GST Tax Credit Claimable
              </p>
            </div>

            <div className="space-y-2.5 text-xs pt-4 border-t border-slate-600">
              <div className="flex justify-between text-slate-300 font-medium">
                <span>Traditional Hotel Cost:</span>
                <span className="font-semibold text-slate-300 line-through">{formatCurrency(totalHotelCost)}</span>
              </div>
              <div className="flex justify-between text-slate-300 font-medium">
                <span>PAJASA Corporate Rate:</span>
                <span className="font-bold text-emerald-400">{formatCurrency(totalPajasaCost)}</span>
              </div>
            </div>

            <a
              href="tel:+919811029789"
              className="w-full py-3.5 px-6 rounded-xl bg-[#F59A16] hover:bg-[#e08a0b] text-[#3F3F3F] font-extrabold text-xs shadow-md transition-all text-center block uppercase tracking-wider cursor-pointer"
            >
              Request Corporate Travel Desk SLA
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}

