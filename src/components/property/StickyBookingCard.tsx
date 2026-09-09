'use client';

import React, { useState } from 'react';
import { Property } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Calendar, CheckCircle2, MessageSquare, Phone, ShieldCheck, Sparkles, Star, UserCheck } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { propertyBookingSchema, PropertyBookingFormValues } from '@/lib/schemas';

interface StickyBookingCardProps {
  property: Property;
}

export function StickyBookingCard({ property }: StickyBookingCardProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isCorporate, setIsCorporate] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PropertyBookingFormValues>({
    resolver: zodResolver(propertyBookingSchema),
    defaultValues: {
      guests: 1,
      checkIn: new Date().toISOString().split('T')[0],
      checkOut: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
    },
  });

  const watchCheckIn = watch('checkIn');
  const watchCheckOut = watch('checkOut');

  const calculateNights = () => {
    if (!watchCheckIn || !watchCheckOut) return 5;
    const start = new Date(watchCheckIn).getTime();
    const end = new Date(watchCheckOut).getTime();
    const diff = Math.max(1, Math.ceil((end - start) / (1000 * 3600 * 24)));
    return isNaN(diff) ? 5 : diff;
  };

  const nights = calculateNights();
  const subtotal = property.pricePerNight * nights;
  const corporateDiscount = isCorporate && nights >= 7 ? Math.round(subtotal * 0.15) : 0;
  const gstTax = Math.round((subtotal - corporateDiscount) * 0.12);
  const total = subtotal - corporateDiscount + gstTax;

  const onSubmitBooking = (data: PropertyBookingFormValues) => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <>
      {/* Desktop Sticky Sidebar Card */}
      <div className="sticky top-36 bg-white border border-[#E8E8E8] rounded-2xl p-6 shadow-xs space-y-6 text-[#3F3F3F]">
        
        {/* Concierge / Agent Profile Block */}
        <div className="p-4 rounded-xl bg-orange-50/60 border border-orange-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#F59A16] bg-orange-100 flex items-center justify-center shrink-0">
              <UserCheck className="w-5 h-5 text-[#F59A16]" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-[#3F3F3F]">PAJASA Travel Desk</h4>
              <p className="text-[11px] text-[#F59A16] font-extrabold">Dedicated Concierge Manager</p>
              <p className="text-[10px] text-slate-500">Response time: &lt; 15 mins</p>
            </div>
          </div>
          <a
            href="tel:+919811029789"
            className="p-2.5 rounded-full bg-[#F59A16] text-white hover:bg-[#e08a0b] transition-all cursor-pointer shadow-xs"
            aria-label="Call Concierge Manager"
            title="Call Manager"
          >
            <Phone className="w-4 h-4" />
          </a>
        </div>

        {/* Rate Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E8E8]">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-[#F59A16]">{formatCurrency(property.pricePerNight)}</span>
              <span className="text-xs text-[#666666] font-medium"> / night</span>
            </div>
            <p className="text-[11px] text-emerald-600 font-extrabold">
              Monthly Rate: {formatCurrency(property.pricePerMonth)}
            </p>
          </div>

          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-slate-50 border border-[#E8E8E8] text-xs font-extrabold text-[#3F3F3F]">
            <Star className="w-3.5 h-3.5 fill-[#F59A16] text-[#F59A16]" />
            <span>{property.rating.toFixed(2)}</span>
          </div>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-base font-extrabold text-[#3F3F3F]">Quote Inquiry Sent!</h4>
            <p className="text-xs text-[#666666]">
              Our travel coordinator will contact you directly with final availability and GST tax billing details.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmitBooking)} className="space-y-4 text-xs">
            {/* Corporate GST Toggle */}
            <div className="p-3 rounded-xl bg-orange-50/50 border border-orange-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F59A16]" />
                <span className="font-extrabold text-[#3F3F3F]">100% GST Tax Credit</span>
              </div>
              <input
                type="checkbox"
                checked={isCorporate}
                onChange={(e) => setIsCorporate(e.target.checked)}
                className="w-4 h-4 rounded accent-[#F59A16] cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#3F3F3F] font-bold mb-1">Check-in</label>
                <input
                  type="date"
                  {...register('checkIn')}
                  className="w-full py-2 px-3 rounded-xl bg-slate-50 border border-[#E8E8E8] text-[#3F3F3F] focus:outline-none focus:border-[#F59A16] cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-[#3F3F3F] font-bold mb-1">Check-out</label>
                <input
                  type="date"
                  {...register('checkOut')}
                  className="w-full py-2 px-3 rounded-xl bg-slate-50 border border-[#E8E8E8] text-[#3F3F3F] focus:outline-none focus:border-[#F59A16] cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#3F3F3F] font-bold mb-1">Full Name *</label>
              <input
                type="text"
                placeholder="Guest / Corporate Bookers Name"
                {...register('fullName')}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-[#E8E8E8] text-[#3F3F3F] focus:outline-none focus:border-[#F59A16]"
              />
              {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#3F3F3F] font-bold mb-1">Email *</label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  {...register('email')}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-[#E8E8E8] text-[#3F3F3F] focus:outline-none focus:border-[#F59A16]"
                />
                {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-[#3F3F3F] font-bold mb-1">Phone *</label>
                <input
                  type="tel"
                  placeholder="+91 98110 29789"
                  {...register('phone')}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-[#E8E8E8] text-[#3F3F3F] focus:outline-none focus:border-[#F59A16]"
                />
                {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone.message}</p>}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="p-4 rounded-xl bg-slate-50 border border-[#E8E8E8] space-y-2 text-xs">
              <div className="flex items-center justify-between text-[#666666]">
                <span>{formatCurrency(property.pricePerNight)} x {nights} nights</span>
                <span className="font-bold text-[#3F3F3F]">{formatCurrency(subtotal)}</span>
              </div>

              {corporateDiscount > 0 && (
                <div className="flex items-center justify-between text-emerald-600 font-extrabold">
                  <span>Corporate Discount</span>
                  <span>-{formatCurrency(corporateDiscount)}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-[#666666]">
                <span>GST (12%)</span>
                <span className="font-bold text-[#3F3F3F]">{formatCurrency(gstTax)}</span>
              </div>

              <div className="pt-2 border-t border-[#E8E8E8] flex items-center justify-between text-sm font-extrabold text-[#3F3F3F]">
                <span>Estimated Total</span>
                <span className="text-[#F59A16] font-extrabold">{formatCurrency(total)}</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-[#F59A16] hover:bg-[#e08a0b] text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve Corporate Stay</span>
            </button>

            {/* Fast Call / WhatsApp Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href="tel:+919811029789"
                className="py-2.5 px-3 rounded-xl bg-slate-50 border border-[#E8E8E8] text-[#3F3F3F] hover:text-[#F59A16] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-[#F59A16]" />
                <span>Call Helpline</span>
              </a>

              <a
                href="https://api.whatsapp.com/send?phone=919811029789&text=Hi%20PAJASA%20Team%2C%20I%20am%20interested%20in%20booking%20corporate%20serviced%20apartment."
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F59A16]" />
              <span>Dedicated Caretaker • Zero Hidden Fees</span>
            </div>
          </form>
        )}
      </div>

      {/* Mobile Floating Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8E8E8] p-3.5 lg:hidden flex items-center justify-between gap-3 shadow-lg">
        <div>
          <div className="text-xs text-slate-500">Starting from</div>
          <div className="text-lg font-extrabold text-[#F59A16]">{formatCurrency(property.pricePerNight)}<span className="text-xs text-slate-400">/night</span></div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="tel:+919811029789"
            className="p-3 rounded-full bg-slate-100 text-[#3F3F3F] border border-[#E8E8E8]"
            aria-label="Call Helpline"
          >
            <Phone className="w-4 h-4" />
          </a>

          <a
            href="#booking-form"
            className="px-5 py-3 rounded-xl bg-[#F59A16] text-white font-extrabold text-xs shadow-md uppercase tracking-wider"
          >
            Reserve Stay
          </a>
        </div>
      </div>
    </>
  );
}

