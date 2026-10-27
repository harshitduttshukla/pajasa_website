'use client';

import React from 'react';
import { CLIENT_LOGOS } from '@/data/mockData';

export function ClientLogos() {
  return (
    <section className="py-16 bg-white border-t border-[#E8E8E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h2 className="text-xl sm:text-2xl font-extrabold text-center text-[#3F3F3F] tracking-tight">
          Trusted by Industry Leaders
        </h2>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 items-center justify-items-center">
          {CLIENT_LOGOS.map((client, idx) => (
            <div
              key={idx}
              className="p-3 rounded-2xl bg-white border border-[#E8E8E8] hover:border-[#F59A16] transition-all flex items-center justify-center w-28 h-28 shadow-xs hover:shadow-sm"
            >
              <img loading="lazy" decoding="async"
                src={client.image}
                alt={`PAJASA Corporate Partner - ${client.name}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

