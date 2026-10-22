import Link from 'next/link';
import { BackendCity } from '@/lib/api';
import { renderWpContent } from '@/lib/wpautop';

// WP Rentals option wp_estate_prop_no
export const PER_PAGE = 9;

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
          className={`px-3 py-1.5 rounded-lg border text-xs font-bold ${n === page ? 'bg-[#F59A16] border-[#F59A16] text-white' : 'bg-white border-[#E8E8E8] hover:text-[#F59A16]'}`}
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

// Term description followed by the FAQ block from wprentals-child/taxonomy.php.
// FAQ text is verbatim from the template, which prints ucfirst() of the term slug.
export function CityContent({ city }: { city: BackendCity }) {
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-10">
      {city.description && (
        <div
          className="wp-content taxonomy-description text-sm text-[#3F3F3F] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: renderWpContent(city.description) }}
        />
      )}

      <div itemScope itemType="https://schema.org/FAQPage" className="space-y-2.5">
        <h2 className="text-2xl font-extrabold text-[#3F3F3F] mb-4">FAQs About Serviced Apartments in {t}:</h2>
        {faqs.map(([q, a]) => (
          <details key={q} itemScope itemProp="mainEntity" itemType="https://schema.org/Question" className="border-b border-[#E8E8E8]">
            <summary itemProp="name" className="cursor-pointer px-4 py-3 text-base font-semibold bg-[#f8f8f8] hover:bg-[#eee]">{q}</summary>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer" className="px-4 py-3 text-[15px] bg-white">
              <p itemProp="text">{a}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
