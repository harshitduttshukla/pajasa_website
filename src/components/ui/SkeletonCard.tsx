'use client';

import React from 'react';

export function SkeletonCard() {
  return (
    <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 space-y-4 animate-pulse">
      <div className="w-full h-52 bg-slate-800 rounded-2xl" />
      <div className="space-y-2">
        <div className="w-2/3 h-5 bg-slate-800 rounded-lg" />
        <div className="w-1/2 h-4 bg-slate-800 rounded-lg" />
      </div>
      <div className="flex gap-2">
        <div className="w-16 h-6 bg-slate-800 rounded-full" />
        <div className="w-16 h-6 bg-slate-800 rounded-full" />
        <div className="w-16 h-6 bg-slate-800 rounded-full" />
      </div>
      <div className="pt-2 flex items-center justify-between border-t border-slate-800">
        <div className="w-24 h-6 bg-slate-800 rounded-lg" />
        <div className="w-20 h-8 bg-slate-800 rounded-xl" />
      </div>
    </div>
  );
}
