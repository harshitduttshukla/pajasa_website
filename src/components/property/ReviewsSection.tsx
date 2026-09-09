'use client';

import React, { useState } from 'react';
import { CheckCircle2, MessageSquare, Send, Star } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { reviewSchema, ReviewFormValues } from '@/lib/schemas';
import { REVIEWS_DATA } from '@/data/mockData';

interface ReviewsSectionProps {
  rating: number;
  reviewCount: number;
}

export function ReviewsSection({ rating, reviewCount }: ReviewsSectionProps) {
  const [reviewsList, setReviewsList] = useState(REVIEWS_DATA);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 5,
    },
  });

  const onSubmitReview = (data: ReviewFormValues) => {
    const newRev = {
      id: `r_${Date.now()}`,
      authorName: data.authorName,
      authorCompany: data.authorCompany,
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      rating: data.rating,
      date: 'Just now',
      comment: data.comment,
      stayType: 'Corporate Stay',
    };

    setReviewsList([newRev, ...reviewsList]);
    setReviewSubmitted(true);
    reset();
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  return (
    <div className="space-y-8 pt-6 border-t border-[#E8E8E8]">
      
      {/* Header & Rating Breakdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-[#E8E8E8] shadow-xs">
        <div className="flex items-center gap-4">
          <div className="text-4xl font-extrabold text-[#3F3F3F] flex items-center gap-1.5">
            <Star className="w-8 h-8 fill-[#F59A16] text-[#F59A16]" />
            <span>{rating.toFixed(2)}</span>
          </div>
          <div>
            <h4 className="text-base font-extrabold text-[#3F3F3F]">Verified Guest Ratings</h4>
            <p className="text-xs text-[#666666]">Based on {reviewCount} corporate executive stays</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="px-3 py-2 rounded-xl bg-slate-50 border border-[#E8E8E8] text-center">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Cleanliness</span>
            <span className="font-extrabold text-[#F59A16]">5.0 / 5</span>
          </div>
          <div className="px-3 py-2 rounded-xl bg-slate-50 border border-[#E8E8E8] text-center">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Location</span>
            <span className="font-extrabold text-[#F59A16]">4.9 / 5</span>
          </div>
          <div className="px-3 py-2 rounded-xl bg-slate-50 border border-[#E8E8E8] text-center">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">WiFi & Desk</span>
            <span className="font-extrabold text-[#F59A16]">5.0 / 5</span>
          </div>
          <div className="px-3 py-2 rounded-xl bg-slate-50 border border-[#E8E8E8] text-center">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Concierge</span>
            <span className="font-extrabold text-[#F59A16]">4.9 / 5</span>
          </div>
        </div>
      </div>

      {/* Review List */}
      <div className="space-y-4">
        {reviewsList.map((rev) => (
          <div key={rev.id} className="p-6 rounded-2xl bg-white border border-[#E8E8E8] space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={rev.authorAvatar}
                  alt={rev.authorName}
                  className="w-10 h-10 rounded-full object-cover border border-orange-200"
                />
                <div>
                  <h5 className="text-sm font-extrabold text-[#3F3F3F]">{rev.authorName}</h5>
                  <p className="text-xs text-[#F59A16] font-bold">{rev.authorCompany}</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#F59A16] text-[#F59A16]" />
                ))}
              </div>
            </div>

            <p className="text-xs text-[#666666] leading-relaxed italic">
              &quot;{rev.comment}&quot;
            </p>

            <div className="text-[11px] text-slate-400 flex items-center justify-between font-medium">
              <span>{rev.stayType}</span>
              <span>{rev.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Review Form */}
      <div className="p-6 rounded-2xl bg-white border border-[#E8E8E8] space-y-4 shadow-xs">
        <h4 className="text-base font-extrabold text-[#3F3F3F] flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#F59A16]" />
          Leave an Executive Review
        </h4>

        {reviewSubmitted ? (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2 font-bold">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Thank you! Your verified review has been published.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmitReview)} className="space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[#3F3F3F] font-bold mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Anand Sharma"
                  {...register('authorName')}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-[#E8E8E8] text-[#3F3F3F] focus:outline-none focus:border-[#F59A16]"
                />
                {errors.authorName && <p className="text-[11px] text-red-500 mt-1">{errors.authorName.message}</p>}
              </div>

              <div>
                <label className="block text-[#3F3F3F] font-bold mb-1">Company / Designation</label>
                <input
                  type="text"
                  placeholder="e.g. Senior Partner, McKinsey"
                  {...register('authorCompany')}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-[#E8E8E8] text-[#3F3F3F] focus:outline-none focus:border-[#F59A16]"
                />
                {errors.authorCompany && <p className="text-[11px] text-red-500 mt-1">{errors.authorCompany.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-[#3F3F3F] font-bold mb-1">Review Comments</label>
              <textarea
                rows={3}
                placeholder="Share your experience regarding cleanliness, workstation, concierge..."
                {...register('comment')}
                className="w-full p-3 rounded-xl bg-slate-50 border border-[#E8E8E8] text-[#3F3F3F] focus:outline-none focus:border-[#F59A16]"
              />
              {errors.comment && <p className="text-[11px] text-red-500 mt-1">{errors.comment.message}</p>}
            </div>

            <button
              type="submit"
              className="py-2.5 px-5 rounded-xl bg-[#F59A16] hover:bg-[#e08a0b] text-white font-extrabold text-xs shadow-xs transition-all flex items-center gap-2 cursor-pointer uppercase tracking-wider"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Review</span>
            </button>
          </form>
        )}
      </div>

    </div>
  );
}

