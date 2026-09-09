'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bath, Bed, Heart, MapPin, Users } from 'lucide-react';
import { Property } from '@/types';
import { formatCurrency } from '@/lib/utils';

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

  const defaultBadge = badgeText || (property.featured ? 'POPULAR' : 'PREMIUM');

  return (
    <article className="group bg-white border border-[#E8E8E8] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        {/* Top Image Container (16:9 Ratio) */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <img
            src={property.images[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'}
            alt={property.title}
            className="w-full h-full object-cover img-zoom"
          />

          {/* Category Badge Top Left */}
          <div className="absolute top-3 left-3 z-10">
            <span className="px-3 py-1 rounded-md bg-[#F59A16] text-white text-[10px] font-extrabold tracking-wider uppercase shadow-xs">
              {defaultBadge}
            </span>
          </div>

          {/* Heart Wishlist Icon Top Right */}
          <button
            onClick={toggleWishlist}
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/70 hover:bg-white text-[#3F3F3F] backdrop-blur-xs transition-all shadow-xs"
            aria-label={isWishlisted ? 'Remove from Saved' : 'Save Property'}
          >
            <Heart
              className={`w-4 h-4 ${isWishlisted ? 'fill-[#F59A16] text-[#F59A16]' : 'text-slate-600'}`}
              strokeWidth={1.75}
            />
          </button>
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-2.5">
          {/* Title */}
          <Link href={`/properties/${property.slug}`} className="block">
            <h3 className="text-base font-extrabold text-[#3F3F3F] hover:text-[#F59A16] transition-colors line-clamp-1">
              {property.title}
            </h3>
          </Link>

          {/* Location */}
          <div className="flex items-center gap-1 text-xs text-[#666666] font-medium">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" strokeWidth={1.5} />
            <span className="truncate">{property.locality}, {property.city}</span>
          </div>

          {/* Price */}
          <div className="pt-1 flex items-baseline gap-1">
            <span className="text-lg font-extrabold text-[#F59A16]">
              {formatCurrency(property.pricePerNight)}
            </span>
            <span className="text-xs text-[#666666] font-medium">/ Night</span>
          </div>
        </div>
      </div>

      {/* Footer Specs Line */}
      <div className="px-4 py-3 border-t border-[#E8E8E8] bg-[#FAFAF8]/50 flex items-center justify-between text-xs text-[#666666] font-semibold">
        <span className="flex items-center gap-1.5">
          <Bed className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.5} />
          {property.bedrooms} Bed
        </span>
        <span className="text-slate-300">|</span>
        <span className="flex items-center gap-1.5">
          <Bath className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.5} />
          {property.bathrooms} Bath
        </span>
        <span className="text-slate-300">|</span>
        <span className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.5} />
          {property.maxGuests} Guests
        </span>
      </div>
    </article>
  );
}

