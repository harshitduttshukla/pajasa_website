import type { Metadata } from 'next';
import { PropertyDetail } from '@/components/property/PropertyDetail';
import { fetchPropertyBySlug } from '@/lib/api';
import { SourceCanonical, sourceMetadata } from '@/lib/seo';

interface PropertyDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function load(slug: string) {
  return fetchPropertyBySlug(slug).catch(() => null);
}

export async function generateMetadata({ params }: PropertyDetailPageProps): Promise<Metadata> {
  const prop = await load((await params).slug);
  return prop?.seo ? sourceMetadata(prop.seo, { kind: 'post', name: prop.title }) : {};
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { slug } = await params;
  const prop = await load(slug);
  // Migrated listings: alias of the original URL (canonical in metadata points there)
  return (
    <>
      {prop?.wp_id && <SourceCanonical seo={prop.seo} />}
      <PropertyDetail slug={slug} initial={prop?.wp_id ? prop : null} />
    </>
  );
}
