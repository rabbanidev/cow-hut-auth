import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.inteface';

export type ILocation =
  | 'Dhaka'
  | 'Chattogram'
  | 'Barishal'
  | 'Rajshahi'
  | 'Sylhet'
  | 'Comilla'
  | 'Rangpur'
  | 'Mymensingh';

export type ILabel = 'for sale' | 'sold out';
export type ICategory = 'Dairy' | 'Beef' | 'DualPurpose';

export type ICow = {
  name: string;
  age: number;
  price: number;
  location: ILocation;
  breed: string;
  weight: number;
  label: ILabel;
  category: ICategory;
  seller: Types.ObjectId | IUser;
};

export type CowModel = Model<ICow, Record<string, unknown>>;

export type ICowFilters = {
  searchTerm?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
};
