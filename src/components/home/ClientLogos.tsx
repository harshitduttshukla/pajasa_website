'use client';

import React from 'react';
import { CLIENT_LOGOS } from '@/data/mockData';

export function ClientLogos() {
  return (
    <section className="py-16 bg-white border-t border-[#E8E8E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#3F3F3F] text-center">
          Trusted by Industry Leaders
        </h2>

        <div className="relative overflow-hidden group [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max gap-6 animate-[logo-marquee_40s_linear_infinite] group-hover:[animation-play-state:paused]">
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((client, idx) => (
              <div
                key={idx}
                aria-hidden={idx >= CLIENT_LOGOS.length}
                className="p-3 rounded-2xl bg-white border border-[#E8E8E8] hover:border-[#F59A16] transition-all flex items-center justify-center w-28 h-28 shrink-0 shadow-xs hover:shadow-sm"
              >
                <img loading="lazy" decoding="async"
                  src={client.image}
                  alt={idx < CLIENT_LOGOS.length ? `PAJASA Corporate Partner - ${client.name}` : ''}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
        <style>{`@keyframes logo-marquee { from { transform: translateX(0); } to { transform: translateX(calc(-50% - 12px)); } }`}</style>
      </div>
    </section>
  );
}

