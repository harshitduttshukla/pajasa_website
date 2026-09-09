'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'How does PAJASA issue 100% GST tax credit invoices for corporate bookings?',
    answer: 'PAJASA Stay Solutions Pvt Ltd provides valid B2B tax invoices registered under GSTIN with exact HSN/SAC codes for accommodation services. Corporate travel desks can claim 100% input tax credit (ITC) for business stays.',
  },
  {
    question: 'What is the Caretaker Policy in PAJASA Serviced Apartments?',
    answer: 'Every PAJASA serviced apartment features a dedicated single caretaker who manages housekeeping, breakfast preparation, and key handovers. Having only one caretaker minimizes external touchpoints and ensures 100% WHO hygiene standards.',
  },
  {
    question: 'Are there long-stay corporate discounts for deployments over 30 days?',
    answer: 'Yes! We offer up to 40% monthly corporate tariff discounts for extended stays (30+ days). Our corporate sales desk provides custom SLA contracts and credit terms for corporate clients.',
  },
  {
    question: 'Which metro business corridors are covered by PAJASA?',
    answer: 'We operate fully furnished executive serviced apartments in Mumbai (Powai, BKC, Lower Parel), Pune (Kalyani Nagar, Balewadi, Baner), Gurugram (DLF Cyber City), Bengaluru (Whitefield, Indiranagar), Hyderabad (HITEC City), New Delhi (Aerocity), Chennai, Noida, and Kolkata.',
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-white text-[#3F3F3F] border-t border-[#E8E8E8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#F59A16] text-xs font-extrabold tracking-wider uppercase inline-flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            ENTERPRISE FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#3F3F3F]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] font-normal">
            Everything you need to know about booking corporate serviced stays with PAJASA.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="bg-white border border-[#E8E8E8] rounded-2xl overflow-hidden shadow-xs transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-extrabold text-sm sm:text-base text-[#3F3F3F] cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#F59A16] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-[#666666] leading-relaxed border-t border-[#E8E8E8] pt-3">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

