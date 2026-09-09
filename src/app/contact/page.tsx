'use client';

import React, { useState } from 'react';
import { CheckCircle2, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div className="pt-36 pb-24 bg-[#FAFAF8] text-[#3F3F3F] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Banner */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#F59A16] text-xs font-extrabold uppercase tracking-wider">
            <Mail className="w-4 h-4 text-[#F59A16]" />
            <span>Dedicated Concierge Desk</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#3F3F3F] tracking-tight">
            Get in Touch with <span className="text-[#F59A16]">PAJASA Apartments</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
            Have questions regarding executive stays, group bookings, or corporate GST billing? Our team is available 24/7.
          </p>
        </div>

        {/* Contact Info Cards + Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-[#E8E8E8] space-y-4 shadow-xs">
              <h3 className="text-base font-extrabold text-[#3F3F3F] border-b border-[#E8E8E8] pb-3">Corporate Headquarters</h3>
              
              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#F59A16] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold text-[#3F3F3F] block">Executive Headquarters</span>
                    <span className="text-[#666666]">PAJASA Stay Solutions Pvt Ltd, Mumbai, Maharashtra, India</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#F59A16] shrink-0" />
                  <div>
                    <span className="font-extrabold text-[#3F3F3F] block">Direct Desk</span>
                    <a href="tel:+919811029789" className="text-[#666666] hover:text-[#F59A16] transition-colors font-bold">+91 98110 29789</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-extrabold text-[#3F3F3F] block">WhatsApp Concierge</span>
                    <a href="https://api.whatsapp.com/send?phone=919811029789" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold hover:underline">
                      Chat Now (+91 98110 29789)
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#F59A16] shrink-0" />
                  <div>
                    <span className="font-extrabold text-[#3F3F3F] block">Email Support</span>
                    <a href="mailto:info@pajasaapartments.com" className="text-[#666666] hover:text-[#F59A16] transition-colors font-bold">info@pajasaapartments.com</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Regional Hub Offices */}
            <div className="p-6 rounded-2xl bg-white border border-[#E8E8E8] space-y-3 text-xs shadow-xs">
              <h4 className="font-extrabold text-[#F59A16] uppercase tracking-wider">Regional Business Hubs</h4>
              <ul className="space-y-2 text-[#666666]">
                <li>• <strong>Gurugram:</strong> Cyber City & Golf Course Road Corridor</li>
                <li>• <strong>Mumbai:</strong> Powai, BKC & Lower Parel Business Hubs</li>
                <li>• <strong>Bengaluru:</strong> Whitefield & Electronic City Corporate Parks</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-white border border-[#E8E8E8] space-y-6 shadow-xs">
            <h3 className="text-xl font-extrabold text-[#3F3F3F]">Send Us a Direct Message</h3>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-3 font-bold">
                <CheckCircle2 className="w-6 h-6 shrink-0 text-emerald-600" />
                <span>Message delivered! Our corporate concierge will respond to your email within 30 minutes.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#3F3F3F] font-bold mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full py-3 px-4 rounded-xl bg-slate-50 border border-[#E8E8E8] text-[#3F3F3F] focus:outline-none focus:border-[#F59A16]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#3F3F3F] font-bold mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full py-3 px-4 rounded-xl bg-slate-50 border border-[#E8E8E8] text-[#3F3F3F] focus:outline-none focus:border-[#F59A16]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#3F3F3F] font-bold mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 98110 29789"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full py-3 px-4 rounded-xl bg-slate-50 border border-[#E8E8E8] text-[#3F3F3F] focus:outline-none focus:border-[#F59A16]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#3F3F3F] font-bold mb-1">Subject</label>
                    <input
                      type="text"
                      placeholder="e.g. Long stay inquiry for Mumbai"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full py-3 px-4 rounded-xl bg-slate-50 border border-[#E8E8E8] text-[#3F3F3F] focus:outline-none focus:border-[#F59A16]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#3F3F3F] font-bold mb-1">Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us how we can assist your corporate stay..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-4 rounded-xl bg-slate-50 border border-[#E8E8E8] text-[#3F3F3F] focus:outline-none focus:border-[#F59A16]"
                  />
                </div>

                <button
                  type="submit"
                  className="py-3.5 px-6 rounded-xl bg-[#F59A16] hover:bg-[#e08a0b] text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

