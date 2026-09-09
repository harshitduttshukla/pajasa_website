'use client';

import React, { Suspense, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { PROPERTIES_DATA } from '@/data/mockData';
import { PropertyCard } from '@/components/property/PropertyCard';
import { PropertyFilters } from '@/components/property/PropertyFilters';
import { Property } from '@/types';
import { BookingModal } from '@/components/ui/BookingModal';
import { Building2, Search } from 'lucide-react';

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCity = searchParams.get('city') || '';

  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState(10000);
  const [selectedBedrooms, setSelectedBedrooms] = useState<number | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const filteredProperties = useMemo(() => {
    return PROPERTIES_DATA.filter((property) => {
      // City filter
      if (selectedCity && !property.city.toLowerCase().includes(selectedCity.toLowerCase())) {
        return false;
      }
      // Keyword search
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = property.title.toLowerCase().includes(query);
        const matchesLocality = property.locality.toLowerCase().includes(query);
        const matchesDesc = property.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLocality && !matchesDesc) return false;
      }
      // Max price
      if (property.pricePerNight > maxPrice) return false;
      // Bedrooms
      if (selectedBedrooms !== null && property.bedrooms !== selectedBedrooms) return false;

      return true;
    });
  }, [selectedCity, searchTerm, maxPrice, selectedBedrooms]);

  const handleReset = () => {
    setSelectedCity('');
    setSearchTerm('');
    setMaxPrice(10000);
    setSelectedBedrooms(null);
  };

  const handleBookNow = (prop: Property) => {
    setSelectedProperty(prop);
    setBookingModalOpen(true);
  };

  return (
    <div className="pt-36 pb-20 bg-[#FAFAF8] text-[#3F3F3F] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#F59A16] text-xs font-extrabold uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-[#F59A16]" />
            <span>Corporate Housing Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3F3F3F] tracking-tight">
            Serviced Apartments <span className="text-[#F59A16]">Directory</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#666666] max-w-2xl font-normal">
            Filter through India&apos;s premier corporate residences. All properties include high-speed WiFi, executive workstations, fully equipped kitchens, and 24/7 concierge.
          </p>
        </div>

        {/* Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Filters */}
          <div className="lg:col-span-4 sticky top-36">
            <PropertyFilters
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              selectedBedrooms={selectedBedrooms}
              setSelectedBedrooms={setSelectedBedrooms}
              onReset={handleReset}
            />
          </div>

          {/* Properties Grid */}
          <div className="lg:col-span-8 space-y-6">
            {/* Top Bar info */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-[#E8E8E8] text-xs font-semibold text-[#3F3F3F] shadow-xs">
              <span>
                Showing <strong className="text-[#F59A16]">{filteredProperties.length}</strong> available executive stays
              </span>

              {selectedCity && (
                <span className="px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#F59A16] font-bold">
                  City: {selectedCity}
                </span>
              )}
            </div>

            {filteredProperties.length === 0 ? (
              <div className="p-12 text-center bg-white border border-[#E8E8E8] rounded-2xl space-y-4 shadow-xs">
                <Search className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-lg font-extrabold text-[#3F3F3F]">No Serviced Stays Found</h3>
                <p className="text-xs text-[#666666] max-w-sm mx-auto">
                  Try adjusting your price range or clearing search keywords to view available properties.
                </p>
                <button
                  onClick={handleReset}
                  className="px-4 py-2.5 rounded-xl bg-[#F59A16] hover:bg-[#e08a0b] text-white font-extrabold text-xs shadow-xs cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onBookNow={handleBookNow}
                  />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        selectedProperty={selectedProperty}
      />
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-slate-400 text-sm font-semibold">Loading properties catalog...</div>}>
      <CatalogContent />
    </Suspense>
  );
}

