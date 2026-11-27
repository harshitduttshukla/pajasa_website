'use client';

import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { AmenitiesStrip } from '@/components/home/AmenitiesStrip';
import { FeaturedProperties } from '@/components/home/FeaturedProperties';
import { TopBusinessLocations } from '@/components/home/TopBusinessLocations';
import { WhyChooseAndCalc } from '@/components/home/WhyChooseAndCalc';
import { TrendingDestinations } from '@/components/home/TrendingDestinations';
import { ExploreTopCities } from '@/components/home/ExploreTopCities';
import { WhyEnterprisesChooseUs } from '@/components/home/WhyEnterprisesChooseUs';
import { ClientLogos } from '@/components/home/ClientLogos';
import { MediaFootprint } from '@/components/home/MediaFootprint';
import { BlogSection } from '@/components/home/BlogSection';
import { FaqSection } from '@/components/home/FaqSection';
import { SeoArticles } from '@/components/home/SeoArticles';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAF8] overflow-x-hidden">
      <HeroSection />
      <WhyEnterprisesChooseUs />
      <FeaturedProperties />
      <TrendingDestinations />
      <TopBusinessLocations />
      <ExploreTopCities />
      <WhyChooseAndCalc />
      <AmenitiesStrip />
      <ClientLogos />
      <MediaFootprint />
      <BlogSection />
      <SeoArticles />
      <FaqSection />
    </div>
  );
}

