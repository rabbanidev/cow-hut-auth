import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IUser } from '../user/user.inteface';
import { AuthService } from './auth.service';
import { ILoginResponse } from './auth.interface';
import config from '../../../config';

const signup = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.signup(req.body);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users created successfully!',
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body);
  const { refreshToken, ...others } = result;

  // refresh token set into cookies
  const options = {
    secure: config.node_env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, options);

  sendResponse<ILoginResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully!',
    data: others,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  // set refresh token into cookies
  const cookiesOptions = {
    secure: config.node_env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookiesOptions);

  sendResponse<ILoginResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New access token generated successfully!',
    data: result,
  });
});

export const AuthController = {
  signup,
  loginUser,
  refreshToken,
};
