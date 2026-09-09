export interface Locality {
  name: string;
  slug: string;
}

export interface CityLocation {
  name: string;
  slug: string;
  locations?: Locality[];
}

export interface CountryLocation {
  country: string;
  code: string;
  cities: CityLocation[];
}

export const TOP_NAV_CITIES: CityLocation[] = [
  { name: 'Mumbai', slug: '/in/mumbai/' },
  { name: 'Pune', slug: '/in/pune/' },
  { name: 'New Delhi', slug: '/in/new-delhi/' },
  { name: 'Gurugram', slug: '/in/gurugram/' },
  { name: 'Noida', slug: '/in/noida/' },
  { name: 'Bengaluru', slug: '/in/bengaluru/' },
  { name: 'Hyderabad', slug: '/in/hyderabad/' },
  { name: 'Chennai', slug: '/in/chennai/' },
  { name: 'Goa', slug: '/in/goa/' },
];

export const LOCATIONS_DATA: CountryLocation[] = [
  {
    country: 'India',
    code: 'in',
    cities: [
      {
        name: 'Mumbai',
        slug: '/in/mumbai/',
        locations: [
          { name: 'Mumbai', slug: '/in/mumbai/' },
          { name: 'Powai', slug: '/in/mumbai/powai/' },
          { name: 'BKC', slug: '/in/mumbai/bkc/' },
          { name: 'Andheri', slug: '/in/mumbai/andheri/' },
          { name: 'Bandra', slug: '/in/mumbai/bandra/' },
          { name: 'Dadar', slug: '/in/mumbai/dadar/' },
          { name: 'Juhu', slug: '/in/mumbai/juhu/' },
          { name: 'Worli', slug: '/in/mumbai/worli/' },
          { name: 'Airoli', slug: '/in/mumbai/airoli/' },
          { name: 'Versova', slug: '/in/mumbai/versova/' },
          { name: 'Vikhroli', slug: '/in/mumbai/vikhroli/' },
          { name: 'Santacruz', slug: '/in/mumbai/santacruz/' },
          { name: 'Goregaon', slug: '/in/mumbai/goregaon/' },
          { name: 'Lower Parel', slug: '/in/mumbai/lower-parel/' },
          { name: 'Navi Mumbai', slug: '/in/mumbai/navi-mumbai/' },
          { name: 'Chembur', slug: '/in/mumbai/chembur/' },
        ],
      },
      {
        name: 'Hyderabad',
        slug: '/in/hyderabad/',
        locations: [
          { name: 'Hyderabad', slug: '/in/hyderabad/' },
          { name: 'Kondapur', slug: '/in/hyderabad/kondapur/' },
          { name: 'Hitech City', slug: '/in/hyderabad/hitech-city/' },
          { name: 'Madhapur', slug: '/in/hyderabad/madhapur/' },
          { name: 'Gachibowli', slug: '/in/hyderabad/gachibowli/' },
          { name: 'Banjara Hills', slug: '/in/hyderabad/banjara-hills/' },
          { name: 'Jubilee Hills', slug: '/in/hyderabad/jubilee-hills/' },
          { name: 'Begumpet', slug: '/in/hyderabad/begumpet/' },
          { name: 'Ameerpet', slug: '/in/hyderabad/ameerpet/' },
          { name: 'Somajiguda', slug: '/in/hyderabad/somajiguda/' },
          { name: 'Tarnaka', slug: '/in/hyderabad/tarnaka/' },
          { name: 'Himayatnagar', slug: '/in/hyderabad/himayatnagar/' },
          { name: 'Chanda Nagar', slug: '/in/hyderabad/chanda-nagar/' },
          { name: 'Nizampet', slug: '/in/hyderabad/nizampet/' },
        ],
      },
      {
        name: 'Pune',
        slug: '/in/pune/',
        locations: [
          { name: 'Pune', slug: '/in/pune/' },
          { name: 'Kharadi', slug: '/in/pune/kharadi/' },
          { name: 'Baner', slug: '/in/pune/baner/' },
          { name: 'Hinjewadi', slug: '/in/pune/hinjewadi/' },
          { name: 'Hadapsar', slug: '/in/pune/hadapsar/' },
          { name: 'Aundh', slug: '/in/pune/aundh/' },
          { name: 'Kothrud', slug: '/in/pune/kothrud/' },
          { name: 'Magarpatta', slug: '/in/pune/magarpatta/' },
          { name: 'Kalyani Nagar', slug: '/in/pune/kalyani-nagar/' },
          { name: 'Viman Nagar', slug: '/in/pune/viman-nagar/' },
          { name: 'Shivaji Nagar', slug: '/in/pune/shivaji-nagar/' },
          { name: 'Koregaon Park', slug: '/in/pune/koregaon-park/' },
        ],
      },
      {
        name: 'Bengaluru',
        slug: '/in/bengaluru/',
        locations: [
          { name: 'Bengaluru', slug: '/in/bengaluru/' },
          { name: 'Sarjapur', slug: '/in/bengaluru/sarjapur/' },
          { name: 'Bellandur', slug: '/in/bengaluru/bellandur/' },
          { name: 'Whitefield', slug: '/in/bengaluru/whitefield/' },
          { name: 'Varthur', slug: '/in/bengaluru/varthur/' },
          { name: 'Electronic City', slug: '/in/bengaluru/electronic-city/' },
          { name: 'Indiranagar', slug: '/in/bengaluru/indiranagar/' },
          { name: 'Jayanagar', slug: '/in/bengaluru/jayanagar/' },
          { name: 'Bannerghatta', slug: '/in/bengaluru/bannerghatta/' },
          { name: 'Hosur Road', slug: '/in/bengaluru/hosur-road/' },
          { name: 'Hebbal', slug: '/in/bengaluru/hebbal/' },
          { name: 'Lavelle Road', slug: '/in/bengaluru/lavelle-road/' },
          { name: 'Koramangala', slug: '/in/bengaluru/koramangala/' },
          { name: 'Malleswaram', slug: '/in/bengaluru/malleswaram/' },
        ],
      },
      {
        name: 'Chennai',
        slug: '/in/chennai/',
        locations: [
          { name: 'Chennai', slug: '/in/chennai/' },
          { name: 'Nungambakkam', slug: '/in/chennai/nungambakkam/' },
          { name: 'Adyar', slug: '/in/chennai/adyar/' },
          { name: 'Anna Nagar', slug: '/in/chennai/anna-nagar/' },
          { name: 'Mylapore', slug: '/in/chennai/mylapore/' },
          { name: 'Guindy', slug: '/in/chennai/guindy/' },
          { name: 'Besant Nagar', slug: '/in/chennai/besant-nagar/' },
          { name: 'Velachery', slug: '/in/chennai/velachery/' },
          { name: 'Kotturpuram', slug: '/in/chennai/kotturpuram/' },
          { name: 'Koyambedu', slug: '/in/chennai/koyambedu/' },
          { name: 'Ekkaduthangal', slug: '/in/chennai/ekkaduthangal/' },
          { name: 'ECR', slug: '/in/chennai/ecr/' },
          { name: 'Egmore', slug: '/in/chennai/egmore/' },
        ],
      },
      {
        name: 'Kolkata',
        slug: '/in/kolkata/',
        locations: [
          { name: 'Kolkata', slug: '/in/kolkata/' },
          { name: 'New Town', slug: '/in/kolkata/new-town/' },
          { name: 'Salt Lake City', slug: '/in/kolkata/salt-lake-city/' },
        ],
      },
      {
        name: 'Other Indian Cities',
        slug: '/in/',
        locations: [
          { name: 'New Delhi', slug: '/in/new-delhi/' },
          { name: 'Gurugram', slug: '/in/gurugram/' },
          { name: 'Noida', slug: '/in/noida/' },
          { name: 'Coimbatore', slug: '/in/coimbatore/' },
          { name: 'Tirupati', slug: '/in/tirupati/' },
          { name: 'Vizag', slug: '/in/vizag/' },
          { name: 'Pondicherry', slug: '/in/pondicherry/' },
          { name: 'Trichy', slug: '/in/trichy/' },
          { name: 'Mangalore', slug: '/in/mangalore/' },
          { name: 'Kochi', slug: '/in/kochi/' },
          { name: 'Madurai', slug: '/in/madurai/' },
          { name: 'Ahmedabad', slug: '/in/ahmedabad/' },
          { name: 'Goa', slug: '/in/goa/' },
          { name: 'Surat', slug: '/in/surat/' },
          { name: 'Nashik', slug: '/in/nashik/' },
          { name: 'Rajkot', slug: '/in/rajkot/' },
          { name: 'Lucknow', slug: '/in/lucknow/' },
          { name: 'Jaipur', slug: '/in/jaipur/' },
          { name: 'Chandigarh', slug: '/in/chandigarh/' },
        ],
      },
    ],
  },
  {
    country: 'United Kingdom',
    code: 'uk',
    cities: [
      {
        name: 'London',
        slug: '/uk/london/',
        locations: [
          { name: 'London', slug: '/uk/london/' },
          { name: 'Sheffield', slug: '/uk/london/sheffield/' },
          { name: 'Wembley', slug: '/uk/london/wembley/' },
          { name: 'Victoria', slug: '/uk/london/victoria/' },
          { name: 'Southbank', slug: '/uk/london/southbank/' },
          { name: 'Richmond', slug: '/uk/london/richmond/' },
        ],
      },
    ],
  },
  {
    country: 'Singapore',
    code: 'sg',
    cities: [
      {
        name: 'Singapore',
        slug: '/sg/',
        locations: [
          { name: 'Singapore', slug: '/sg/' },
          { name: 'Sentosa Island', slug: '/sg/sentosa-island/' },
          { name: 'Queenstown', slug: '/sg/queenstown/' },
          { name: 'Changi', slug: '/sg/changi/' },
          { name: 'Clementi', slug: '/sg/clementi/' },
          { name: 'Outram', slug: '/sg/outram/' },
          { name: 'Marina Bay', slug: '/sg/marina-bay/' },
        ],
      },
    ],
  },
  {
    country: 'United Arab Emirates',
    code: 'ae',
    cities: [
      {
        name: 'Dubai',
        slug: '/ae/dubai/',
      },
    ],
  },
  {
    country: 'United States',
    code: 'us',
    cities: [
      {
        name: 'New York',
        slug: '/us/new-york/',
        locations: [
          { name: 'New York', slug: '/us/new-york/' },
          { name: 'SoHo', slug: '/us/new-york/soho/' },
          { name: 'Manhattan', slug: '/us/new-york/manhattan/' },
          { name: 'Brooklyn Heights', slug: '/us/new-york/brooklyn-heights/' },
        ],
      },
    ],
  },
];
