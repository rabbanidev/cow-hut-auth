import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import User from '../user/user.model';

export const checkSeller = async (id: string): Promise<boolean> => {
  const user = await User.findById(id).lean();

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Seller not found!');
  }

  return user && user.role === 'seller' ? true : false;
};
