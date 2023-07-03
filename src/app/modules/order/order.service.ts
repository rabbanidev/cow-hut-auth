/* eslint-disable prefer-const */
import mongoose from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { IOrder } from './order.interface';
import { buyerDetails, cowDetails, sellerDetails } from './order.utils';
import { labels } from '../cow/cow.constant';
import Cow from '../cow/cow.model';
import User from '../user/user.model';
import Order from './order.model';
import { JwtPayload } from 'jsonwebtoken';
import { USER_ROLE } from '../../../enum';
import { ICow } from '../cow/cow.inteface';
import httpStatus from 'http-status';

const createOrder = async (payload: IOrder): Promise<IOrder | null> => {
  const buyer = await buyerDetails(payload.buyer.toString());
  const cow = await cowDetails(payload.cow.toString());
  const seller = await sellerDetails(cow.seller.toString());

  //   Check buyer budget in their account to buy the cow
  if (buyer.budget < cow.price) {
    throw new ApiError(
      400,
      "You can't buy the cow.Because your budget is too low!"
    );
  }

  const buyerNewBudget = buyer.budget - cow.price;
  const sellerNewIncome = cow.price + seller.income;

  let updatedOrder = null;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    await Cow.findByIdAndUpdate(payload.cow, { label: labels[1] }, { session }); // cow label field update
    await User.findByIdAndUpdate(
      payload.buyer,
      { budget: buyerNewBudget },
      { session }
    ); // buyer budget update
    await User.findByIdAndUpdate(
      cow.seller,
      { income: sellerNewIncome },
      { session }
    ); // seller income update
    const orderArray = await Order.create([payload], { session });

    updatedOrder = orderArray[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  const order = await Order.findById(updatedOrder._id)
    .populate({
      path: 'cow',
      populate: { path: 'seller' },
    })
    .populate('buyer');

  return order;
};

const getAllOrders = async (verifyUser: JwtPayload): Promise<IOrder[]> => {
  let result = await Order.find({})
    .populate({
      path: 'cow',
      populate: { path: 'seller' },
    })
    .populate('buyer');

  if (verifyUser.role === USER_ROLE.BUYER) {
    result = result.filter(
      (order) => order.buyer._id?.toString() === verifyUser.userId
    );
  } else if (verifyUser.role === USER_ROLE.SELLER) {
    result = result.filter((order) => {
      const cow = order.cow as ICow;
      return cow && verifyUser.userId === cow.seller._id?.toString();
    });
  }

  return result;
};

const getSingleOrder = async (
  id: string,
  verifyUser: JwtPayload
): Promise<IOrder | null> => {
  const result = await Order.findById(id)
    .populate({
      path: 'cow',
      populate: { path: 'seller' },
    })
    .populate('buyer');

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found !');
  }

  const { role, userId } = verifyUser;
  const cow = result.cow as ICow;

  if (
    !(
      role === USER_ROLE.ADMIN ||
      userId === result.buyer._id?.toString() ||
      userId === cow.seller._id?.toString()
    )
  ) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden !');
  }

  return result;
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};
