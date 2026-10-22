'use client';

import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import { PropertyGallery } from '@/components/property/PropertyGallery';
import { StickyBookingCard } from '@/components/property/StickyBookingCard';
import { PropertyMap } from '@/components/property/PropertyMap';
import { ReviewsSection } from '@/components/property/ReviewsSection';
import { PropertyCard } from '@/components/property/PropertyCard';
import { Property } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { fetchPropertyBySlug, fetchProperties, transformBackendProperty, BackendProperty } from '@/lib/api';
import { renderWpContent } from '@/lib/wpautop';
import { Bath, Bed, CheckCircle2, ChevronRight, Heart, MapPin, Maximize, Share2, ShieldCheck, Sparkles, Star, UserCheck, Users, Wifi, AlertCircle } from 'lucide-react';

interface PropertyDetailProps {
  slug: string;
  // Server-loaded record (migrated listings), rendered without a client round-trip
  initial?: BackendProperty | null;
}

export function PropertyDetail({ slug, initial }: PropertyDetailProps) {
  const [property, setProperty] = useState<Property | null>(initial ? transformBackendProperty(initial) : null);
  const [relatedProperties, setRelatedProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(!initial);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadPropertyData() {
      try {
        if (!initial) setIsLoading(true);
        setError(null);
        const propData = initial || (await fetchPropertyBySlug(slug));
        const relatedRes = await fetchProperties(
          initial?.city_id ? { limit: 4, city_id: initial.city_id, sort_by: 'source_order' } : { limit: 4 }
        ).catch(() => ({ items: [] }));
        if (isMounted) {
          const currentProp = transformBackendProperty(propData);
          setProperty(currentProp);
          const related = relatedRes.items
            .filter((item: any) => String(item.id) !== String(propData.id) && item.slug !== propData.slug)
            .slice(0, 2)
            .map(transformBackendProperty);
          setRelatedProperties(related);
        }
      } catch (err: any) {
        if (isMounted) {
          setError('Property not found or unable to load details.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    loadPropertyData();
    return () => {
      isMounted = false;
    };
  }, [slug, initial]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="pt-36 pb-24 bg-[#FAFAF8] text-[#3F3F3F] min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-block w-10 h-10 border-4 border-[#F59A16] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-bold text-[#3F3F3F]">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="pt-36 pb-24 bg-[#FAFAF8] text-[#3F3F3F] min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-white border border-[#E8E8E8] rounded-2xl max-w-md mx-auto space-y-4 shadow-xs">
          <AlertCircle className="w-12 h-12 text-[#F59A16] mx-auto" />
          <h2 className="text-lg font-extrabold text-[#3F3F3F]">Apartment Not Found</h2>
          <p className="text-xs text-[#666666]">
            The requested serviced apartment could not be found or may have been updated.
          </p>
          <Link
            href="/properties"
            className="inline-block px-5 py-2.5 rounded-xl bg-[#F59A16] hover:bg-[#e08a0b] text-white text-xs font-bold shadow-xs transition-colors"
          >
            Browse All Properties
          </Link>
        </div>
      </div>
    );
  }


  return (
    <div className="pt-36 pb-24 bg-[#FAFAF8] text-[#3F3F3F] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* 1. Breadcrumb Trail */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#666666] font-semibold pt-2">
          <Link href="/" className="hover:text-[#F59A16] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          {property.isSource ? (
            <Link href={(property.href || '').split('/').slice(0, 3).join('/') + '/'} className="hover:text-[#F59A16] transition-colors">
              {property.city}
            </Link>
          ) : (
            <>
          <Link href="/properties" className="hover:text-[#F59A16] transition-colors">Properties</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href={`/properties?city=${encodeURIComponent(property.city)}`} className="hover:text-[#F59A16] transition-colors">
            {property.city}
          </Link>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#3F3F3F] truncate font-extrabold">{property.seo?.breadcrumb_title || property.title}</span>
        </nav>

        {/* 2. Title & Pricing Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-[#E8E8E8]">
          {/* Left Title Area */}
          <div className="space-y-3 max-w-3xl">
            {/* Status Badges */}
            {!property.isSource && <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#F59A16] text-xs font-extrabold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#F59A16]" />
                PAJASA VERIFIED RESIDENCE
              </span>
              <span className="px-3 py-1 rounded-full bg-white border border-[#E8E8E8] text-[#3F3F3F] text-xs font-extrabold flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-[#F59A16] text-[#F59A16]" />
                {property.rating.toFixed(2)} ({property.reviewCount} Reviews)
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-extrabold">
                100% GST Tax Invoice
              </span>
            </div>}

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#3F3F3F] tracking-tight">
              {property.title}
            </h1>

            <div className="flex items-center gap-2 text-xs font-bold text-[#F59A16]">
              <MapPin className="w-4 h-4 shrink-0 text-[#F59A16]" />
              <span className="text-[#3F3F3F]">{property.address}</span>
            </div>
          </div>

          {/* Right Price & Share/Wishlist Action Block */}
          <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-4">
            <div className="text-right">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#F59A16]">
                {formatCurrency(property.pricePerNight)}
                <span className="text-xs font-normal text-[#666666]"> / night</span>
              </div>
              {property.pricePerMonth > 0 && <div className="text-xs text-emerald-600 font-extrabold mt-0.5">
                Monthly Rate: {formatCurrency(property.pricePerMonth)}
              </div>}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2.5 rounded-full bg-white border border-[#E8E8E8] text-[#3F3F3F] hover:text-[#F59A16] transition-colors relative cursor-pointer shadow-xs"
                aria-label="Share Property Link"
                title="Share Property"
              >
                <Share2 className="w-4 h-4" />
                {copied && (
                  <span className="absolute -top-8 right-0 px-2 py-1 bg-[#F59A16] text-white text-[10px] font-bold rounded shadow">
                    Link Copied!
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`p-2.5 rounded-full border transition-all cursor-pointer shadow-xs ${
                  isSaved
                    ? 'bg-rose-500 text-white border-rose-500 shadow-md scale-105'
                    : 'bg-white border-[#E8E8E8] text-[#3F3F3F] hover:text-rose-500'
                }`}
                aria-label="Save to Wishlist"
                title="Save Property"
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* 3. Real-Estate Image Gallery */}
        <PropertyGallery images={property.images} title={property.title} alts={property.imageAlts} />

        {/* 4. Quick-Facts Strip (Full Width) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 p-5 rounded-2xl bg-white border border-[#E8E8E8] text-center shadow-xs">
          <div className="space-y-1">
            <Bed className="w-6 h-6 text-[#F59A16] mx-auto" />
            <div className="text-base font-extrabold text-[#3F3F3F]">{property.bedrooms} BHK</div>
            <div className="text-[11px] text-[#666666] font-semibold">Bedrooms</div>
          </div>

          <div className="space-y-1">
            <Bath className="w-6 h-6 text-[#F59A16] mx-auto" />
            <div className="text-base font-extrabold text-[#3F3F3F]">{property.bathrooms} Baths</div>
            <div className="text-[11px] text-[#666666] font-semibold">Bathrooms</div>
          </div>

          {property.sqft > 0 && <div className="space-y-1">
            <Maximize className="w-6 h-6 text-[#F59A16] mx-auto" />
            <div className="text-base font-extrabold text-[#3F3F3F]">{property.sqft} Sq.Ft</div>
            <div className="text-[11px] text-[#666666] font-semibold">Living Area</div>
          </div>}

          <div className="space-y-1">
            <Users className="w-6 h-6 text-[#F59A16] mx-auto" />
            <div className="text-base font-extrabold text-[#3F3F3F]">{property.maxGuests} Guests</div>
            <div className="text-[11px] text-[#666666] font-semibold">Max Capacity</div>
          </div>

          {!property.isSource && <>
          <div className="space-y-1">
            <UserCheck className="w-6 h-6 text-[#F59A16] mx-auto" />
            <div className="text-base font-extrabold text-[#3F3F3F]">24/7 Caretaker</div>
            <div className="text-[11px] text-[#666666] font-semibold">Dedicated Staff</div>
          </div>

          <div className="space-y-1">
            <Wifi className="w-6 h-6 text-[#F59A16] mx-auto" />
            <div className="text-base font-extrabold text-[#3F3F3F]">High-Speed</div>
            <div className="text-[11px] text-[#666666] font-semibold">Free 24x7 Wi-Fi</div>
          </div>
          </>}
        </div>

        {/* In-Page Sticky Nav Bar */}
        <div className="sticky top-28 z-30 bg-white/95 backdrop-blur-md border-b border-[#E8E8E8] py-3 overflow-x-auto">
          <div className="flex items-center gap-6 text-xs font-bold text-[#3F3F3F] min-w-max">
            <a href="#overview" className="hover:text-[#F59A16] transition-colors">Overview</a>
            <a href="#details-table" className="hover:text-[#F59A16] transition-colors">Details Specs</a>
            <a href="#amenities" className="hover:text-[#F59A16] transition-colors">Features & Amenities</a>
            <a href="#location-map" className="hover:text-[#F59A16] transition-colors">Location & Transit</a>
            {!property.isSource && <a href="#reviews" className="hover:text-[#F59A16] transition-colors">Reviews ({property.reviewCount})</a>}
            <a href="#house-rules" className="hover:text-[#F59A16] transition-colors">House Rules</a>
          </div>
        </div>

        {/* 5. Two-Column Body Layout (Main 70% + Sticky Sidebar 30%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT MAIN COLUMN (~70%) */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Overview */}
            <section id="overview" className="space-y-4 scroll-mt-28">
              <h3 className="text-xl font-extrabold text-[#3F3F3F]">
                Residence Overview
              </h3>
              {property.descriptionHtml ? (
                <div
                  className="wp-content text-sm text-[#666666] leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: renderWpContent(property.description) }}
                />
              ) : (
              <p className="text-sm text-[#666666] leading-relaxed">
                {property.description}
              </p>
              )}

              {/* Bullet Highlights */}
              {property.highlights.length > 0 && <div className="p-5 rounded-2xl bg-orange-50/50 border border-orange-100 space-y-3">
                <h4 className="text-xs font-extrabold text-[#F59A16] uppercase tracking-wider">
                  Executive Corporate Highlights
                </h4>
                <ul className="space-y-2 text-xs text-[#3F3F3F]">
                  {property.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#F59A16] shrink-0 mt-0.5" />
                      <span className="font-semibold">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>}
            </section>

            {/* Details Specs Table */}
            <section id="details-table" className="space-y-4 scroll-mt-28">
              <h3 className="text-xl font-extrabold text-[#3F3F3F]">
                Property Details & Specifications
              </h3>

              <div className="rounded-2xl border border-[#E8E8E8] overflow-hidden bg-white shadow-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[#E8E8E8] text-xs">
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between"><span className="text-slate-500">Property ID</span><span className="font-bold text-[#3F3F3F]">PAJASA-{property.id.toUpperCase()}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Property Type</span><span className="font-bold text-[#3F3F3F]">{property.isSource ? property.category || '' : 'Serviced Apartment'}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">City Hub</span><span className="font-bold text-[#3F3F3F]">{property.city}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Locality</span><span className="font-bold text-[#3F3F3F]">{property.locality}</span></div>
                    {property.sqft > 0 && <div className="flex justify-between"><span className="text-slate-500">Total Area</span><span className="font-bold text-[#3F3F3F]">{property.sqft} Sq.Ft</span></div>}
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex justify-between"><span className="text-slate-500">Bedrooms</span><span className="font-bold text-[#3F3F3F]">{property.bedrooms} BHK</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Bathrooms</span><span className="font-bold text-[#3F3F3F]">{property.bathrooms} En-Suite</span></div>
                    {!property.isSource && <>
                    <div className="flex justify-between"><span className="text-slate-500">Caretaker Status</span><span className="font-extrabold text-[#F59A16]">Dedicated Caretaker Onsite</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">GST Billing</span><span className="font-bold text-emerald-600">100% Tax Credit Invoice</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Check-in / Out</span><span className="font-bold text-[#3F3F3F]">2:00 PM / 11:00 AM</span></div>
                    </>}
                  </div>
                </div>
              </div>
            </section>

            {/* Features & Amenities Tag Grid */}
            <section id="amenities" className="space-y-4 scroll-mt-28">
              <h3 className="text-xl font-extrabold text-[#3F3F3F]">
                Features & Included Amenities
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.amenities.map((amenity) => (
                  <div
                    key={amenity.id}
                    className="p-3.5 rounded-xl bg-white border border-[#E8E8E8] flex items-center gap-3 text-xs shadow-xs"
                  >
                    <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                      <Wifi className="w-4 h-4 text-[#F59A16]" />
                    </div>
                    <span className="font-extrabold text-[#3F3F3F]">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Location & Transit Map */}
            <section id="location-map" className="scroll-mt-28">
              <PropertyMap property={property} />
            </section>

            {/* Reviews Section */}
            {!property.isSource && <section id="reviews" className="scroll-mt-28">
              <ReviewsSection rating={property.rating} reviewCount={property.reviewCount} />
            </section>}

            {/* House Rules */}
            <section id="house-rules" className="p-6 rounded-2xl bg-white border border-[#E8E8E8] space-y-3 text-xs scroll-mt-28 shadow-xs">
              <h4 className="text-sm font-extrabold text-[#3F3F3F]">
                Stay Guidelines & Caretaker Policy
              </h4>
              <ul className="space-y-2 text-[#666666]">
                {property.houseRules.map((rule, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#F59A16] shrink-0" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </section>

          </div>

          {/* RIGHT STICKY SIDEBAR (~30%) */}
          <div id="booking-form" className="lg:col-span-5">
            <StickyBookingCard property={property} />
          </div>

        </div>

        {/* Similar Residences Carousel */}
        <div className="pt-12 border-t border-[#E8E8E8] space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl font-extrabold text-[#3F3F3F]">
              Similar Executive Serviced Residences
            </h3>
            <p className="text-xs text-[#666666]">
              Explore related corporate serviced stays in top business corridors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

