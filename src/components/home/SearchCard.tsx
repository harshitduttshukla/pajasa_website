'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Building2, MapPin, Search } from 'lucide-react';
import { CITIES_DATA } from '@/data/mockData';

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/\(.*?\)/g, '')
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export function SearchCard() {
  const router = useRouter();
  const [citySlug, setCitySlug] = useState('');
  const [location, setLocation] = useState('');

  const selectedCity = CITIES_DATA.find((c) => c.slug === citySlug);
  const localities = selectedCity?.popularLocalities ?? [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!citySlug) return;
    router.push(location ? `/in/${citySlug}/${slugify(location)}/` : `/in/${citySlug}/`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form
        onSubmit={handleSearch}
        className="bg-white rounded-2xl sm:rounded-full p-3 sm:p-2.5 shadow-xl border border-[#E8E8E8] text-[#3F3F3F] flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
      >
        {/* CITY */}
        <div className="flex-1 flex items-center gap-3 px-4 py-2 sm:border-r sm:border-[#E8E8E8]">
          <MapPin className="w-5 h-5 text-[#3F3F3F] shrink-0" strokeWidth={1.75} />
          <select
            aria-label="Select City"
            value={citySlug}
            onChange={(e) => {
              setCitySlug(e.target.value);
              setLocation('');
            }}
            className="w-full bg-transparent text-sm font-bold text-[#3F3F3F] focus:outline-none cursor-pointer border-none"
          >
            <option value="">Select City</option>
            {CITIES_DATA.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* LOCATION */}
        <div className="flex-1 flex items-center gap-3 px-4 py-2">
          <Building2 className="w-5 h-5 text-[#3F3F3F] shrink-0" strokeWidth={1.75} />
          <select
            aria-label="Select Area"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            disabled={!citySlug}
            className="w-full bg-transparent text-sm font-bold text-[#3F3F3F] focus:outline-none cursor-pointer border-none disabled:cursor-not-allowed disabled:opacity-60"
          >
            <option value="">{citySlug ? 'All Areas' : 'Select Area'}</option>
            {localities.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="sm:w-56 px-6 py-3.5 rounded-full bg-[#F59A16] hover:bg-[#e08a0b] text-[#1f1f1f] font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Search className="w-4 h-4" />
          <span>Search</span>
        </button>
      </form>
    </div>
  );
}
