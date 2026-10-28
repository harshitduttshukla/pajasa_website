'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, GraduationCap } from 'lucide-react';
import { STUDENT_CITIES_DATA } from './cityData';
import { CountryTabs } from './CountryTabs';
import { CityCard } from './CityCard';

export function ExploreTopCities() {
  const [selectedCountryId, setSelectedCountryId] = useState('all-india');
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Active country/region data
  const selectedCountry = STUDENT_CITIES_DATA.find((c) => c.id === selectedCountryId) || STUDENT_CITIES_DATA[0];

  // Update carousel scroll boundaries
  const updateCarouselBounds = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  }, []);

  useEffect(() => {
    updateCarouselBounds();
    const el = carouselRef.current;
    if (!el) return;

    el.addEventListener('scroll', updateCarouselBounds, { passive: true });
    window.addEventListener('resize', updateCarouselBounds);

    return () => {
      el.removeEventListener('scroll', updateCarouselBounds);
      window.removeEventListener('resize', updateCarouselBounds);
    };
  }, [updateCarouselBounds, selectedCountryId]);

  // Reset scroll to start when country changes
  const handleSelectCountry = (countryId: string) => {
    if (countryId === selectedCountryId) return;
    setSelectedCountryId(countryId);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  // Carousel navigation click handlers
  const scrollCarousel = (direction: 'left' | 'right') => {
    const el = carouselRef.current;
    if (!el) return;
    // Scroll roughly 75% of view width to advance a set of cards
    const scrollAmount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="explore-top-cities"
      aria-label="Explore student accommodations by city"
      className="py-16 sm:py-20 bg-[#FAFAF8] text-[#3F3F3F] border-t border-[#E8E8E8] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#F59A16] text-xs font-extrabold tracking-wider uppercase shadow-2xs">
            <GraduationCap className="w-4 h-4 text-[#F59A16]" />
            <span>INDIA STUDENT & EXECUTIVE HUBS</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#3F3F3F]">
            Explore Student Accommodation by City
          </h2>

          <p className="text-xs sm:text-sm text-[#666666] font-normal leading-relaxed">
            Discover comfortable and convenient student accommodation in popular destinations
          </p>
        </div>

        {/* Horizontally Scrollable Country Tabs */}
        <div className="pt-2">
          <CountryTabs
            countries={STUDENT_CITIES_DATA}
            selectedCountryId={selectedCountryId}
            onSelectCountry={handleSelectCountry}
          />
        </div>

        {/* Carousel Container with Edge Navigation Buttons */}
        <div className="relative group/carousel px-1">
          {/* Edge Left Arrow Button (Desktop & Tablet) */}
          <button
            type="button"
            onClick={() => scrollCarousel('left')}
            disabled={!canScrollLeft}
            aria-label="Scroll carousel to previous cities"
            className={`hidden md:flex absolute -left-4 lg:-left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 items-center justify-center rounded-full bg-white/95 backdrop-blur-xs border border-[#E8E8E8] shadow-lg text-[#3F3F3F] hover:text-[#F59A16] hover:border-[#F59A16] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F59A16] ${
              !canScrollLeft ? 'opacity-0 pointer-events-none' : 'opacity-90 hover:opacity-100'
            }`}
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Edge Right Arrow Button (Desktop & Tablet) */}
          <button
            type="button"
            onClick={() => scrollCarousel('right')}
            disabled={!canScrollRight}
            aria-label="Scroll carousel to next cities"
            className={`hidden md:flex absolute -right-4 lg:-right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 items-center justify-center rounded-full bg-white/95 backdrop-blur-xs border border-[#E8E8E8] shadow-lg text-[#3F3F3F] hover:text-[#F59A16] hover:border-[#F59A16] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F59A16] ${
              !canScrollRight ? 'opacity-0 pointer-events-none' : 'opacity-90 hover:opacity-100'
            }`}
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* City Cards Carousel */}
          <div
            id={`country-panel-${selectedCountry.id}`}
            role="tabpanel"
            aria-labelledby={`country-tab-${selectedCountry.id}`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCountry.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.32, ease: 'easeOut' }}
              >
                <div
                  ref={carouselRef}
                  className="flex items-center gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory py-3 px-1 no-scrollbar select-none"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {selectedCountry.cities.map((city) => (
                    <div
                      key={city.id}
                      className="snap-start shrink-0 w-[72vw] sm:w-[46vw] md:w-[31%] lg:w-[18.6%] min-w-[200px]"
                    >
                      <CityCard city={city} />
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Sub-info / Hint */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs text-[#666666] border-t border-[#EAEAEA]">
          <span>
            Explore verified student apartments, dorms, and private studios in{' '}
            <strong className="text-[#3F3F3F] font-bold">{selectedCountry.name}</strong>
          </span>
          <span className="text-[#666666] text-[11px]">
            Showing <strong className="text-[#F59A16] font-bold">{selectedCountry.cities.length}</strong> major student destinations
          </span>
        </div>

      </div>
    </section>
  );
}
