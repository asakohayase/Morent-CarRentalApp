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
    options: [
      'SUV',
      'Crossover',
      'Sedan',
      'Truck',
      'Wagon / Hatchback',
      'Convertible',
      'Luxury',
      'Coupe',
      'Electric',
      'Hybrid',
      'Van / Minivan',
      'Sports Car',
      'Other',
    ],
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
  car_type: string | null;
  transmission: string | null;
  capacity: string | null;
}
