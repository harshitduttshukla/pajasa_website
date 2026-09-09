'use client';

import React from 'react';
import { BLOG_ARTICLES } from '@/data/mockData';

export function BlogSection() {
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_ARTICLES.map((article) => (
            <a
              key={article.id}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl overflow-hidden bg-white border border-[#E8E8E8] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="h-48 overflow-hidden bg-slate-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover img-zoom"
                  />
                </div>

                <div className="p-5 space-y-2">
                  <div className="text-[11px] text-[#F59A16] font-extrabold">{article.date}</div>
                  <h3 className="text-base font-extrabold text-[#3F3F3F] group-hover:text-[#F59A16] transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-[#666666] line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

