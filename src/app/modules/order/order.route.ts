import express from 'express';
import { OrderController } from './order.controller';
import validateRequestHandler from '../../middlewares/validateRequestHandler';
import { OrderValidation } from './order.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../../enum';

const router = express.Router();

router.post(
  '/',
  validateRequestHandler(OrderValidation.createOrderZodSchema),
  auth(USER_ROLE.BUYER),
  OrderController.createOrder
);

router.get(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.BUYER, USER_ROLE.SELLER),
  OrderController.getSingleOrder
);

router.get(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.BUYER, USER_ROLE.SELLER),
  OrderController.getAllOrders
);

export const OrderRoutes = router;
