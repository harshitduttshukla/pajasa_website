import type { Metadata } from 'next';
import Link from 'next/link';
import { Building2, Headphones, KeyRound, MapPin, Phone, Receipt, ShieldCheck, Sparkles, Wifi } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | PAJASA Service Apartments',
  description:
    'PAJASA Stay Solutions offers fully furnished serviced apartments with dedicated caretakers for corporate and long-stay guests across India and abroad.',
};

const offerings = [
  {
    icon: Building2,
    title: 'Fully Furnished Apartments',
    text: 'Studio, 1 BHK, 2 BHK and 3 BHK serviced apartments with modular kitchens, ready to move in for short or long stays.',
  },
  {
    icon: KeyRound,
    title: 'Dedicated Caretakers',
    text: 'Every residence is looked after by a caretaker, with daily housekeeping so guests can focus on work and family.',
  },
  {
    icon: Receipt,
    title: 'GST Tax Invoices',
    text: 'Valid B2B tax invoices under GSTIN so corporate travel desks can claim input tax credit on business stays.',
  },
  {
    icon: Wifi,
    title: 'Work-Ready Spaces',
    text: 'High-speed Wi-Fi and comfortable living spaces suited to business travellers, project teams and relocations.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    text: 'Our concierge desk is reachable around the clock by phone and WhatsApp before, during and after your stay.',
  },
  {
    icon: ShieldCheck,
    title: 'Zero Hidden Fees',
    text: 'Transparent nightly and monthly rates, with taxes shown upfront before you enquire.',
  },
];

const cities = ['Mumbai', 'Pune', 'Delhi', 'Gurgaon', 'Bangalore', 'Hyderabad', 'Chennai', 'London', 'Singapore', 'Dubai', 'New York'];

export default function AboutUsPage() {
  return (
    <div className="pt-36 pb-24 bg-[#FAFAF8] text-[#3F3F3F] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#F59A16] text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#F59A16]" />
            <span>About PAJASA</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#3F3F3F] tracking-tight">
            A Home Away From <span className="text-[#F59A16]">Home</span>
          </h1>
          <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
            PAJASA Stay Solutions Pvt Ltd provides fully furnished serviced apartments with dedicated caretakers across
            major business hubs, giving corporate travellers, families and long-stay guests more space, privacy and
            value than a hotel room.
          </p>
        </div>

        {/* Who we are */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold">Who We Are</h2>
            <p className="text-sm text-[#666666] leading-relaxed">
              Headquartered in Mumbai, PAJASA is a corporate accommodation provider focused on serviced apartments for
              short-term and long-term stays. We work with companies, travel desks and individual guests who need a
              comfortable, well-managed place to live while they work in a new city.
            </p>
            <p className="text-sm text-[#666666] leading-relaxed">
              Our apartments combine the comfort of a home, with a kitchen, living room and separate bedrooms, with
              hotel-style services such as housekeeping, a dedicated caretaker and round-the-clock support.
            </p>
          </div>
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E8E8E8] shadow-xs space-y-4">
            <h3 className="text-lg font-extrabold flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#F59A16]" /> Where We Operate
            </h3>
            <div className="flex flex-wrap gap-2">
              {cities.map((city) => (
                <span key={city} className="px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-xs font-bold text-[#3F3F3F]">
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* What we offer */}
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center">Why Guests Choose PAJASA</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map(({ icon: Icon, title, text }) => (
              <div key={title} className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E8E8E8] space-y-4 shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[#F59A16]" />
                </div>
                <h3 className="text-lg font-extrabold">{title}</h3>
                <p className="text-xs text-[#666666] leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-[#3F3F3F] text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl font-extrabold">Planning a stay?</h2>
            <p className="text-sm text-zinc-300">Talk to our team for availability, monthly rates and corporate billing.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="tel:+917738777602"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F59A16] text-[#3F3F3F] font-extrabold text-sm hover:bg-[#e08a0b] transition-colors"
            >
              <Phone className="w-4 h-4" /> +91 77387 77602
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 rounded-xl border border-zinc-500 font-extrabold text-sm hover:border-[#F59A16] hover:text-[#F59A16] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
