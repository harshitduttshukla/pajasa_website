'use client';

import React from 'react';
import { MapPin, Navigation, Train, Plane, Building2, ShoppingBag } from 'lucide-react';
import { Property } from '@/types';

interface PropertyMapProps {
  property: Property;
}

export function PropertyMap({ property }: PropertyMapProps) {
  const getIconForType = (type: string) => {
    switch (type) {
      case 'metro': return <Train className="w-4 h-4 text-sky-400" />;
      case 'airport': return <Plane className="w-4 h-4 text-emerald-400" />;
      case 'business': return <Building2 className="w-4 h-4 text-[#F59A16]" />;
      default: return <ShoppingBag className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#3F3F3F] flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#F59A16]" />
            Location & Transit Highlights
          </h2>
          <p className="text-xs text-slate-500 mt-1">{property.address}</p>
        </div>
      </div>

      {/* Interactive Styled Map View Box */}
      <div className="relative w-full h-80 rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center group shadow-xl">
        {/* Mock Map Background Grid */}
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Decorative Roads & River SVG Pattern */}
        <svg className="absolute inset-0 w-full h-full stroke-slate-800/80 fill-none" strokeWidth="3">
          <path d="M 0 100 Q 200 150 400 80 T 800 200" />
          <path d="M 100 0 Q 300 300 500 400" strokeWidth="6" stroke="#1e293b" />
          <path d="M 0 300 C 300 100 500 350 900 250" strokeWidth="8" stroke="#0f172a" />
        </svg>

        {/* Center Location Pin */}
        <div className="relative z-10 text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-[#F59A16]/20 border-2 border-[#F59A16] text-[#F59A16] flex items-center justify-center mx-auto shadow-2xl animate-bounce">
            <MapPin className="w-6 h-6 fill-[#F59A16]/30" />
          </div>
          <div className="px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-xs font-bold text-white shadow-lg backdrop-blur-md">
            {property.title}
          </div>
        </div>

        {/* Map Watermark CTA */}
        <a
          href={`https://maps.google.com/?q=${property.locationCoords.lat},${property.locationCoords.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-4 z-10 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-lg"
        >
          <Navigation className="w-3.5 h-3.5 text-[#F59A16]" />
          <span>Open in Google Maps</span>
        </a>
      </div>

      {/* Nearby Places Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {property.nearbyPlaces.map((place, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/80 flex items-center justify-between text-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center shrink-0">
                {getIconForType(place.type)}
              </div>
              <span className="font-semibold text-slate-200">{place.name}</span>
            </div>

            <span className="px-2.5 py-1 rounded-full bg-slate-800 text-[11px] text-[#F59A16] font-bold shrink-0">
              {place.distance}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
