import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.inteface';
import User from './user.model';
import { userRole } from './user.constant';
import { JwtPayload } from 'jsonwebtoken';

const getAllUsers = async (): Promise<IUser[]> => {
  const result = await User.find();
  return result;
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const exitUser = await User.findById(id);
  if (!exitUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // Check user is seller. can't update income and budget
  if (exitUser.role === userRole[0] && (payload.budget || payload.income)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You can't not update income and budget"
    );
  }

  // Check user is buyer. can't update income
  if (exitUser.role === userRole[1] && payload.income) {
    throw new ApiError(httpStatus.BAD_REQUEST, "You can't not update income");
  }

  const { name, ...userData } = payload;
  // Dynamic name handling
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      exitUser.name[key as keyof typeof name] = name[key as keyof typeof name]; // exit.name.fistName=user given input
    });
  }

  Object.assign(exitUser, userData);
  const result = await exitUser.save();
  return result;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

const getMyProfile = async (payload: JwtPayload) => {
  const result = await User.findById(payload.userId);
  return result;
};

const myProfileUpdate = async (
  verifyUser: JwtPayload,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const exitUser = await User.findById(verifyUser.userId);
  if (!exitUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // Check user is seller. can't update income and budget
  if (payload.budget || payload.income || payload.role) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You can't not update income, budget and role"
    );
  }

  const { name, ...userData } = payload;

  // Dynamic name handling
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      exitUser.name[key as keyof typeof name] = name[key as keyof typeof name];
    });
  }

  Object.assign(exitUser, userData);

  const result = await exitUser.save();
  return result;
};

export const UserService = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getMyProfile,
  myProfileUpdate,
};
