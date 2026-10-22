'use client';

import React, { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchBlogBySlug, getBlogImageUrl, BackendBlog } from '@/lib/api';
import { ChevronRight, Calendar, Clock, User, Tag, ArrowLeft, AlertCircle } from 'lucide-react';

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [article, setArticle] = useState<BackendBlog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadArticle() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchBlogBySlug(slug);
        if (isMounted) {
          setArticle(data);
        }
      } catch (err: any) {
        if (isMounted) {
          setError('The requested blog article was not found.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    loadArticle();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  if (isLoading) {
    return (
      <div className="pt-36 pb-24 bg-[#FAFAF8] text-[#3F3F3F] min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-block w-10 h-10 border-4 border-[#F59A16] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-bold text-[#3F3F3F]">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="pt-36 pb-24 bg-[#FAFAF8] text-[#3F3F3F] min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-white border border-[#E8E8E8] rounded-2xl max-w-md mx-auto space-y-4 shadow-xs">
          <AlertCircle className="w-12 h-12 text-[#F59A16] mx-auto" />
          <h2 className="text-lg font-extrabold text-[#3F3F3F]">Article Not Found</h2>
          <p className="text-xs text-[#666666]">
            The article you are looking for does not exist or may have been removed.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F59A16] hover:bg-[#e08a0b] text-white text-xs font-bold shadow-xs transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-36 pb-24 bg-[#FAFAF8] text-[#3F3F3F] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb Trail */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#666666] font-semibold pt-2">
          <Link href="/" className="hover:text-[#F59A16] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/#blog" className="hover:text-[#F59A16] transition-colors">Blog</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#3F3F3F] truncate font-extrabold">{article.title}</span>
        </nav>

        {/* Header Block */}
        <div className="space-y-4 pb-6 border-b border-[#E8E8E8]">
          {article.category && (
            <span className="inline-block px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#F59A16] text-xs font-extrabold uppercase tracking-wider">
              {article.category}
            </span>
          )}

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#3F3F3F] tracking-tight leading-tight">
            {article.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#666666]">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#F59A16]" />
              <span>{formatDate(article.created_at)}</span>
            </div>
            {article.author && (
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-slate-400" />
                <span>By {article.author}</span>
              </div>
            )}
            {article.reading_time && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{article.reading_time}</span>
              </div>
            )}
          </div>
        </div>

        {/* Featured Image */}
        {article.featured_image && (
          <div className="rounded-2xl overflow-hidden bg-slate-100 border border-[#E8E8E8] shadow-xs aspect-[16/9]">
            <img
              src={getBlogImageUrl(article.featured_image)}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Excerpt Lead */}
        {article.excerpt && (
          <div className="p-6 rounded-2xl bg-orange-50/50 border border-orange-100 text-sm sm:text-base font-semibold text-[#3F3F3F] leading-relaxed">
            {article.excerpt}
          </div>
        )}

        {/* Content Body */}
        <div className="bg-white border border-[#E8E8E8] rounded-2xl p-6 sm:p-10 shadow-xs space-y-6 text-sm sm:text-base leading-relaxed text-[#4A4A4A]">
          {article.content ? (
            article.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))
          ) : (
            <p className="leading-relaxed">
              {article.excerpt || 'Full article details managed directly from the PAJASA Dashboard.'}
            </p>
          )}
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-4">
            <span className="text-xs font-bold text-[#666666] flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-[#F59A16]" />
              Tags:
            </span>
            {article.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-white border border-[#E8E8E8] text-xs font-semibold text-[#3F3F3F]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Back Link */}
        <div className="pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#E8E8E8] hover:border-[#F59A16] text-xs font-bold text-[#3F3F3F] hover:text-[#F59A16] transition-all shadow-xs"
          >
            <ArrowLeft className="w-4 h-4 text-[#F59A16]" />
            <span>Back to All Articles</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
