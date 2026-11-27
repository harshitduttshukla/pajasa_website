'use client';

import React from 'react';
import Link from 'next/link';
import { Bath, Check, Home, MapPin, Users } from 'lucide-react';
import { Property } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { getImageUrl } from '@/lib/api';

interface PropertyCardProps {
  property: Property;
  badgeText?: string;
  onBookNow?: (property: Property) => void;
}

export function PropertyCard({ property, badgeText, onBookNow }: PropertyCardProps) {
  const cardImage = getImageUrl(property.images?.[0]);
  const href = property.href || `/properties/${property.slug}`;
  const typeLabel =
    badgeText && !['POPULAR', 'BEST VALUE', 'PREMIUM', 'LUXURY'].includes(badgeText)
      ? badgeText
      : !property.bedrooms || /studio/i.test(property.title)
        ? 'Studio'
        : `${property.bedrooms} BHK`;
  const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? '' : 's'}`;

  const handleEnquire = (e: React.MouseEvent) => {
    if (onBookNow) {
      e.preventDefault();
      e.stopPropagation();
      onBookNow(property);
    }
  };

  return (
    <article className="group relative bg-white border border-[#E8E8E8] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col h-full">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img loading="lazy" decoding="async"
          src={cardImage}
          alt={property.imageAlts?.[property.images?.[0]] ?? property.title}
          className="w-full h-full object-cover img-zoom"
        />
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 pointer-events-none">
          <span className="px-2.5 py-1 rounded-md bg-[#1f2937] text-white text-xs font-bold">{typeLabel}</span>
          <span className="px-2.5 py-1 rounded-md bg-emerald-600 text-white text-xs font-bold inline-flex items-center gap-1">
            <Check className="w-3.5 h-3.5" strokeWidth={2.5} /> Verified
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 space-y-2 flex-1 flex flex-col">
        <div className="flex items-center gap-1.5 text-sm font-semibold text-[#F59A16]">
          <MapPin className="w-4 h-4 shrink-0" strokeWidth={2} />
          <span className="truncate">{property.locality || property.city}</span>
        </div>

        <Link href={href} className="block after:absolute after:inset-0">
          <h3 className="text-lg font-bold text-[#1f2937] group-hover:text-[#F59A16] transition-colors line-clamp-1">
            {property.title}
          </h3>
        </Link>

        <div className="flex items-center justify-between gap-3 pt-2 mt-auto">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-[#1f2937]">{formatCurrency(property.pricePerNight)}</span>
            <span className="text-sm text-[#666666] whitespace-nowrap">/ per night</span>
          </div>
          <Link
            href={href}
            onClick={handleEnquire}
            className="relative z-10 text-sm font-bold text-[#F59A16] underline underline-offset-4 hover:text-[#e08a0b] whitespace-nowrap"
          >
            Enquire &rarr;
          </Link>
        </div>
      </div>

      {/* Specs */}
      <div className="px-5 py-3.5 border-t border-[#E8E8E8] bg-[#FAFAF8] grid grid-cols-3 divide-x divide-[#E8E8E8] text-xs sm:text-sm text-[#3F3F3F] font-medium">
        <span className="flex items-center justify-center gap-1.5 whitespace-nowrap px-1">
          <Home className="w-4 h-4 shrink-0 text-slate-500" strokeWidth={1.5} />
          {plural(property.bedrooms || 1, 'Bedroom')}
        </span>
        <span className="flex items-center justify-center gap-1.5 whitespace-nowrap px-1">
          <Bath className="w-4 h-4 shrink-0 text-slate-500" strokeWidth={1.5} />
          {plural(property.bathrooms || 1, 'Bath')}
        </span>
        <span className="flex items-center justify-center gap-1.5 whitespace-nowrap px-1">
          <Users className="w-4 h-4 shrink-0 text-slate-500" strokeWidth={1.5} />
          {plural(property.maxGuests || 2, 'Guest')}
        </span>
      </div>
    </article>
  );
}
