'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, Check, ChevronDown, MapPin, Search } from 'lucide-react';
import { CITIES_DATA } from '@/data/mockData';

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/\(.*?\)/g, '')
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

type Option = { value: string; label: string };

function Dropdown({
  label,
  placeholder,
  value,
  options,
  onChange,
  disabled,
  icon: Icon,
}: {
  label: string;
  placeholder: string;
  value: string;
  options: Option[];
  onChange: (v: string) => void;
  disabled?: boolean;
  icon: React.ElementType;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative flex-1">
      <button
        type="button"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
        className="w-full flex items-center gap-3 px-4 py-2 text-left cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Icon className="w-5 h-5 text-[#3F3F3F] shrink-0" strokeWidth={1.75} />
        <span className={`flex-1 truncate text-sm font-bold ${selected ? 'text-[#3F3F3F]' : 'text-[#666666]'}`}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-[#666666] shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full mt-3 z-50 max-h-72 overflow-y-auto rounded-2xl bg-white border border-[#E8E8E8] shadow-xl py-2"
        >
          {[{ value: '', label: placeholder }, ...options].map((o) => {
            const active = o.value === value;
            return (
              <li key={o.value || '__all'}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm text-left transition-colors cursor-pointer ${
                    active
                      ? 'bg-orange-50 text-[#F59A16] font-bold'
                      : 'text-[#3F3F3F] font-medium hover:bg-orange-50 hover:text-[#F59A16]'
                  }`}
                >
                  {o.label}
                  {active && <Check className="w-4 h-4" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

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
        <div className="flex-1 flex sm:border-r sm:border-[#E8E8E8]">
          <Dropdown
            label="Select City"
            placeholder="Select City"
            icon={MapPin}
            value={citySlug}
            options={CITIES_DATA.map((c) => ({ value: c.slug, label: c.name }))}
            onChange={(v) => {
              setCitySlug(v);
              setLocation('');
            }}
          />
        </div>

        {/* AREA */}
        <div className="flex-1 flex">
          <Dropdown
            label="Select Area"
            placeholder={citySlug ? 'All Areas' : 'Select Area'}
            icon={Building2}
            value={location}
            options={localities.map((l) => ({ value: l, label: l }))}
            onChange={setLocation}
            disabled={!citySlug}
          />
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
