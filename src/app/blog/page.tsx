import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchBlogs, getBlogImageUrl } from '@/lib/api';

const BLOGS_PER_PAGE = 12;

export const metadata: Metadata = {
  title: 'Blog | PAJASA Serviced Apartments',
  description: 'Travel guides, city tips and serviced apartment insights from PAJASA.',
};

interface BlogListPageProps {
  searchParams: Promise<{ page?: string }>;
}

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

export default async function BlogListPage({ searchParams }: BlogListPageProps) {
  const page = Math.max(1, Number((await searchParams).page) || 1);
  const res = await fetchBlogs({ page, limit: BLOGS_PER_PAGE });
  if (page > res.total_pages) notFound();

  const href = (n: number) => (n === 1 ? '/blog/' : `/blog/?page=${n}`);
  // Compact page list: first, last and two either side of the current page
  const pages = Array.from({ length: res.total_pages }, (_, i) => i + 1).filter(
    (n) => n === 1 || n === res.total_pages || Math.abs(n - page) <= 2
  );

  return (
    <div className="pt-36 pb-24 bg-[#FAFAF8] text-[#3F3F3F] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-2">
          <span className="text-xs font-extrabold tracking-wider uppercase text-[#F59A16]">PAJASA Blog</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Travel Guides &amp; Insights</h1>
          <p className="text-sm text-[#666666]">{res.total} articles</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {res.items.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className="group rounded-2xl overflow-hidden bg-white border border-[#E8E8E8] shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              <div className="h-48 overflow-hidden bg-slate-100">
                <img loading="lazy" decoding="async"
                  src={getBlogImageUrl(article.featured_image)}
                  alt={article.title}
                  className="w-full h-full object-cover img-zoom"
                />
              </div>
              <div className="p-5 space-y-2">
                <div className="flex items-center justify-between gap-2 text-[11px] text-[#F59A16] font-extrabold">
                  <span>{formatDate(article.created_at)}</span>
                  {article.category && <span className="text-slate-400 font-semibold truncate">{article.category}</span>}
                </div>
                <h2 className="text-base font-extrabold text-[#3F3F3F] group-hover:text-[#F59A16]! transition-colors line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-xs text-[#666666] line-clamp-3 leading-relaxed">{article.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>

        {res.total_pages > 1 && (
          <nav aria-label="Pagination" className="flex flex-wrap items-center justify-center gap-2">
            {page > 1 && <Link href={href(page - 1)} rel="prev" className="px-3 py-1.5 rounded-lg border border-[#E8E8E8] bg-white text-xs font-bold hover:text-[#F59A16]">«</Link>}
            {pages.map((n, i) => (
              <span key={n} className="flex items-center gap-2">
                {i > 0 && n - pages[i - 1] > 1 && <span className="text-xs text-slate-400">…</span>}
                <Link
                  href={href(n)}
                  aria-current={n === page ? 'page' : undefined}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-bold ${n === page ? 'bg-[#F59A16] border-[#F59A16] text-white' : 'bg-white border-[#E8E8E8] hover:text-[#F59A16]'}`}
                >
                  {n}
                </Link>
              </span>
            ))}
            {page < res.total_pages && <Link href={href(page + 1)} rel="next" className="px-3 py-1.5 rounded-lg border border-[#E8E8E8] bg-white text-xs font-bold hover:text-[#F59A16]">»</Link>}
          </nav>
        )}
      </div>
    </div>
  );
}
