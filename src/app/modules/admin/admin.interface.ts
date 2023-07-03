/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

type IUserName = {
  firstName: string;
  lastName: string;
};

export type IAdmin = {
  _id?: string;
  phoneNumber: string;
  role: 'admin';
  password: string;
  name: IUserName; //embedded
  address: string;
};

// export type AdminModel = Model<IAdmin, Record<string, unknown>>;

export type AdminModel = {
  adminExit(phoneNumber: string): Promise<Partial<IAdmin> | null>;
  matchedPassword(textPassword: string, hashPassword: string): Promise<boolean>;
} & Model<IAdmin>;

export type ILoginAdmin = {
  phoneNumber: string;
  password: string;
};

export type IAdminLoginResponse = {
  accessToken: string;
  refreshToken?: string;
};
