'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Info, Star } from 'lucide-react';
import { Property } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { getImageUrl } from '@/lib/api';

interface PropertyCardProps {
  property: Property;
  badgeText?: string;
  onBookNow?: (property: Property) => void;
}

export function PropertyCard({ property, badgeText, onBookNow }: PropertyCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(property.isWishlisted || false);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const cardImage = getImageUrl(property.images?.[0]);
  const href = property.href || `/properties/${property.slug}`;

  const rating = Math.round(property.rating || 4);

  return (
    <article className="group relative cursor-pointer bg-white border border-[#E8E8E8] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col h-full">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img loading="lazy" decoding="async"
          src={cardImage}
          alt={property.imageAlts?.[property.images?.[0]] ?? property.title}
          className="w-full h-full object-cover img-zoom"
        />
        <button
          onClick={toggleWishlist}
          className="absolute top-3 right-3 z-10 p-1 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] transition-transform hover:scale-110"
          aria-label={isWishlisted ? 'Remove from Saved' : 'Save Property'}
        >
          <Heart className={`w-7 h-7 ${isWishlisted ? 'fill-[#F59A16] text-[#F59A16]' : ''}`} strokeWidth={2} />
        </button>
      </div>

      {/* Body */}
      <div className="p-4 space-y-2 flex-1 flex flex-col">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-sm text-[#666666] truncate">{property.locality || property.city}</span>
          <span className="text-sm text-[#3F3F3F] font-bold whitespace-nowrap">
            From {formatCurrency(property.pricePerNight)} <span className="font-semibold">Per Night</span>
          </span>
        </div>

        <Link href={href} className="block after:absolute after:inset-0">
          <h3 className="text-lg font-bold text-[#3F3F3F] group-hover:text-[#F59A16] transition-colors line-clamp-1">
            {property.title}
          </h3>
        </Link>

        <div className="flex items-center gap-1.5 pt-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < rating ? 'fill-[#F59A16] text-[#F59A16]' : 'text-slate-300'}`} strokeWidth={1.5} />
          ))}
          <Info className="w-4 h-4 text-slate-400 ml-1" strokeWidth={1.75} />
        </div>
      </div>
    </article>
  );
}
