import { Property } from '@/types';

const getApiBaseUrl = () => {
  if (typeof window === 'undefined') {
    return process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';
  }
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';
};

const getPublicBaseUrl = () => {
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';
};

const getCloudFrontBase = () => {
  const envCf = process.env.NEXT_PUBLIC_CLOUDFRONT_URL || process.env.CLOUDFRONT_DOMAIN;
  if (envCf && envCf.trim()) {
    const clean = envCf.trim().replace(/\/$/, '');
    return clean.startsWith('http') ? clean : `https://${clean}`;
  }
  return null;
};

// S3 & CloudFront image URL resolver
export function getImageUrl(imagePath?: string | null): string {
  if (!imagePath || imagePath.trim() === '') {
    return 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';
  }
  const cleanPath = imagePath.trim();
  if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://')) {
    return cleanPath;
  }
  const cfBase = getCloudFrontBase();
  if (cfBase && !cleanPath.startsWith('/')) {
    return `${cfBase}/${cleanPath}`;
  }
  const cleanBase = getPublicBaseUrl().replace(/\/$/, '');
  const normalizedPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  return `${cleanBase}${normalizedPath}`;
}

export function getBlogImageUrl(imagePath?: string | null): string {
  if (!imagePath || imagePath.trim() === '') {
    return 'https://dcdza1qr0mu11.cloudfront.net/uploads/wp/2026/07/Serviced-Apartments-vs-Hotels-1-400x242.png.webp';
  }
  const cleanPath = imagePath.trim();
  if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://')) {
    return cleanPath;
  }
  const cfBase = getCloudFrontBase();
  if (cfBase && !cleanPath.startsWith('/')) {
    return `${cfBase}/${cleanPath}`;
  }
  const cleanBase = getPublicBaseUrl().replace(/\/$/, '');
  const normalizedPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  return `${cleanBase}${normalizedPath}`;
}

export interface BackendProperty {
  id: number;
  title: string;
  slug?: string;
  description?: string | null;
  excerpt?: string | null;
  status?: string;
  category?: string | null;
  rent_type?: string | null;
  city_id?: number | null;
  neighborhood?: string | null;
  address?: string | null;
  state?: string | null;
  zip_code?: string | null;
  country?: string | null;
  price: number;
  price_before_label?: string | null;
  price_after_label?: string | null;
  price_per_week?: number | null;
  price_per_month?: number | null;
  cleaning_fee?: number | null;
  security_deposit?: number | null;
  bedrooms: number;
  bathrooms: number;
  rooms?: number;
  size_sqft?: number | null;
  guest_no: number;
  min_days_booking?: number;
  featured_image?: string | null;
  gallery_images?: string[];
  is_featured: boolean;
  instant_booking?: boolean;
  smoking_allowed?: boolean;
  pets_allowed?: boolean;
  party_allowed?: boolean;
  children_allowed?: boolean;
  amenities?: string[];
  cancellation_policy?: string | null;
  other_rules?: string | null;
  image_alts?: Record<string, string> | null;
  wp_id?: number | null;
  source_uri?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  seo?: SourceSeo | null;
  city_name?: string | null;
  created_at?: string;
  updated_at?: string;
}

// Yoast SEO values carried over from the original WordPress site
export interface SourceSeo {
  title?: string | null;
  description?: string | null;
  canonical?: string | null;
  is_robots_noindex?: string | null;
  is_robots_nofollow?: string | null;
  open_graph_title?: string | null;
  open_graph_description?: string | null;
  open_graph_image?: string | null;
  breadcrumb_title?: string | null;
  source_url?: string | null;
}

export interface BackendCity {
  id: number;
  name: string;
  slug: string;
  parent_id?: number | null;
  description?: string | null;
  page_id?: string | null;
  featured_image?: string | null;
  category_tagline?: string | null;
  custom_uri?: string | null;
  count: number;
  is_active: boolean;
  wp_term_id?: number | null;
  seo?: SourceSeo | null;
  parent_name?: string | null;
}

