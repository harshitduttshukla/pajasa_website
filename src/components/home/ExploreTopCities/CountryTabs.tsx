'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CountryAccommodation } from './types';

interface CountryTabsProps {
  countries: CountryAccommodation[];
  selectedCountryId: string;
  onSelectCountry: (countryId: string) => void;
}

export function CountryTabs({
  countries,
  selectedCountryId,
  onSelectCountry,
}: CountryTabsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check scroll bounds
  const updateScrollButtons = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateScrollButtons();
    const el = scrollContainerRef.current;
    if (!el) return;

    el.addEventListener('scroll', updateScrollButtons, { passive: true });
    window.addEventListener('resize', updateScrollButtons);

    return () => {
      el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [updateScrollButtons, countries]);

  // Scroll active tab into view if needed
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const activeTab = el.querySelector<HTMLElement>('[data-active="true"]');
    if (activeTab) {
      const containerRect = el.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();
      if (tabRect.left < containerRect.left || tabRect.right > containerRect.right) {
        activeTab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [selectedCountryId]);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = Math.max(el.clientWidth * 0.5, 240);
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (index + 1) % countries.length;
      onSelectCountry(countries[nextIndex].id);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (index - 1 + countries.length) % countries.length;
      onSelectCountry(countries[prevIndex].id);
    }
  };

  return (
    <div className="relative flex items-center w-full group/tabrow">
      {/* Scroll Left Button */}
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => handleScroll('left')}
          aria-label="Scroll countries left"
          className="absolute left-0 z-20 -translate-x-1 sm:-translate-x-3 w-9 h-9 flex items-center justify-center rounded-xl bg-white/95 backdrop-blur-xs border border-[#E8E8E8] shadow-md text-[#3F3F3F] hover:text-[#F59A16] hover:border-[#F59A16] transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F59A16]"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
        </button>
      )}

      {/* Tabs Container */}
      <div
        ref={scrollContainerRef}
        role="tablist"
        aria-label="Student accommodation countries"
        className="flex items-center gap-2.5 overflow-x-auto scroll-smooth py-1 px-1 sm:px-2 w-full no-scrollbar select-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {countries.map((country, index) => {
          const isSelected = country.id === selectedCountryId;
          return (
            <button
              key={country.id}
              role="tab"
              id={`country-tab-${country.id}`}
              aria-selected={isSelected}
              aria-controls={`country-panel-${country.id}`}
              data-active={isSelected}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => onSelectCountry(country.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-white border-[#F59A16] text-[#3F3F3F] shadow-[0_2px_8px_rgba(245,154,22,0.18)] ring-1 ring-[#F59A16]'
                  : 'bg-white/80 hover:bg-white border-[#E8E8E8] text-[#555555] hover:text-[#3F3F3F] hover:border-slate-300'
              }`}
            >
              <span className="text-base sm:text-lg leading-none select-none" aria-hidden="true">
                {country.flag}
              </span>
              <span className="whitespace-nowrap font-extrabold tracking-tight">
                {country.name}
              </span>
              {isSelected && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59A16] animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* Scroll Right Button */}
      {canScrollRight && (
        <button
          type="button"
          onClick={() => handleScroll('right')}
          aria-label="Scroll countries right"
          className="absolute right-0 z-20 translate-x-1 sm:translate-x-3 w-9 h-9 flex items-center justify-center rounded-xl bg-white/95 backdrop-blur-xs border border-[#E8E8E8] shadow-md text-[#3F3F3F] hover:text-[#F59A16] hover:border-[#F59A16] transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F59A16]"
        >
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      )}
    </div>
  );
}
