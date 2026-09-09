'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Building2, Calendar, CheckCircle2, Mail, Phone, User, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { propertyBookingSchema, PropertyBookingFormValues } from '@/lib/schemas';
import { Property } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProperty?: Property | null;
}

export function BookingModal({ isOpen, onClose, selectedProperty }: BookingModalProps) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PropertyBookingFormValues>({
    resolver: zodResolver(propertyBookingSchema),
    defaultValues: {
      guests: 1,
      checkIn: new Date().toISOString().split('T')[0],
      checkOut: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    },
  });

  const onSubmitBooking = (data: PropertyBookingFormValues) => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      reset();
      onClose();
    }, 4000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white border border-[#E8E8E8] rounded-2xl p-6 sm:p-8 shadow-xl z-10 text-[#3F3F3F] overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-[#3F3F3F] hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close Booking Window"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-extrabold text-[#3F3F3F]">Inquiry Received & Confirmed</h3>
                <p className="text-xs text-[#666666] max-w-xs mx-auto">
                  Our Corporate Concierge will contact you within 15 minutes to confirm rates, availability & corporate GST billing.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#F59A16] text-[11px] font-extrabold mb-2 uppercase tracking-wider">
                    <Building2 className="w-3.5 h-3.5" />
                    PAJASA Instant Corporate Booking Desk
                  </div>
                  <h3 className="text-xl font-extrabold text-[#3F3F3F]">
                    {selectedProperty ? selectedProperty.title : 'Book Executive Serviced Stay'}
                  </h3>
                  {selectedProperty && (
                    <p className="text-xs text-[#F59A16] font-bold mt-1">
                      {selectedProperty.locality}, {selectedProperty.city} • {formatCurrency(selectedProperty.pricePerNight)} / night
                    </p>
                  )}
                </div>

                <form onSubmit={handleSubmit(onSubmitBooking)} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="modal-name" className="block font-bold mb-1">Full Name *</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          id="modal-name"
                          type="text"
                          placeholder="e.g. Vikram Mehta"
                          {...register('fullName')}
                          className="w-full py-2.5 pl-9 pr-3 rounded-xl bg-slate-50 border border-[#E8E8E8] text-[#3F3F3F] focus:outline-none focus:border-[#F59A16]"
                        />
                      </div>
                      {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="modal-email" className="block font-bold mb-1">Corporate Email *</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          id="modal-email"
                          type="email"
                          placeholder="name@company.com"
                          {...register('email')}
                          className="w-full py-2.5 pl-9 pr-3 rounded-xl bg-slate-50 border border-[#E8E8E8] text-[#3F3F3F] focus:outline-none focus:border-[#F59A16]"
                        />
                      </div>
                      {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="modal-phone" className="block font-bold mb-1">Phone Number *</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          id="modal-phone"
                          type="tel"
                          placeholder="+91 98110 29789"
                          {...register('phone')}
                          className="w-full py-2.5 pl-9 pr-3 rounded-xl bg-slate-50 border border-[#E8E8E8] text-[#3F3F3F] focus:outline-none focus:border-[#F59A16]"
                        />
                      </div>
                      {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="modal-company" className="block font-bold mb-1">Company / Organization</label>
                      <input
                        id="modal-company"
                        type="text"
                        placeholder="e.g. Google / Deloitte"
                        {...register('companyName')}
                        className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-[#E8E8E8] text-[#3F3F3F] focus:outline-none focus:border-[#F59A16]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label htmlFor="modal-checkin" className="block font-bold mb-1">Check-in *</label>
                      <input
                        id="modal-checkin"
                        type="date"
                        {...register('checkIn')}
                        className="w-full py-2 px-2.5 rounded-xl bg-slate-50 border border-[#E8E8E8] text-[#3F3F3F] focus:outline-none focus:border-[#F59A16] cursor-pointer"
                      />
                      {errors.checkIn && <p className="text-[10px] text-red-500 mt-0.5">{errors.checkIn.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="modal-checkout" className="block font-bold mb-1">Check-out *</label>
                      <input
                        id="modal-checkout"
                        type="date"
                        {...register('checkOut')}
                        className="w-full py-2 px-2.5 rounded-xl bg-slate-50 border border-[#E8E8E8] text-[#3F3F3F] focus:outline-none focus:border-[#F59A16] cursor-pointer"
                      />
                      {errors.checkOut && <p className="text-[10px] text-red-500 mt-0.5">{errors.checkOut.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="modal-guests" className="block font-bold mb-1">Guests</label>
                      <select
                        id="modal-guests"
                        {...register('guests', { valueAsNumber: true })}
                        className="w-full py-2 px-2.5 rounded-xl bg-slate-50 border border-[#E8E8E8] text-[#3F3F3F] focus:outline-none focus:border-[#F59A16] cursor-pointer font-bold"
                      >
                        <option value={1}>1 Guest</option>
                        <option value={2}>2 Guests</option>
                        <option value={3}>3 Guests</option>
                        <option value={4}>4 Guests</option>
                        <option value={6}>6+ Guests</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="modal-requests" className="block font-bold mb-1">Special Requests / GST Invoicing Details</label>
                    <textarea
                      id="modal-requests"
                      rows={2}
                      placeholder="Airport transfer, daily housekeeping timing, dietary preferences..."
                      {...register('specialRequests')}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-[#E8E8E8] text-[#3F3F3F] focus:outline-none focus:border-[#F59A16]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#F59A16] hover:bg-[#e08a0b] text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Reserve Corporate Stay</span>
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

