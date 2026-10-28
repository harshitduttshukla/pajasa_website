'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchBlogs, getBlogImageUrl, BackendBlog } from '@/lib/api';
import { BookOpen } from 'lucide-react';

export function BlogSection() {
  const [articles, setArticles] = useState<BackendBlog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadBlogs() {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetchBlogs({ limit: 3 });
        if (isMounted) {
          setArticles(res.items || []);
        }
      } catch (err: any) {
        if (isMounted) {
          setError('Unable to load blog articles.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    loadBlogs();
    return () => {
      isMounted = false;
    };
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <section className="py-20 bg-white text-[#3F3F3F] border-t border-[#E8E8E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#3F3F3F]">
            Know More About Luxury Serviced Apartments
          </h2>
          <p className="text-xs sm:text-sm font-normal text-[#666666]">
            Explore Articles that will help your Business Travel Easier.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-12 text-center space-y-3">
            <div className="inline-block w-8 h-8 border-3 border-[#F59A16] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-semibold text-[#666666]">Loading articles...</p>
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-2xl">
            <p className="text-xs font-semibold text-slate-500">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && articles.length === 0 && (
          <div className="p-12 text-center bg-[#FAFAF8] border border-[#E8E8E8] rounded-2xl space-y-3 shadow-xs">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-sm font-extrabold text-[#3F3F3F]">No articles published yet</h3>
            <p className="text-xs text-[#666666]">Articles published from the dashboard will appear here automatically.</p>
          </div>
        )}

        {/* 3-Column Grid */}
        {!isLoading && !error && articles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className="group rounded-2xl overflow-hidden bg-white border border-[#E8E8E8] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 overflow-hidden bg-slate-100">
                    <img loading="lazy" decoding="async"
                      src={getBlogImageUrl(article.featured_image)}
                      alt={article.title}
                      className="w-full h-full object-cover img-zoom"
                    />
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-[#F59A16] font-extrabold">
                      <span>{formatDate(article.created_at)}</span>
                      {article.category && (
                        <span className="text-slate-500 font-semibold">{article.category}</span>
                      )}
                    </div>
                    <h3 className="text-base font-extrabold text-[#3F3F3F] group-hover:text-[#F59A16] transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-[#666666] line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center">
          <Link
            href="/blog/"
            className="inline-block px-5 py-2.5 rounded-xl border border-[#E8E8E8] text-xs font-extrabold tracking-wider uppercase text-[#3F3F3F] hover:border-[#F59A16] hover:text-[#F59A16] transition-all"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}


