'use client';

import React from 'react';
import { Armchair, Headphones, MapPin, Sparkles, Wifi } from 'lucide-react';

export function AmenitiesStrip() {
  const amenities = [
    {
      icon: Armchair,
      title: 'Fully Furnished',
      description: 'Move in and feel at home.',
    },
    {
      icon: MapPin,
      title: 'Prime Locations',
      description: 'Stay in the heart of the city.',
    },
    {
      icon: Sparkles,
      title: 'Daily Housekeeping',
      description: 'Clean spaces, happy stays.',
    },
    {
      icon: Wifi,
      title: 'High-Speed WiFi',
      description: 'Stay connected, always.',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: "We're here for you anytime.",
    },
  ];

  return (
    <section className="py-8 bg-white border-y border-[#E8E8E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-0 items-center">
          {amenities.map((item, idx) => {
            const Icon = item.icon;
            const isLast = idx === amenities.length - 1;
            return (
              <div
                key={item.title}
                className={`flex items-start gap-3 px-2 lg:px-4 ${
                  !isLast ? 'lg:border-r lg:border-[#E8E8E8]' : ''
                }`}
              >
                <div className="p-2 rounded-lg bg-orange-50 text-[#F59A16] shrink-0">
                  <Icon className="w-5 h-5 text-[#F59A16]" strokeWidth={1.75} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-[#3F3F3F]">
                    {item.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#666666] font-normal leading-tight mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
