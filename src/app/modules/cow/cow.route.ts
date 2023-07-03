import express from 'express';
import { CowController } from './cow.controller';
import validateRequestHandler from '../../middlewares/validateRequestHandler';
import auth from '../../middlewares/auth';
import { CowValidation } from './cow.validation';
import { USER_ROLE } from '../../../enum';

const router = express.Router();

router.post(
  '/',
  validateRequestHandler(CowValidation.createCowZodSchema),
  auth(USER_ROLE.SELLER),
  CowController.createCow
);

router.patch(
  '/:id',
  validateRequestHandler(CowValidation.updateCowZodSchema),
  auth(USER_ROLE.SELLER),
  CowController.updateCow
);

router.delete('/:id', auth(USER_ROLE.SELLER), CowController.deleteCow);

router.get(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.BUYER, USER_ROLE.SELLER),
  CowController.getSingleCow
);

router.get(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.BUYER, USER_ROLE.SELLER),
  CowController.getAllCows
);

export const CowRoutes = router;