export interface BackendBlog {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  featured_image?: string | null;
  category?: string | null;
  author?: string | null;
  reading_time?: string | null;
  tags?: string[];
  is_featured?: boolean;
  created_at: string;
  updated_at?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export function transformBackendProperty(p: BackendProperty): Property {
  const imageList = (p.gallery_images && p.gallery_images.length > 0)
    ? (p.featured_image ? [p.featured_image, ...p.gallery_images] : p.gallery_images)
    : (p.featured_image ? [p.featured_image] : []);

  const resolvedImages = imageList.length > 0
    ? imageList.map(img => getImageUrl(img))
    : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'];

  const amenitiesList = (p.amenities && p.amenities.length > 0)
    ? p.amenities.map((item, idx) => ({
        id: `a-${idx}`,
        name: typeof item === 'string' ? item : (item as any).name || 'Amenity',
        icon: 'Wifi',
        category: 'comfort' as const,
      }))
    : [
        { id: 'a1', name: 'Free High-Speed Wi-Fi', icon: 'Wifi', category: 'work' as const },
        { id: 'a2', name: 'Modular Kitchen & Utensils', icon: 'Utensils', category: 'kitchen' as const },
        { id: 'a3', name: 'Daily Housekeeping', icon: 'Home', category: 'comfort' as const },
      ];

  const highlights = [
    'PAJASA Verified Corporate Serviced Stay',
    'Dedicated on-site caretaker assistance',
    '100% GST Tax Credit Input Invoice included',
  ];

  const houseRules = [
    'Check-in: 2:00 PM | Check-out: 11:00 AM',
    p.smoking_allowed ? 'Designated smoking areas allowed' : 'Non-smoking executive suite',
    p.pets_allowed ? 'Pet friendly accommodation' : 'No pets permitted without prior approval',
  ];

  const city = p.city_name || (p.state ? p.state : 'India');
  const locality = p.neighborhood || p.address || city;

  if (p.wp_id) {
    // Migrated WordPress listing: use source values only, nothing generated
    const sourceRules = [
      p.smoking_allowed ? 'Smoking allowed' : 'Smoking not allowed',
      p.pets_allowed ? 'Pets allowed' : 'Pets not allowed',
      p.party_allowed ? 'Party allowed' : 'Party not allowed',
      p.children_allowed ? 'Children allowed' : 'Children not allowed',
    ];
    return {
      id: String(p.id),
      slug: p.slug || String(p.id),
      href: p.source_uri ? `/${p.source_uri}/` : `/properties/${p.slug || p.id}`,
      title: p.title,
      tagline: p.excerpt || '',
      city,
      locality,
      address: p.address || '',
      pricePerNight: p.price || 0,
      pricePerMonth: p.price_per_month || 0,
      rating: 0,
      reviewCount: 0,
      bedrooms: p.bedrooms ?? 0,
      bathrooms: p.bathrooms ?? 0,
      maxGuests: p.guest_no ?? 0,
      sqft: p.size_sqft ? Math.round(p.size_sqft) : 0,
      images: imageList.map(img => getImageUrl(img)),
      imageAlts: p.image_alts || {},
      featured: Boolean(p.is_featured),
      amenities: (p.amenities || []).map((name, idx) => ({ id: `a-${idx}`, name, icon: 'Wifi', category: 'comfort' as const })),
      description: p.description || '',
      descriptionHtml: true,
      isSource: true,
      category: p.category || '',
      highlights: [],
      houseRules: [...(p.other_rules ? [p.other_rules] : []), ...sourceRules],
      locationCoords: { lat: p.latitude ?? 0, lng: p.longitude ?? 0 },
      nearbyPlaces: [],
      seo: p.seo || null,
    };
  }

  return {
    id: String(p.id),
    slug: p.slug || String(p.id),
    href: `/properties/${p.slug || p.id}`,
    title: p.title,
    tagline: p.excerpt || (p.category ? `${p.category} Corporate Residence` : 'Premium Serviced Residence'),
    city: city,
    locality: locality,
    address: p.address || `${locality}, ${city}`,
    pricePerNight: p.price || 0,
    pricePerMonth: p.price_per_month || (p.price ? Math.round(p.price * 25) : 0),
    rating: 4.95,
    reviewCount: 38,
    bedrooms: p.bedrooms || 1,
    bathrooms: p.bathrooms || 1,
    maxGuests: p.guest_no || 2,
    sqft: p.size_sqft ? Math.round(p.size_sqft) : (p.bedrooms ? p.bedrooms * 550 : 650),
    images: resolvedImages,
    featured: Boolean(p.is_featured),
    amenities: amenitiesList,
    description: p.description || p.excerpt || 'Experience unparalleled comfort and convenience in this fully furnished serviced apartment managed by PAJASA.',
    highlights,
    houseRules,
    locationCoords: {
      lat: 19.0760,
      lng: 72.8777,
    },
    nearbyPlaces: [
      { name: 'Major Business Corridor', distance: '0.8 km', type: 'business' },
      { name: 'International Airport', distance: '12 km', type: 'airport' },
    ],
  };
}

// ---------------- PROPERTY API ----------------

export async function fetchProperties(params?: {
  page?: number;
  limit?: number;
  search?: string;
  city_id?: number | null;
  category?: string;
  sort_by?: string;
  order?: string;
  include_children?: boolean;
  uri_prefix?: string;
}): Promise<PaginatedResponse<BackendProperty>> {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.set('page', params.page.toString());
  if (params?.limit) queryParams.set('limit', params.limit.toString());
  if (params?.search) queryParams.set('search', params.search);
  if (params?.city_id !== undefined && params?.city_id !== null) {
    queryParams.set('city_id', params.city_id.toString());
  }
  if (params?.category) queryParams.set('category', params.category);
  if (params?.sort_by) queryParams.set('sort_by', params.sort_by);
  if (params?.order) queryParams.set('order', params.order);
  if (params?.include_children) queryParams.set('include_children', 'true');
  if (params?.uri_prefix) queryParams.set('uri_prefix', params.uri_prefix);

  const baseUrl = getApiBaseUrl();
  const res = await fetch(`${baseUrl}/api/properties?${queryParams.toString()}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch properties from backend');
  }

  return res.json();
}

export async function fetchPropertyBySlug(slug: string): Promise<BackendProperty> {
  const baseUrl = getApiBaseUrl();
  const res = await fetch(`${baseUrl}/api/properties/slug/${encodeURIComponent(slug)}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    // Try fallback by ID if slug is numeric
    if (!isNaN(Number(slug))) {
      const idRes = await fetch(`${baseUrl}/api/properties/${slug}`, {
        cache: 'no-store',
      });
      if (idRes.ok) return idRes.json();
    }
    throw new Error(`Property not found: ${slug}`);
  }

  return res.json();
}

export async function fetchPropertyByUri(uri: string): Promise<BackendProperty | null> {
  const res = await fetch(`${getApiBaseUrl()}/api/properties/uri?path=${encodeURIComponent(uri)}`, {
    cache: 'no-store',
  });
  return res.ok ? res.json() : null;
}

// ---------------- CITY API ----------------

export async function fetchCityByUri(uri: string): Promise<BackendCity | null> {
  const res = await fetch(`${getApiBaseUrl()}/api/cities/uri?path=${encodeURIComponent(uri)}`, {
    cache: 'no-store',
  });
  return res.ok ? res.json() : null;
}

export async function fetchCities(params?: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<PaginatedResponse<BackendCity>> {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.set('page', params.page.toString());
  if (params?.limit) queryParams.set('limit', params.limit.toString());
  if (params?.search) queryParams.set('search', params.search);

  const baseUrl = getApiBaseUrl();
  const res = await fetch(`${baseUrl}/api/cities?${queryParams.toString()}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch cities from backend');
  }

  return res.json();
}

// ---------------- BLOG API ----------------

export async function fetchBlogs(params?: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  is_featured?: boolean;
}): Promise<PaginatedResponse<BackendBlog>> {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.set('page', params.page.toString());
  if (params?.limit) queryParams.set('limit', params.limit.toString());
  if (params?.search) queryParams.set('search', params.search);
  if (params?.category) queryParams.set('category', params.category);
  if (params?.is_featured !== undefined) {
    queryParams.set('is_featured', String(params.is_featured));
  }

  const baseUrl = getApiBaseUrl();
  const res = await fetch(`${baseUrl}/api/blogs?${queryParams.toString()}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch blog articles from backend');
  }

  return res.json();
}

export async function fetchBlogBySlug(slug: string): Promise<BackendBlog> {
  const baseUrl = getApiBaseUrl();
  const res = await fetch(`${baseUrl}/api/blogs/slug/${encodeURIComponent(slug)}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    // Try fallback by ID if numeric
    if (!isNaN(Number(slug))) {
      const idRes = await fetch(`${baseUrl}/api/blogs/${slug}`, {
        cache: 'no-store',
      });
      if (idRes.ok) return idRes.json();
    }
    throw new Error(`Blog article not found: ${slug}`);
  }

  return res.json();
}
