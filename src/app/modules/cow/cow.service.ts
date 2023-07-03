import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ICow, ICowFilters } from './cow.inteface';
import Cow from './cow.model';
import { checkSeller } from './cow.utils';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helper/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { cowSearchableFields } from './cow.constant';
import { JwtPayload } from 'jsonwebtoken';

const createCow = async (payload: ICow): Promise<ICow | null> => {
  const isSeller = await checkSeller(payload.seller.toString());
  if (!isSeller) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This user is not a seller!');
  }

  const result = (await Cow.create(payload)).populate('seller');
  return result;
};

const getAllCows = async (
  filters: ICowFilters,
  paginationsOptions: IPaginationOptions
): Promise<IGenericResponse<ICow[]>> => {
  const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;

  const { page, limit, skip, sortConditions } =
    paginationHelpers.calculatePagination(paginationsOptions);

  const andConditions = [];

  // searchterm implemenation
  if (searchTerm) {
    andConditions.push({
      $or: cowSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // min and max price implemenation
  if (minPrice || maxPrice) {
    andConditions.push({
      price: {
        $gte: minPrice || 0,
        $lte: maxPrice || Infinity,
      },
    });
  }

  // filtering implemenation
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Cow.find(whereConditions)
    .populate('seller')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  // total documents
  const total = await Cow.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findById(id).populate('seller');
  return result;
};

const updateCow = async (
  id: string,
  verifyUser: JwtPayload,
  payload: Partial<ICow>
): Promise<ICow | null> => {
  const exitCow = await Cow.findById(id);

  if (!exitCow) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow not found!');
  }

  if (exitCow.seller.toString() !== verifyUser.userId) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden !');
  }

  Object.assign(exitCow, payload);

  const result = (await exitCow.save()).populate('seller');
  return result;
};

const deleteCow = async (
  id: string,
  verifyUser: JwtPayload
): Promise<ICow | null> => {
  const result = await Cow.findOneAndDelete({
    _id: id,
    seller: verifyUser.userId,
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow not found !');
  }
  return result;
};

export const CowService = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
};
