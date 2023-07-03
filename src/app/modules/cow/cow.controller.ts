import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { CowService } from './cow.service';
import { ICow } from './cow.inteface';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { cowFiltersableFields } from './cow.constant';

const createCow = catchAsync(async (req: Request, res: Response) => {
  const result = await CowService.createCow(req.body);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow created successfully!',
    data: result,
  });
});

const getAllCows = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, cowFiltersableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await CowService.getAllCows(filters, paginationOptions);

  sendResponse<ICow[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cows retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleCow = catchAsync(async (req: Request, res: Response) => {
  const result = await CowService.getSingleCow(req.params.id);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow retrieved successfully!',
    data: result,
  });
});

const updateCow = catchAsync(async (req: Request, res: Response) => {
  const result = await CowService.updateCow(req.params.id, req.user, req.body);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow updated successfully!',
    data: result,
  });
});

const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const result = await CowService.deleteCow(req.params.id, req.user);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow deleted successfully!',
    data: result,
  });
});

export const CowController = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
};
