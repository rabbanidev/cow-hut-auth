import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import User from '../user/user.model';
import { userRole } from '../user/user.constant';
import { IUser } from '../user/user.inteface';
import { ICow } from '../cow/cow.inteface';
import Cow from '../cow/cow.model';
import { labels } from '../cow/cow.constant';

export const buyerDetails = async (id: string): Promise<IUser> => {
  const user = await User.findById(id).lean();
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Buyer not found!');
  }
  // check user is seller
  else if (user.role === userRole[0]) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'You are not allowed to perform this action.Because you are seller.'
    );
  }

  return user;
};

export const cowDetails = async (id: string): Promise<ICow> => {
  const cow = await Cow.findById(id).lean();
  if (!cow) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow not found!');
  } else if (cow.label === labels[1]) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'The cow already sold!');
  }

  return cow;
};

export const sellerDetails = async (id: string): Promise<IUser> => {
  const user = await User.findById(id).lean();
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Seller not found!');
  }
  return user;
};
