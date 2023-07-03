import { ICategory, ILabel, ILocation } from './cow.inteface';

export const locations: ILocation[] = [
  'Dhaka',
  'Chattogram',
  'Barishal',
  'Rajshahi',
  'Sylhet',
  'Comilla',
  'Rangpur',
  'Mymensingh',
];

export const labels: ILabel[] = ['for sale', 'sold out'];

export const categories: ICategory[] = ['Beef', 'Dairy', 'DualPurpose'];

export const cowSearchableFields: string[] = ['location', 'breed', 'category'];
export const cowFiltersableFields: string[] = [
  'searchTerm',
  'location',
  'breed',
  'label',
  'category',
  'minPrice',
  'maxPrice',
];
