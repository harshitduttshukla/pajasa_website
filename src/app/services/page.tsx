import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Briefcase,
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  Home,
  Phone,
  Receipt,
  Sparkles,
  Users,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services | PAJASA Service Apartments',
  description:
    'Serviced apartments for corporate stays, long-term monthly rentals, short stays, project teams and family relocations, with caretakers, housekeeping and GST invoices.',
};

const services = [
  {
    icon: Briefcase,
    title: 'Corporate Housing',
    text: 'Serviced apartments for business travellers and executives, with centralized billing and a dedicated point of contact for your travel desk.',
  },
  {
    icon: CalendarDays,
    title: 'Long Stay Monthly Rentals',
    text: 'Fully furnished homes on monthly rates for assignments, relocations and extended stays, without the hassle of a lease.',
  },
  {
    icon: CalendarClock,
    title: 'Short Term Stays',
    text: 'Flexible nightly stays for business trips, training programs and transit, with more space and privacy than a hotel room.',
  },
  {
    icon: Users,
    title: 'Group & Project Team Stays',
    text: '2 BHK and 3 BHK apartments that let project teams and groups stay together comfortably at a lower cost per person.',
  },
  {
    icon: Home,
    title: 'Family & Relocation Stays',
    text: 'Family-friendly apartments with kitchens and living areas, ideal while you settle into a new city.',
  },
  {
    icon: Receipt,
    title: 'GST Billing for Companies',
    text: 'Valid B2B tax invoices under GSTIN so companies can claim input tax credit on business accommodation.',
  },
];

const included = [
  'Fully furnished studio, 1 BHK, 2 BHK and 3 BHK apartments',
  'Equipped modular kitchen',
  'High-speed Wi-Fi',
  'Daily housekeeping',
  'Dedicated caretaker',
  '24/7 support by phone and WhatsApp',
  'Transparent rates with no hidden fees',
];

export default function ServicesPage() {
  return (
    <div className="pt-36 pb-24 bg-[#FAFAF8] text-[#3F3F3F] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#F59A16] text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#F59A16]" />
            <span>Our Services</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#3F3F3F] tracking-tight">
            Serviced Apartments For <span className="text-[#F59A16]">Every Stay</span>
          </h1>
          <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
            Whether it&apos;s a few nights or a few months, PAJASA provides fully furnished serviced apartments with
            dedicated caretakers for corporate guests, teams and families.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, text }) => (
            <div key={title} className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E8E8E8] space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
                <Icon className="w-6 h-6 text-[#F59A16]" />
              </div>
              <h2 className="text-lg font-extrabold">{title}</h2>
              <p className="text-xs text-[#666666] leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        {/* Included with every stay */}
        <div className="p-6 sm:p-10 rounded-2xl bg-white border border-[#E8E8E8] shadow-xs space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Included With Every Stay</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-[#666666]">
                <CheckCircle2 className="w-5 h-5 text-[#F59A16] shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-[#3F3F3F] text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl font-extrabold">Need a serviced apartment?</h2>
            <p className="text-sm text-zinc-300">Tell us your city, dates and team size and we&apos;ll share options.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="tel:+917738777602"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F59A16] text-[#3F3F3F] font-extrabold text-sm hover:bg-[#e08a0b] transition-colors"
            >
              <Phone className="w-4 h-4" /> +91 77387 77602
            </a>
            <Link
              href="/corporate"
              className="inline-flex items-center px-6 py-3 rounded-xl border border-zinc-500 font-extrabold text-sm hover:border-[#F59A16] hover:text-[#F59A16] transition-colors"
            >
              Corporate Enquiry
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
