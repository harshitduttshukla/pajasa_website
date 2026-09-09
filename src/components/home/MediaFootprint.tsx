'use client';

import React from 'react';
import { MEDIA_LOGOS } from '@/data/mockData';

export function MediaFootprint() {
  return (
    <section className="py-16 bg-[#FAFAF8] text-[#3F3F3F] border-t border-[#E8E8E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h2 className="text-xl sm:text-2xl font-extrabold text-center text-[#3F3F3F] tracking-tight">
          Our Media Footprint
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 items-center justify-items-center">
          {MEDIA_LOGOS.map((media, idx) => (
            <a
              key={idx}
              href={media.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl bg-white border border-[#E8E8E8] hover:border-[#F59A16] hover:scale-105 transition-all flex items-center justify-center w-28 h-28 shadow-xs"
            >
              <img
                src={media.image}
                alt={`PAJASA Media Feature - ${media.name}`}
                className="max-w-full max-h-full object-contain rounded-xl"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

