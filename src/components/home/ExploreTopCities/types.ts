export interface CityAccommodation {
  id: string;
  name: string;
  image: string;
  propertyCount: number;
  slug: string;
  countryCode: string;
  state?: string;
  tag?: string;
}

export interface CountryAccommodation {
  id: string;
  name: string;
  code: string;
  flag: string;
  cities: CityAccommodation[];
}

export type RegionAccommodation = CountryAccommodation;
