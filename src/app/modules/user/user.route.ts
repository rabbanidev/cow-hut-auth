import express from 'express';
import { UserController } from './user.controller';
import validateRequestHandler from '../../middlewares/validateRequestHandler';
import { UserValidation } from './user.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../../enum';

const router = express.Router();

// My Profile routes
router.get(
  '/my-profile',
  auth(USER_ROLE.BUYER, USER_ROLE.SELLER),
  UserController.getMyProfile
);
router.patch(
  '/my-profile',
  auth(USER_ROLE.BUYER, USER_ROLE.SELLER),
  UserController.myProfileUpdate
);

router.patch(
  '/:id',
  validateRequestHandler(UserValidation.updatedUserZodSchema),
  auth(USER_ROLE.ADMIN),
  UserController.updateUser
);
router.delete('/:id', auth(USER_ROLE.ADMIN), UserController.deleteUser);
router.get('/:id', auth(USER_ROLE.ADMIN), UserController.getSingleUser);
router.get('/', auth(USER_ROLE.ADMIN), UserController.getAllUsers);

export const UserRoutes = router;
