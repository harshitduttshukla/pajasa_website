'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin, Search, Users } from 'lucide-react';
import { CITIES_DATA } from '@/data/mockData';

export function SearchCard() {
  const router = useRouter();
  const [city, setCity] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('1');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    if (guests) params.set('guests', guests);

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-xl border border-[#E8E8E8] text-[#3F3F3F]">
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-0 items-center">
          
          {/* LOCATION Field */}
          <div className="lg:col-span-3 px-4 py-1.5 text-left lg:border-r lg:border-[#E8E8E8]">
            <label htmlFor="search-location" className="block text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
              LOCATION
            </label>
            <div className="flex items-center gap-2 mt-1">
              <MapPin className="w-4 h-4 text-[#3F3F3F] shrink-0" strokeWidth={1.75} />
              <select
                id="search-location"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-transparent text-xs font-bold text-[#3F3F3F] focus:outline-none cursor-pointer border-none"
              >
                <option value="">Select Location</option>
                {CITIES_DATA.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* CHECK-IN Field */}
          <div className="lg:col-span-3 px-4 py-1.5 text-left lg:border-r lg:border-[#E8E8E8]">
            <label htmlFor="search-checkin" className="block text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
              CHECK-IN
            </label>
            <div className="flex items-center gap-2 mt-1">
              <Calendar className="w-4 h-4 text-[#3F3F3F] shrink-0" strokeWidth={1.75} />
              <input
                id="search-checkin"
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-transparent text-xs font-bold text-[#3F3F3F] focus:outline-none cursor-pointer"
                placeholder="Select Date"
              />
            </div>
          </div>

          {/* CHECK-OUT Field */}
          <div className="lg:col-span-3 px-4 py-1.5 text-left lg:border-r lg:border-[#E8E8E8]">
            <label htmlFor="search-checkout" className="block text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
              CHECK-OUT
            </label>
            <div className="flex items-center gap-2 mt-1">
              <Calendar className="w-4 h-4 text-[#3F3F3F] shrink-0" strokeWidth={1.75} />
              <input
                id="search-checkout"
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-transparent text-xs font-bold text-[#3F3F3F] focus:outline-none cursor-pointer"
                placeholder="Select Date"
              />
            </div>
          </div>

          {/* GUESTS Field */}
          <div className="lg:col-span-3 lg:col-span-2 px-4 py-1.5 text-left">
            <label htmlFor="search-guests" className="block text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
              GUESTS
            </label>
            <div className="flex items-center gap-2 mt-1">
              <Users className="w-4 h-4 text-[#3F3F3F] shrink-0" strokeWidth={1.75} />
              <select
                id="search-guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-transparent text-xs font-bold text-[#3F3F3F] focus:outline-none cursor-pointer border-none"
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4+ Guests</option>
              </select>
            </div>
          </div>

          {/* SEARCH APARTMENTS CTA Button */}
          <div className="lg:col-span-1 lg:col-span-12 lg:col-start-[#] flex justify-end">
            {/* On desktop this spans nicely or fits inside the 12-col grid */}
          </div>

        </form>

        {/* Desktop grid layout adjustment */}
        <div className="mt-3 lg:mt-0 flex justify-end lg:-mt-12 lg:pr-2 pointer-events-auto">
          <button
            onClick={handleSearch}
            type="button"
            className="w-full lg:w-auto px-6 py-3.5 rounded-xl bg-[#F59A16] hover:bg-[#e08a0b] text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
          >
            <span>SEARCH APARTMENTS</span>
          </button>
        </div>

      </div>
    </div>
  );
}

