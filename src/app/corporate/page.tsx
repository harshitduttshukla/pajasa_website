'use client';

import React, { useState } from 'react';
import { Award, Building2, CheckCircle2, Receipt, UserCheck } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { propertyBookingSchema, PropertyBookingFormValues } from '@/lib/schemas';

export default function CorporatePage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PropertyBookingFormValues>({
    resolver: zodResolver(propertyBookingSchema),
  });

  const onSubmitInquiry = (data: PropertyBookingFormValues) => {
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="pt-36 pb-24 bg-[#FAFAF8] text-[#3F3F3F] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#F59A16] text-xs font-extrabold uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-[#F59A16]" />
            <span>Corporate Travel Solutions</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#3F3F3F] tracking-tight">
            Enterprise Serviced Housing <span className="text-[#F59A16]">Program</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
            Streamline employee relocations, long-term corporate assignments, and executive stays with centralized invoicing, custom SLAs, and dedicated account managers.
          </p>
        </div>

        {/* Corporate Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E8E8E8] space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
              <Receipt className="w-6 h-6 text-[#F59A16]" />
            </div>
            <h3 className="text-lg font-extrabold text-[#3F3F3F]">Centralized Billing & GST Credit</h3>
            <p className="text-xs text-[#666666] leading-relaxed">
              Consolidated monthly invoices with itemized GST breakdown for 100% tax compliance and audit-ready corporate accounting.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E8E8E8] space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-[#F59A16]" />
            </div>
            <h3 className="text-lg font-extrabold text-[#3F3F3F]">Dedicated Key Account Manager</h3>
            <p className="text-xs text-[#666666] leading-relaxed">
              Single point of contact for employee check-ins, custom meal plans, special transit requests, and emergency support.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E8E8E8] space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
              <Award className="w-6 h-6 text-[#F59A16]" />
            </div>
            <h3 className="text-lg font-extrabold text-[#3F3F3F]">Negotiated Long-Stay Discounts</h3>
            <p className="text-xs text-[#666666] leading-relaxed">
              Enjoy volume corporate discounts of up to 35% on stays exceeding 15 days across 18 major metro business hubs.
            </p>
          </div>
        </div>

        {/* Enterprise Contact Form */}
        <div className="p-6 sm:p-10 rounded-2xl bg-white border border-[#E8E8E8] max-w-3xl mx-auto space-y-6 shadow-xs">
          <div className="text-center space-y-1">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#3F3F3F]">Request an Enterprise Corporate Agreement</h3>
            <p className="text-xs text-[#666666]">Fill out your company details to receive custom corporate rates within 2 hours.</p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-center space-y-2 font-bold">
              <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-600" />
              <h4 className="font-extrabold text-base">Corporate Request Submitted!</h4>
              <p className="text-xs text-emerald-800">An Enterprise Solutions Director will contact your HR/Admin team shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmitInquiry)} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#3F3F3F] font-bold mb-1">HR / Travel Manager Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Radhika Sharma"
                    {...register('fullName')}
                    className="w-full py-3 px-4 rounded-xl bg-slate-50 border border-[#E8E8E8] text-[#3F3F3F] focus:outline-none focus:border-[#F59A16]"
                  />
                  {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName.message}</p>}
                </div>

                <div>
                  <label className="block text-[#3F3F3F] font-bold mb-1">Company Email *</label>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    {...register('email')}
                    className="w-full py-3 px-4 rounded-xl bg-slate-50 border border-[#E8E8E8] text-[#3F3F3F] focus:outline-none focus:border-[#F59A16]"
                  />
                  {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#3F3F3F] font-bold mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    placeholder="+91 98110 29789"
                    {...register('phone')}
                    className="w-full py-3 px-4 rounded-xl bg-slate-50 border border-[#E8E8E8] text-[#3F3F3F] focus:outline-none focus:border-[#F59A16]"
                  />
                  {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone.message}</p>}
                </div>

                <div>
                  <label className="block text-[#3F3F3F] font-bold mb-1">Company Name</label>
                  <input
                    type="text"
                    placeholder="Company Name"
                    {...register('companyName')}
                    className="w-full py-3 px-4 rounded-xl bg-slate-50 border border-[#E8E8E8] text-[#3F3F3F] focus:outline-none focus:border-[#F59A16]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#3F3F3F] font-bold mb-1">Estimated Annual Room Nights / Requirements</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about expected room nights, target cities, and GST requirements..."
                  {...register('specialRequests')}
                  className="w-full p-4 rounded-xl bg-slate-50 border border-[#E8E8E8] text-[#3F3F3F] focus:outline-none focus:border-[#F59A16]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[#F59A16] hover:bg-[#e08a0b] text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                Submit Corporate Partnership Request
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}

