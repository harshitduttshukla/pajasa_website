'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { PropertyCard } from '@/components/property/PropertyCard';
import { PropertyFilters } from '@/components/property/PropertyFilters';
import { Property } from '@/types';
import { BookingModal } from '@/components/ui/BookingModal';
import { Building2, MapPin, Search } from 'lucide-react';
import { fetchProperties, fetchCities, transformBackendProperty, BackendCity } from '@/lib/api';
import { CityContent, PER_PAGE, Pagination } from '@/components/property/CityContent';

interface LocationListingProps {
  countryCode: string;
  slug: string[];
  // Migrated city: listings are server-loaded in original order
  city?: BackendCity | null;
  initialProperties?: Property[];
  page?: number;
}

export function LocationListing({ countryCode: rawCountryCode, slug, city, initialProperties, page = 1 }: LocationListingProps) {
  const countryCode = rawCountryCode?.toLowerCase() || 'in';
  const slugArray = slug || [];

  const [properties, setProperties] = useState<Property[]>(initialProperties || []);
  const [cities, setCities] = useState<BackendCity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const priceCeiling = useMemo(
    () => Math.max(10000, Math.ceil(Math.max(0, ...properties.map((p) => p.pricePerNight)) / 500) * 500),
    [properties]
  );

  // Determine location query name based on slug or countryCode
  const locationName = useMemo(() => {
    if (city) return city.name;
    if (slugArray.length > 1) {
      // e.g. /in/mumbai/powai -> Powai
      const rawLocality = slugArray[1].replace(/-/g, ' ');
      return rawLocality.charAt(0).toUpperCase() + rawLocality.slice(1);
    } else if (slugArray.length === 1) {
      // e.g. /in/mumbai -> Mumbai
      const rawCity = slugArray[0].replace(/-/g, ' ');
      if (rawCity === 'new delhi') return 'New Delhi';
      return rawCity.charAt(0).toUpperCase() + rawCity.slice(1);
    } else {
      // e.g. /sg/ or /ae/
      if (countryCode === 'sg') return 'Singapore';
      if (countryCode === 'ae') return 'Dubai';
      if (countryCode === 'uk') return 'London';
      if (countryCode === 'us') return 'New York';
      return 'India';
    }
  }, [city, countryCode, slugArray]);

  const [selectedCity, setSelectedCity] = useState(locationName);
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState(priceCeiling);
  const [selectedBedrooms, setSelectedBedrooms] = useState<number | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        setIsLoading(true);
        const [propsRes, citiesRes] = await Promise.all([
          initialProperties ? null : fetchProperties({ limit: 100 }),
          fetchCities({ limit: 100 }).catch(() => ({ items: [] as BackendCity[] })),
        ]);
        if (isMounted) {
          if (propsRes) setProperties(propsRes.items.map(transformBackendProperty));
          setCities(citiesRes.items || []);
        }
      } catch {
        // Fallback gracefully
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, [initialProperties]);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // Match city or locality (migrated cities are already scoped server-side, incl. child cities)
      if (selectedCity && !(initialProperties && selectedCity === locationName)) {
        const query = selectedCity.toLowerCase();
        const matchesCity = property.city.toLowerCase().includes(query);
        const matchesLocality = property.locality.toLowerCase().includes(query);
        const matchesDesc = property.description.toLowerCase().includes(query);
        if (!matchesCity && !matchesLocality && !matchesDesc) {
          if (properties.some(p => p.city.toLowerCase().includes(query))) {
            return false;
          }
        }
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
  }, [properties, selectedCity, searchTerm, maxPrice, selectedBedrooms]);

  // Pagination applies to server-loaded (migrated) listings only (WP Rentals: 9 listings per page)
  const isFiltered = Boolean(searchTerm) || selectedBedrooms !== null || maxPrice < priceCeiling || selectedCity !== locationName;
  const currentPage = isFiltered ? 1 : page;
  const paginated = Boolean(initialProperties);
  const visibleProperties = paginated
    ? filteredProperties.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)
    : filteredProperties;

  const handleReset = () => {
    setSelectedCity('');
    setSearchTerm('');
    setMaxPrice(priceCeiling);
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
        {city ? (
          <h1 className="mb-8 text-3xl sm:text-4xl font-extrabold text-[#3F3F3F] tracking-tight">
            Luxury Service Apartments in {city.name}
          </h1>
        ) : (
        <div className="mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#F59A16] text-xs font-extrabold uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-[#F59A16]" />
            <span>PAJASA Location Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3F3F3F] tracking-tight">
            Service Apartments in <span className="text-[#F59A16] capitalize">{locationName}</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#666666] max-w-2xl font-normal">
            Explore verified corporate housing and executive stays in {locationName}. Fully furnished residences with 24/7 caretaker, high-speed Wi-Fi, and GST tax credit invoices.
          </p>
        </div>
        )}

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
              priceCeiling={priceCeiling}
              selectedBedrooms={selectedBedrooms}
              setSelectedBedrooms={setSelectedBedrooms}
              onReset={handleReset}
              cities={cities}
            />
          </div>


          {/* Properties Grid */}
          <div className="lg:col-span-8 space-y-6">
            {/* Top Bar info */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-[#E8E8E8] text-xs font-semibold text-[#3F3F3F] shadow-xs">
              <span>
                Showing <strong className="text-[#F59A16]">{filteredProperties.length}</strong> available executive stays in <strong className="capitalize">{locationName}</strong>
              </span>

              <Link
                href="/properties"
                className="px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#F59A16] font-bold hover:bg-orange-100 transition-colors"
              >
                View All Cities
              </Link>
            </div>

            {filteredProperties.length === 0 ? (
              <div className="p-12 text-center bg-white border border-[#E8E8E8] rounded-2xl space-y-4 shadow-xs">
                <Search className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-lg font-extrabold text-[#3F3F3F]">Serviced Residences in {locationName}</h3>
                <p className="text-xs text-[#666666] max-w-sm mx-auto">
                  Our corporate travel desk coordinates instant custom housing solutions in {locationName}. Contact us for direct inquiries and corporate agreements.
                </p>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleReset}
                    className="px-4 py-2.5 rounded-xl bg-[#F59A16] hover:bg-[#e08a0b] text-[#3F3F3F] font-extrabold text-xs shadow-xs cursor-pointer"
                  >
                    Browse All Serviced Stays
                  </button>
                  <Link
                    href="/contact"
                    className="px-4 py-2.5 rounded-xl bg-slate-100 border border-[#E8E8E8] hover:bg-slate-200 text-[#3F3F3F] font-extrabold text-xs shadow-xs"
                  >
                    Contact Concierge Desk
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" itemScope itemType="http://schema.org/ItemList">
                {visibleProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onBookNow={handleBookNow}
                  />
                ))}
              </div>
            )}

            {paginated && filteredProperties.length > PER_PAGE && (
              <Pagination
                basePath={`/${city ? city.custom_uri : countryCode}/`}
                page={isFiltered ? 1 : page}
                totalPages={Math.ceil(filteredProperties.length / PER_PAGE)}
              />
            )}
          </div>
        </div>
      </div>

      {city && <CityContent city={city} />}

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        selectedProperty={selectedProperty}
      />
    </div>
  );
}
