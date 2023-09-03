import { Database } from './utils/database.types';

export type Car = {
  booked_dates: string[];
  borrower_id: string[];
  capacity: Database['public']['Enums']['capacity'];
  car_id: string;
  car_title: string;
  car_type: Database['public']['Enums']['car_type'];
  fuel_capacity: number;
  images: string[] | null;
  location: string;
  owner_id: string;
  price: number;
  short_description: string;
  transmission: Database['public']['Enums']['transmission'];
};

export type GeoResponse = {
  status: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string;
};

export type ToastProps = {
  type: 'success' | 'error';
  message: string;
};
