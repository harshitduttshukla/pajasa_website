export interface Property {
  id: string;
  slug: string;
  href?: string; // original site URL for migrated listings
  title: string;
  tagline: string;
  city: string;
  locality: string;
  address: string;
  pricePerNight: number;
  pricePerMonth: number;
  rating: number;
  reviewCount: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  sqft: number;
  images: string[];
  imageAlts?: Record<string, string>;
  featured: boolean;
  isWishlisted?: boolean;
  amenities: {
    id: string;
    name: string;
    icon: string;
    category: 'comfort' | 'work' | 'kitchen' | 'leisure' | 'security';
  }[];
  description: string;
  descriptionHtml?: boolean; // description is WordPress post_content (HTML, wpautop formatting)
  isSource?: boolean; // migrated from the original WordPress site
  category?: string;
  seo?: import('@/lib/api').SourceSeo | null;
  highlights: string[];
  houseRules: string[];
  locationCoords: {
    lat: number;
    lng: number;
  };
  nearbyPlaces: {
    name: string;
    distance: string;
    type: 'metro' | 'airport' | 'business' | 'dining' | 'shopping';
  }[];
}

export interface City {
  id: string;
  name: string;
  state: string;
  slug: string;
  image: string;
  propertyCount: number;
  startingPrice: number;
  popularLocalities: string[];
  description: string;
}

export interface TrustStat {
  id: string;
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  description: string;
}

export interface WhyUsFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Review {
  id: string;
  authorName: string;
  authorCompany: string;
  authorAvatar: string;
  rating: number;
  date: string;
  comment: string;
  stayType: string;
}

export interface SearchQueryParams {
  city?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  amenities?: string[];
  sortBy?: 'recommended' | 'price-asc' | 'price-desc' | 'rating';
}
