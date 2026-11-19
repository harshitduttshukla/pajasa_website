import Link from 'next/link';
import { BackendCity } from '@/lib/api';
import { parseCityContent, pickLayout, Block, Section, Group } from '@/lib/cityContent';

// WP Rentals option wp_estate_prop_no
export const PER_PAGE = 10;

export function Pagination({ basePath, page, totalPages }: { basePath: string; page: number; totalPages: number }) {
  const href = (n: number) => (n === 1 ? basePath : `${basePath}page/${n}/`);
  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2 pt-2">
      {page > 1 && <Link href={href(page - 1)} rel="prev" className="px-3 py-1.5 rounded-lg border border-[#E8E8E8] bg-white text-xs font-bold hover:text-[#F59A16]">«</Link>}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <Link
          key={n}
          href={href(n)}
          aria-current={n === page ? 'page' : undefined}
          className={`px-3 py-1.5 rounded-lg border text-xs font-bold ${n === page ? 'bg-[#F59A16] border-[#F59A16] text-[#3F3F3F]' : 'bg-white border-[#E8E8E8] hover:text-[#F59A16]'}`}
        >
          {n}
        </Link>
      ))}
      {page < totalPages && <Link href={href(page + 1)} rel="next" className="px-3 py-1.5 rounded-lg border border-[#E8E8E8] bg-white text-xs font-bold hover:text-[#F59A16]">»</Link>}
    </nav>
  );
}

const FAQ_CITY_LINKS: [string, string][] = [
  ['/in/mumbai/', 'Mumbai'],
  ['/in/hyderabad/', 'Hyderabad'],
  ['/in/pune/', 'Pune'],
  ['/in/chennai/', 'Chennai'],
  ['/in/new-delhi/', 'Delhi'],
  ['/in/gurugram/', 'Gurugram'],
  ['/in/noida/', 'Noida'],
  ['/in/bengaluru/', 'Bengaluru'],
];


const prose =
  'city-prose text-[15px] leading-relaxed text-[#3F3F3F]/90';

function Html({ html, className = '' }: { html: string; className?: string }) {
  return <div className={`${prose} ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}

function Check() {
  return (
    <svg viewBox="0 0 20 20" className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="#F59A16" fillOpacity="0.15" />
      <path d="M6 10.5l2.5 2.5L14 7.5" fill="none" stroke="#F59A16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Blocks({ blocks, variant = 0 }: { blocks: Block[]; variant?: number }) {
  return (
    <div className="space-y-5">
      {blocks.map((b, i) => {
        if (b.kind === 'html') return <Html key={i} html={b.html} />;
        if (b.kind === 'table')
          return (
            <div key={i} className="overflow-x-auto rounded-2xl border border-[#E8E8E8] bg-white">
              <Html html={b.html} className="city-table" />
            </div>
          );
        if (b.kind === 'checklist')
          return (
            <ul key={i} className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {b.items.map((it, j) => (
                <li key={j} className="flex gap-3">
                  <Check />
                  <span className={prose} dangerouslySetInnerHTML={{ __html: it }} />
                </li>
              ))}
            </ul>
          );
        // features
        return (
          <div key={i} className={`grid gap-4 ${b.items.length % 3 === 0 || b.items.length > 4 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'}`}>
            {b.items.map((it, j) =>
              variant % 2 === 0 ? (
                <div key={j} className="rounded-2xl border border-[#E8E8E8] bg-white p-5 hover:border-[#F59A16]/60 hover:shadow-md transition">
                  {it.title && <h4 className="font-bold text-[#3F3F3F] mb-1.5">{it.title}</h4>}
                  <Html html={it.html} className="!text-sm" />
                </div>
              ) : (
                <div key={j} className="border-t-2 border-[#3F3F3F] pt-4">
                  {it.title && <h4 className="font-bold text-[#3F3F3F] mb-1.5">{it.title}</h4>}
                  <Html html={it.html} className="!text-sm" />
                </div>
              ),
            )}
          </div>
        );
      })}
    </div>
  );
}

