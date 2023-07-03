import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IAdmin, IAdminLoginResponse } from './admin.interface';
import { AdminService } from './admin.service';
import config from '../../../config';

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.createAdmin(req.body);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully!',
    data: result,
  });
});

const loginAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.loginAdmin(req.body);

  const { refreshToken, ...others } = result;

  // refresh token set into cookies
  const options = {
    secure: config.node_env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, options);

  sendResponse<IAdminLoginResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin loggedin successfully!',
    data: others,
  });
});

export const AdminController = {
  createAdmin,
  loginAdmin,
};
