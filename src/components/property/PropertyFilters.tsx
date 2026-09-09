'use client';

import React from 'react';
import { RotateCcw, Search, SlidersHorizontal } from 'lucide-react';
import { CITIES_DATA } from '@/data/mockData';

interface PropertyFiltersProps {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  selectedBedrooms: number | null;
  setSelectedBedrooms: (beds: number | null) => void;
  onReset: () => void;
}

export function PropertyFilters({
  selectedCity,
  setSelectedCity,
  searchTerm,
  setSearchTerm,
  maxPrice,
  setMaxPrice,
  selectedBedrooms,
  setSelectedBedrooms,
  onReset,
}: PropertyFiltersProps) {
  return (
    <div className="bg-white border border-[#E8E8E8] rounded-2xl p-6 space-y-6 text-[#3F3F3F] shadow-xs">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E8E8E8]">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#F59A16]" />
          <h3 className="font-extrabold text-sm text-[#3F3F3F]">Filter Residences</h3>
        </div>

        <button
          onClick={onReset}
          className="text-xs font-semibold text-slate-400 hover:text-[#F59A16] flex items-center gap-1 transition-colors cursor-pointer"
          title="Reset Filters"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Search Query Input */}
      <div className="space-y-1.5">
        <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-wider">Keyword Search</label>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="e.g. BKC, Cyber City, Duplex..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 pl-9 pr-3 rounded-xl bg-slate-50 border border-[#E8E8E8] text-xs text-[#3F3F3F] placeholder:text-slate-400 focus:outline-none focus:border-[#F59A16]"
          />
        </div>
      </div>

      {/* City Selector */}
      <div className="space-y-1.5">
        <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-wider">Destination City</label>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-[#E8E8E8] text-xs font-bold text-[#3F3F3F] focus:outline-none focus:border-[#F59A16] cursor-pointer"
        >
          <option value="">All Cities</option>
          {CITIES_DATA.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-extrabold text-slate-400 uppercase tracking-wider">Max Nightly Rate</span>
          <span className="font-extrabold text-[#F59A16]">₹{maxPrice.toLocaleString('en-IN')}</span>
        </div>
        <input
          type="range"
          min="2500"
          max="10000"
          step="500"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#F59A16]"
        />
      </div>

      {/* Bedrooms Selector */}
      <div className="space-y-2">
        <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-wider">Bedrooms</label>
        <div className="grid grid-cols-4 gap-2">
          {[null, 1, 2, 3].map((beds) => (
            <button
              key={beds === null ? 'any' : beds}
              onClick={() => setSelectedBedrooms(beds)}
              className={`py-2 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                selectedBedrooms === beds
                  ? 'bg-[#F59A16] text-white border-[#F59A16] shadow-xs'
                  : 'bg-slate-50 text-[#3F3F3F] border-[#E8E8E8] hover:bg-orange-50 hover:text-[#F59A16]'
              }`}
            >
              {beds === null ? 'Any' : `${beds} BHK`}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}