function GroupCards({ groups, numbered }: { groups: Group[]; numbered: boolean }) {
  return (
    <div className={`grid gap-5 ${groups.length === 2 || groups.length === 4 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
      {groups.map((g, i) => (
        <article key={i} className="rounded-2xl border border-[#E8E8E8] bg-white p-6 hover:border-[#F59A16]/60 hover:shadow-lg transition">
          {numbered && <span className="block text-xs font-extrabold text-[#F59A16] mb-2">{String(i + 1).padStart(2, '0')}</span>}
          <h3 className="text-lg font-bold text-[#3F3F3F] mb-2 leading-snug">{g.title}</h3>
          <Blocks blocks={g.blocks} variant={1} />
        </article>
      ))}
    </div>
  );
}

function GroupColumns({ groups }: { groups: Group[] }) {
  return (
    <div className={`grid gap-8 ${groups.length >= 4 ? 'md:grid-cols-2 lg:grid-cols-4' : groups.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
      {groups.map((g, i) => (
        <div key={i} className="border-t-2 border-[#3F3F3F] pt-4">
          <h3 className="text-base font-bold text-[#3F3F3F] mb-2">{g.title}</h3>
          <Blocks blocks={g.blocks} variant={1} />
        </div>
      ))}
    </div>
  );
}

function GroupSplit({ groups }: { groups: Group[] }) {
  return (
    <div className="divide-y divide-[#E8E8E8] border-y border-[#E8E8E8]">
      {groups.map((g, i) => (
        <div key={i} className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-4 md:gap-10 py-8">
          <div>
            <span className="block text-xs font-extrabold tracking-widest text-[#F59A16] mb-2">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="text-xl font-bold text-[#3F3F3F] leading-snug md:sticky md:top-32">{g.title}</h3>
          </div>
          <Blocks blocks={g.blocks} variant={i} />
        </div>
      ))}
    </div>
  );
}

function Faq({ items }: { items: [string, React.ReactNode][] }) {
  return (
    <div itemScope itemType="https://schema.org/FAQPage" className="border-t border-[#E8E8E8]">
      {items.map(([q, a]) => (
        <details key={q} itemScope itemProp="mainEntity" itemType="https://schema.org/Question" className="group border-b border-[#E8E8E8]">
          <summary itemProp="name" className="flex items-center justify-between gap-4 cursor-pointer list-none py-4 text-base font-semibold text-[#3F3F3F] hover:text-[#F59A16] [&::-webkit-details-marker]:hidden">
            {q}
            <span className="text-xl font-bold text-[#F59A16] transition-transform group-open:rotate-45" aria-hidden="true">+</span>
          </summary>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer" className="pb-5 pr-8">
            <div itemProp="text" className={prose}>{a}</div>
          </div>
        </details>
      ))}
    </div>
  );
}

function SectionBody({ s, seed }: { s: Section; seed: number }) {
  const layout = pickLayout(s, seed);
  return (
    <>
      {s.intro.length > 0 && (
        <div className={s.groups.length ? 'max-w-3xl mb-8' : ''}>
          <Blocks blocks={s.intro} variant={seed} />
        </div>
      )}
      {layout === 'faq' && (
        <Faq items={s.groups.map((g) => [g.title, <Blocks key={g.title} blocks={g.blocks} />])} />
      )}
      {layout === 'cards' && <GroupCards groups={s.groups} numbered={seed % 4 === 0} />}
      {layout === 'columns' && <GroupColumns groups={s.groups} />}
      {(layout === 'split' || layout === 'stack') && s.groups.length > 0 && <GroupSplit groups={s.groups} />}
      {s.chips.length > 0 && (
        <div className="mt-8">
          <p className="text-sm font-bold text-[#3F3F3F] mb-3">Popular searches</p>
          <div className="flex flex-wrap gap-2">
            {s.chips.map((c) => (
              <span key={c} className="px-3.5 py-1.5 rounded-full border border-[#E8E8E8] bg-white text-xs font-medium text-[#3F3F3F]">{c}</span>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export interface CityStats {
  count: number;
  minPrice?: number;
}

// City description (from the dashboard) laid out section by section,
// followed by the FAQ block from wprentals-child/taxonomy.php.
export function CityContent({ city, stats }: { city: BackendCity; stats?: CityStats }) {
  const t = city.slug.charAt(0).toUpperCase() + city.slug.slice(1);
  const faqs: [string, React.ReactNode][] = [
    [`Q1: What is a serviced apartment in ${t}?`, <>A serviced apartment is a fully furnished accommodation that offers hotel-like amenities such as housekeeping, Wi-Fi, security, and utilities. Unlike hotels, they come with a kitchen and more space, making them ideal for both short and long stays. {t}. Please mail from your corporate ID to <a href="mailto:info@pajasaapartments.com">info@pajasaapartments.com</a> for best discounts.</>],
    [`Q2: How are serviced apartments different from hotels in ${t}`, <>Serviced apartments provide more privacy, larger living space, and cost savings on long stays. You also get the flexibility to cook your own meals, which is not usually possible in hotels. {t}.</>],
    [`Q3:Are serviced apartments in ${t}suitable for corporate stays?`, <>Yes, serviced apartments are highly popular among business travelers. They offer proximity to business districts like Bandra Kurla Complex (BKC), Lower Parel, and Andheri, along with reliable internet and work-friendly setups.</>],
    [`Q4: Do serviced apartments in ${t} offer short-term rentals?`, <>Absolutely. Many serviced apartments in {t}are available for daily, weekly, or monthly rent, making them flexible for both tourists and professionals visiting the city</>],
    [`Q5: Do serviced apartments in ${t} provide housekeeping and maintenance?`, <>Yes, housekeeping is included in most serviced apartments in {t}usually offered daily or weekly. Maintenance support is also provided so guests can enjoy a hassle-free stay.</>],
    ['Q6: In which cities does PAJASA Apartments operate?', <>PAJASA offers verified serviced apartments in major cities like {FAQ_CITY_LINKS.map(([href, name]) => <span key={href}><a href={href} target="_blank" rel="noopener">{name}</a>, </span>)}and <a href="/in/kolkata/" target="_blank" rel="noopener">Kolkata</a>. More cities can be found in our advanced search.</>],
    [`Q7: Is it okay to use a serviced apartment during medical treatment in ${t}?`, <>Yes. Serviced apartments are widely used by patients and families during medical treatments. They are affordable, homely, and located near leading hospitals in {t}, making them an excellent alternative to expensive hotel stays.</>],
  ];


  const { lead, sections } = parseCityContent(city.description);
  const [first, ...rest] = sections;
  const tiles: [string, string][] = [
    ...(stats?.count ? [[`Apartments in ${city.name}`, String(stats.count)] as [string, string]] : []),
    ...(stats?.minPrice ? [['Nightly rates from', `₹${stats.minPrice.toLocaleString('en-IN')}`] as [string, string]] : []),
    ['Stay lengths', 'Daily to monthly'],
    ['Invoicing', 'GST-compliant'],
  ];
  const wrap = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';

  return (
    <div className="pt-16">
      {/* Overview */}
      {(first || lead.length > 0) && (
        <section id={first?.id} className="scroll-mt-32">
          <div className={`${wrap} grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-10 items-start`}>
            <div>
              <p className="text-xs font-extrabold tracking-[0.2em] uppercase text-[#F59A16] mb-3">{city.name} guide</p>
              {first && <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3F3F3F] tracking-tight leading-tight mb-5">{first.title}</h2>}
              <Blocks blocks={[...lead, ...(first?.intro ?? [])]} variant={city.id} />
            </div>
            <div className="grid grid-cols-2 gap-3 lg:sticky lg:top-32">
              {tiles.map(([k, v]) => (
                <div key={k} className="rounded-2xl border border-[#E8E8E8] bg-white p-5">
                  <p className="text-xs text-[#3F3F3F]/60 mb-1">{k}</p>
                  <p className="text-xl font-extrabold text-[#3F3F3F]">{v}</p>
                </div>
              ))}
              <a href="#enquire" className="col-span-2 text-center rounded-xl bg-[#F59A16] hover:bg-[#E08905] text-[#3F3F3F] font-bold py-3 transition">
                Get a corporate quote
              </a>
            </div>
          </div>
          {first && first.groups.length + first.chips.length > 0 && (
            <div className={`${wrap} mt-12`}>
              <SectionBody s={{ ...first, intro: [] }} seed={city.id} />
            </div>
          )}
        </section>
      )}

      {/* On this page */}
      {sections.length >= 3 && (
        <nav aria-label="On this page" className={`${wrap} mt-14`}>
          <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5">
            <p className="text-xs font-extrabold tracking-widest uppercase text-[#3F3F3F]/60 mb-3">On this page</p>
            <div className="flex flex-wrap gap-2">
              {sections.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="px-3.5 py-1.5 rounded-full border border-[#E8E8E8] text-xs font-semibold text-[#3F3F3F] hover:border-[#F59A16] hover:text-[#F59A16] transition">
                  {s.title}
                </a>
              ))}
            </div>
          </div>
        </nav>
      )}

      {rest.map((s, i) => (
        <section key={s.id} id={s.id} className={`scroll-mt-32 py-16 mt-14 ${i % 2 === 0 ? 'bg-white border-y border-[#E8E8E8]' : ''}`}>
          <div className={wrap}>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3F3F3F] tracking-tight mb-5 max-w-3xl">{s.title}</h2>
            <SectionBody s={s} seed={city.id + i + 1} />
          </div>
        </section>
      ))}

      {/* FAQ */}
      <section className={`${wrap} pt-16`}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3F3F3F] tracking-tight mb-6">FAQs About Serviced Apartments in {t}</h2>
          <Faq items={faqs} />
        </div>
      </section>

      {/* Enquiry */}
      <section id="enquire" className={`${wrap} pt-16 scroll-mt-32`}>
        <div className="rounded-3xl bg-[#3F3F3F] text-white p-8 sm:p-12 grid md:grid-cols-[2fr_1fr] gap-6 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">Tell us your dates and area in {city.name}</h2>
            <p className="text-white/75 text-[15px]">A relationship manager replies with options and a corporate quote. Mail from your corporate ID for the best rates.</p>
          </div>
          <div className="flex flex-col gap-3">
            <a href="mailto:info@pajasaapartments.com" className="text-center rounded-xl bg-[#F59A16] hover:bg-[#E08905] text-[#3F3F3F] font-bold py-3 transition">Email info@pajasaapartments.com</a>
            <a href="tel:+917738777602" className="text-center rounded-xl border border-white/30 hover:bg-white/10 font-bold py-3 transition">Call +91 77387 77602</a>
          </div>
        </div>
      </section>
    </div>
  );
}
