'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Grid, Image as ImageIcon, X } from 'lucide-react';

interface PropertyGalleryProps {
  images: string[];
  title: string;
  alts?: Record<string, string>; // original image alt text, keyed by image URL
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';

export function PropertyGallery({ images, title, alts }: PropertyGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const displayImages = images && images.length > 0 ? images : [FALLBACK_IMAGE];

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      {/* Real-Estate Style Gallery Grid */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[340px] sm:h-[420px] md:h-[480px]">
          
          {/* Main Hero Photo (Left 2 cols) */}
          <div
            onClick={() => openLightbox(0)}
            className="md:col-span-2 relative group cursor-pointer overflow-hidden h-full"
          >
            <img
              src={displayImages[0]}
              onError={(e) => {
                (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
              }}
              alt={alts?.[displayImages[0]] ?? `${title} main view`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors" />
          </div>

          {/* Grid Side Photos (Right 2 cols) */}
          <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-2 h-full">
            {displayImages.slice(1, 5).map((img, idx) => {
              const imageIndex = idx + 1;
              const isLastVisible = idx === 3;
              const extraCount = displayImages.length - 5;

              return (
                <div
                  key={idx}
                  onClick={() => openLightbox(imageIndex)}
                  className="relative group cursor-pointer overflow-hidden h-full"
                >
                  <img
                    src={img}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                    }}
                    alt={alts?.[img] ?? `${title} photo ${imageIndex + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors" />

                  {/* "+N More" Overlay on 4th thumbnail */}
                  {isLastVisible && extraCount > 0 && (
                    <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-xs flex flex-col items-center justify-center text-white font-extrabold text-lg">
                      <ImageIcon className="w-6 h-6 text-amber-400 mb-1" />
                      <span>+{extraCount} More</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* Floating "View All Photos" Button */}
        <button
          onClick={() => openLightbox(0)}
          className="absolute bottom-4 right-4 z-10 px-4 py-2.5 rounded-2xl bg-slate-950/85 hover:bg-slate-950 text-white font-extrabold text-xs flex items-center gap-2 border border-white/20 shadow-xl transition-all transform hover:scale-105 cursor-pointer"
        >
          <Grid className="w-4 h-4 text-amber-400" />
          <span>View All {displayImages.length} Photos</span>
        </button>
      </div>

      {/* Lightbox Carousel Dialog */}
      <AnimatePresence>
        {lightboxOpen && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-colors border border-white/10"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={() =>
                setActiveImageIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1))
              }
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-colors border border-white/10"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <motion.img
              key={activeImageIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              src={displayImages[activeImageIndex]}
              onError={(e) => {
                (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
              }}
              alt={alts?.[displayImages[activeImageIndex]] ?? `${title} photo ${activeImageIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            />

            <button
              onClick={() =>
                setActiveImageIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1))
              }
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-colors border border-white/10"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-200 px-4 py-2 rounded-full bg-slate-900 border border-slate-800">
              Photo {activeImageIndex + 1} of {displayImages.length}
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
