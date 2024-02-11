export const footerLinks = [
  {
    title: 'About',
    links: [
      { title: 'How it works', url: '/' },
      { title: 'Featured', url: '/' },
      { title: 'Partnership', url: '/' },
      { title: 'Business Relation', url: '/' },
    ],
  },
  {
    title: 'Company',
    links: [
      { title: 'Events', url: '/' },
      { title: 'Blog', url: '/' },
      { title: 'Podcast', url: '/' },
      { title: 'Invite a friend', url: '/' },
    ],
  },
  {
    title: 'Socials',
    links: [
      { title: 'Discord', url: '/' },
      { title: 'Instagram', url: '/' },
      { title: 'Twitter', url: '/' },
      { title: 'Facebook', url: '/' },
    ],
  },
];

export const formItems = [
  {
    name: 'car_title',
    title: 'Car Title',
    placeholder: 'Your title',
  },
  {
    name: 'car_type',
    title: 'Car Type',
    placeholder: 'Brand Name',
    options: ['Sports', 'MPV', 'SUV', 'Sedan', 'Coupe', 'Hatchback'],
  },
  {
    name: 'price',
    title: 'Rent Price',
    placeholder: 'Price in dollars',
  },
  {
    name: 'capacity',
    title: 'Capacity',
    placeholder: 'Capacity in persons',
    options: ['2', '4', '6', '8 or more'],
  },
  {
    name: 'transmission',
    title: 'Transmission',
    placeholder: 'Car Type',
    options: ['Manual', 'Automatic', 'CVT'],
  },
  {
    name: 'location',
    title: 'Location',
    placeholder: 'Select your location',
  },
  {
    name: 'fuel_capacity',
    title: 'Fuel Capacity',
    placeholder: 'Fuel Capacity in liters',
  },
  {
    name: 'short_description',
    title: 'Short Description',
    placeholder: 'Enter a short description',
  },
];

export interface FormData {
  car_title: string | null;
  price: number | null;
  fuel_capacity: number | null;
  short_description: string | null;
  [key: string]: string | number | null;
}

export type carType = {
  owner_id: string;
  borrower_id: string;
  car_id: string;
  car_title: string;
  car_type: string;
  fuel_capacity: number;
  images: string[];
  transmission: string;
  capacity: number;
  price: number;
  short_description: string;
  [key: string]: string | number | string[];
};
