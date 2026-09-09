'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TRUST_STATS } from '@/data/mockData';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { Award, Building2, CheckCircle2, ShieldCheck, Users } from 'lucide-react';

export function TrustSection() {
  const getStatIcon = (id: string) => {
    switch (id) {
      case 'ts1': return <Building2 className="w-6 h-6 text-amber-400" />;
      case 'ts2': return <Users className="w-6 h-6 text-amber-400" />;
      case 'ts3': return <ShieldCheck className="w-6 h-6 text-amber-400" />;
      default: return <Award className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <section className="py-20 relative bg-slate-950 text-white overflow-hidden border-y border-slate-800/60">
      {/* Background Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-amber-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>Trusted Corporate Partner</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Empowering Seamless <span className="gold-gradient-text">Corporate Stays</span>
          </h2>
          <p className="text-sm text-slate-400">
            Backed by strict quality audits, corporate compliance, and dedicated guest management across India's top metropolitan hubs.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_STATS.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-3xl p-6 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {getStatIcon(stat.id)}
              </div>

              <div className="text-4xl font-extrabold text-white mb-1 group-hover:text-amber-400 transition-colors">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                />
              </div>

              <div className="text-sm font-bold text-slate-200 mb-2">{stat.label}</div>
              <p className="text-xs text-slate-400 leading-relaxed">{stat.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
