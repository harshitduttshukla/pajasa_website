'use client';

import React from 'react';
import {
  Armchair, ChefHat, Wifi, AirVent, WashingMachine, Sparkles, UserCheck, ShieldCheck, BatteryCharging, Coffee,
} from 'lucide-react';

const AMENITIES = [
  { icon: Armchair, title: 'Fully furnished', description: 'Living area, bedrooms, wardrobes and quality linen.' },
  { icon: ChefHat, title: 'Equipped kitchen', description: 'Cook yourself, or have the caretaker prepare homely meals.' },
  { icon: Wifi, title: 'High-speed Wi-Fi', description: 'Free internet for work from home.' },
  { icon: AirVent, title: 'Air conditioning and TV', description: 'AC and a flat-screen or Smart TV in the bedrooms.' },
  { icon: WashingMachine, title: 'Washing machine and fridge', description: 'Laundry and food storage at home.' },
  { icon: Sparkles, title: 'Housekeeping', description: 'Daily or weekly cleaning and linen changes.' },
  { icon: UserCheck, title: 'Dedicated caretaker', description: 'One point of contact for help at any hour.' },
  { icon: ShieldCheck, title: '24/7 security', description: 'CCTV and controlled access in the building.' },
  { icon: BatteryCharging, title: 'Power backup', description: 'Keeps lights, Wi-Fi and cooling running.' },
  { icon: Coffee, title: 'Complimentary breakfast', description: 'Available in PAJASA apartments; confirm on each listing.' },
];

export function AmenitiesStrip() {
  return (
    <section className="py-12 sm:py-14 bg-white border-y border-[#E8E8E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#3F3F3F]">
            Amenities in Every <span className="text-[#F59A16]">PAJASA</span> Apartment
          </h2>
          <p className="text-xs sm:text-sm text-[#666666]">Everything you need for a comfortable stay, included.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-8">
          {AMENITIES.map((item, idx) => {
            const Icon = item.icon;
            const endOfRow = (idx + 1) % 5 === 0;
            return (
              <div
                key={item.title}
                className={`flex items-start gap-3 px-2 lg:px-4 ${!endOfRow ? 'lg:border-r lg:border-[#E8E8E8]' : ''}`}
              >
                <div className="p-2 rounded-lg bg-orange-50 shrink-0">
                  <Icon className="w-5 h-5 text-[#F59A16]" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-[#3F3F3F]">{item.title}</p>
                  <p className="text-xs text-[#666666] leading-snug mt-0.5">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
