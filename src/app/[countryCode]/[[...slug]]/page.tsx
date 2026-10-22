import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LocationListing } from '@/components/property/LocationListing';
import { PropertyDetail } from '@/components/property/PropertyDetail';
import { PER_PAGE } from '@/components/property/CityContent';
import { fetchCityByUri, fetchProperties, fetchPropertyByUri, transformBackendProperty } from '@/lib/api';
import { SourceCanonical, sourceMetadata } from '@/lib/seo';

interface LocationPageProps {
  params: Promise<{
    countryCode: string;
    slug?: string[];
  }>;
}

// Resolve original WordPress URIs: /{cc}/{city}/ (+ /page/N/) is a city, deeper URIs are listings.
async function resolve(params: LocationPageProps['params']) {
  const { countryCode, slug = [] } = await params;
  let parts = [countryCode, ...slug].map((p) => decodeURIComponent(p).toLowerCase());
  let page = 1;
  if (parts.length > 2 && parts[parts.length - 2] === 'page' && /^\d+$/.test(parts[parts.length - 1])) {
    page = Number(parts[parts.length - 1]);
    parts = parts.slice(0, -2);
  }
  const uri = parts.join('/');

  const city = await fetchCityByUri(uri).catch(() => null);
  if (city) return { kind: 'city' as const, countryCode, slug, city, page };
  if (page === 1 && parts.length > 2) {
    const property = await fetchPropertyByUri(uri).catch(() => null);
    if (property) return { kind: 'property' as const, property };
  }
  return { kind: 'legacy' as const, countryCode, slug, page, parts };
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const r = await resolve(params);
  if (r.kind === 'city' && r.city.seo) {
    const { total } = await fetchProperties({ city_id: r.city.id, limit: 1, include_children: true }).catch(() => ({ total: 0 }));
    return sourceMetadata(r.city.seo, { kind: 'term', name: r.city.name, page: r.page, totalPages: Math.ceil(total / PER_PAGE) });
  }
  if (r.kind === 'property' && r.property.seo) return sourceMetadata(r.property.seo, { kind: 'post', name: r.property.title });
  return {};
}

export default async function LocationPropertiesPage({ params }: LocationPageProps) {
  const r = await resolve(params);

  if (r.kind === 'property') {
    return (
      <>
        <SourceCanonical seo={r.property.seo} />
        <PropertyDetail slug={r.property.slug || String(r.property.id)} initial={r.property} />
      </>
    );
  }

  if (r.kind === 'city') {
    const res = await fetchProperties({ city_id: r.city.id, limit: 1000, sort_by: 'source_order', include_children: true });
    const properties = res.items.map(transformBackendProperty);
    if (r.page > Math.max(1, Math.ceil(properties.length / PER_PAGE))) notFound();
    // Yoast: paginated archives canonicalise to themselves
    const pagedCanonical = r.page > 1 && r.city.seo?.source_url ? `${r.city.seo.source_url}page/${r.page}/` : undefined;
    return (
      <>
      <SourceCanonical seo={r.city.seo} href={pagedCanonical} />
      <LocationListing
        countryCode={r.countryCode}
        slug={r.slug}
        city={r.city}
        initialProperties={properties}
        page={r.page}
      />
      </>
    );
  }

  // Country code without its own city page (e.g. /in/): all migrated listings under that prefix
  if (r.parts.length === 1) {
    const res = await fetchProperties({ uri_prefix: r.parts[0], limit: 1000, sort_by: 'source_order' }).catch(() => null);
    if (res && res.total > 0) {
      if (r.page > Math.ceil(res.total / PER_PAGE)) notFound();
      return (
        <LocationListing
          countryCode={r.countryCode}
          slug={[]}
          initialProperties={res.items.map(transformBackendProperty)}
          page={r.page}
        />
      );
    }
  }

  return <LocationListing countryCode={r.countryCode} slug={r.slug} />;
}
