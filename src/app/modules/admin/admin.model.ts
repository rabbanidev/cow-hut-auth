/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { AdminModel, IAdmin } from './admin.interface';
import config from '../../../config';
import { adminRole } from './admin.constant';

const adminSchema = new Schema<IAdmin, AdminModel>(
  {
    phoneNumber: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      enum: adminRole, // ['admin']
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        delete ret.password;
      },
    },
  }
);

// Check admin exit's
adminSchema.statics.adminExit = async function (
  phoneNumber: string
): Promise<Partial<IAdmin> | null> {
  return await Admin.findOne({ phoneNumber }, { role: 1, password: 1 });
};

// Check password
adminSchema.statics.matchedPassword = async function (
  textPassword: string,
  hashPassword: string
): Promise<boolean> {
  return await bcrypt.compare(textPassword, hashPassword);
};

// Hash password using prehook middleware
adminSchema.pre('save', async function (next) {
  const admin = this;
  admin.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

const Admin = model<IAdmin, AdminModel>('Admin', adminSchema);

export default Admin;
