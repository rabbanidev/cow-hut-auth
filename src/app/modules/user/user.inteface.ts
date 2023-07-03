/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

type IName = {
  firstName: string;
  lastName: string;
};

export type IUserRole = 'seller' | 'buyer';

export type IUser = {
  _id?: string;
  name: IName; // embedded field
  password: string;
  role: IUserRole;
  phoneNumber: string;
  address: string;
  budget: number;
  income: number;
};

export type IUserMethods = {
  userExit(phoneNumber: string): Promise<Partial<IUser> | null>;
  matchedPassword(textPassword: string, hashPassword: string): Promise<boolean>;
};

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
