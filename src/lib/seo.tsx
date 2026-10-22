import type { Metadata } from 'next';
import { SourceSeo } from '@/lib/api';

// Metadata from the original site's Yoast values. Absent values are omitted, never generated.
// The canonical is rendered by <SourceCanonical> because metadata URLs are rewritten by
// trailingSlash, and some original canonicals have no trailing slash.
// Yoast settings on the original site (wpseo_titles): separator sc-dash, site name, title templates.
const SEP = '-';
const SITENAME = 'PAJASA Service Apartments';
const TITLE_TEMPLATE = {
  term: '%%term_title%% Archives %%page%% %%sep%% %%sitename%%', // Yoast default (no custom template set)
  post: '%%title%% By PAJASA', // title-estate_property
};

interface SourceContext {
  kind: 'term' | 'post';
  name: string;
  page?: number;
  totalPages?: number;
}

function resolveYoast(template: string, ctx: SourceContext): string {
  // Values without variables are output verbatim (including any double spaces)
  if (!template.includes('%%')) return template;
  const page = ctx.page && ctx.page > 1 ? `Page ${ctx.page} of ${ctx.totalPages ?? ctx.page}` : '';
  const out = template
    .replace(/%%(term_title|title)%%/g, ctx.name)
    .replace(/%%sep%%/g, SEP)
    .replace(/%%sitename%%/g, SITENAME)
    .replace(/%%page%%/g, page)
    .replace(/%%\w+%%/g, '');
  // Yoast collapses whitespace left by empty variables
  return out.replace(/\s+/g, ' ').trim();
}

export function sourceMetadata(seo: SourceSeo, ctx: SourceContext): Metadata {
  return {
    title: { absolute: resolveYoast(seo.title || TITLE_TEMPLATE[ctx.kind], ctx) },
    // No custom description and no template: Yoast outputs none, so suppress the site default
    description: seo.description ? resolveYoast(seo.description, ctx) : null,
    robots: {
      index: seo.is_robots_noindex !== '1',
      follow: seo.is_robots_nofollow !== '1',
    },
    openGraph: {
      ...(seo.open_graph_title ? { title: resolveYoast(seo.open_graph_title, ctx) } : {}),
      ...(seo.open_graph_description ? { description: seo.open_graph_description } : {}),
      ...(seo.open_graph_image ? { images: [seo.open_graph_image] } : {}),
      ...(seo.source_url ? { url: seo.source_url } : {}),
    },
  };
}

export function SourceCanonical({ seo, href }: { seo?: SourceSeo | null; href?: string }) {
  const canonical = href || seo?.canonical || seo?.source_url;
  return canonical ? <link rel="canonical" href={canonical} /> : null;
}
