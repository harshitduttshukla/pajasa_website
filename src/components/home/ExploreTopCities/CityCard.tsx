'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Building2, ArrowUpRight } from 'lucide-react';
import { CityAccommodation } from './types';

interface CityCardProps {
  city: CityAccommodation;
}

export function CityCard({ city }: CityCardProps) {
  const [imgSrc, setImgSrc] = useState(city.image);
  const [hasError, setHasError] = useState(false);

  // Direct link to PAJASA city route, e.g. /in/mumbai/ or /in/pune/
  const targetHref = city.slug.startsWith('/')
    ? city.slug
    : `/${city.countryCode}/${city.slug}`;

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
      // High-reliability PAJASA fallback
      setImgSrc('https://dcdza1qr0mu11.cloudfront.net/uploads/wp/2025/05/Service-Apartment-in-Mumbai-by-PAJASA-1170x921.webp.webp');
    }
  };

  return (
    <Link
      href={targetHref}
      className="group relative block w-full h-64 sm:h-72 lg:h-80 rounded-2xl overflow-hidden border border-[#E8E8E8] shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 select-none bg-slate-100"
      aria-label={`View student accommodations in ${city.name}`}
    >
      {/* City Background Image */}
      <Image
        src={imgSrc}
        alt={`Student accommodation in ${city.name}`}
        fill
        sizes="(max-width: 640px) 72vw, (max-width: 768px) 46vw, (max-width: 1024px) 31vw, 20vw"
        unoptimized
        onError={handleImageError}
        className="object-cover img-zoom group-hover:scale-108 transition-transform duration-700 ease-out"
      />

      {/* Multi-stage Smooth Gradient Overlay (matches reference photo visual depth) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none transition-opacity duration-300 group-hover:from-black/95 group-hover:via-black/55" />

      {/* Top Floating Badge (arrow indicator) */}
      <div className="absolute top-3.5 right-3.5 z-10 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
        <span className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center text-[#F59A16] shadow-md">
          <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
        </span>
      </div>

      {/* Bottom Content Area */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-10 space-y-1">
        <h3
          className="text-lg sm:text-xl font-black !text-white tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] group-hover:!text-[#F59A16] transition-colors duration-200"
          style={{ color: '#ffffff' }}
        >
          {city.name}
        </h3>

        <div
          className="flex items-center gap-1.5 text-xs !text-slate-200 font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
          style={{ color: '#e2e8f0' }}
        >
          <Building2 className="w-3.5 h-3.5 text-[#F59A16] shrink-0" />
          <span>{city.propertyCount} properties</span>
        </div>
      </div>
    </Link>
  );
}
