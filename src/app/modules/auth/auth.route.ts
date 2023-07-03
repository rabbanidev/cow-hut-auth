import express from 'express';
import validateRequestHandler from '../../middlewares/validateRequestHandler';
import { UserValidation } from '../user/user.validation';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequestHandler(UserValidation.createUserZodSchema),
  AuthController.signup
);

router.post(
  '/login',
  validateRequestHandler(AuthValidation.loginZodSchema),
  AuthController.loginUser
);

router.post(
  '/refresh-token',
  validateRequestHandler(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

export const AuthRoutes = router;
