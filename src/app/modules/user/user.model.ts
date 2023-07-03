/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.inteface';
import { userRole } from './user.constant';
import bcrypt from 'bcryptjs';
import config from '../../../config';

const userSchema = new Schema<IUser, UserModel>(
  {
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
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: userRole,
      required: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    income: {
      type: Number,
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

// Check user exit's
userSchema.methods.userExit = async function (
  phoneNumber: string
): Promise<Partial<IUser> | null> {
  return await User.findOne({ phoneNumber }, { role: 1, password: 1 });
};

// check or compare password
userSchema.methods.matchedPassword = async function (
  textPassword: string,
  hashPassword: string
): Promise<boolean> {
  return await bcrypt.compare(textPassword, hashPassword);
};

// Hash password using prehook middleware
userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

const User = model<IUser, UserModel>('User', userSchema);

export default User;
