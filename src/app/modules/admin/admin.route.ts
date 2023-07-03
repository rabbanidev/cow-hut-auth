import express from 'express';
import validateRequestHandler from '../../middlewares/validateRequestHandler';
import { AdminValidation } from './admin.validation';
import { AdminController } from './admin.controller';

const router = express.Router();

router.post(
  '/create-admin',
  validateRequestHandler(AdminValidation.createAdminZodSchema),
  AdminController.createAdmin
);

router.post(
  '/login',
  validateRequestHandler(AdminValidation.loginAdminZodSchema),
  AdminController.loginAdmin
);

export const AdminRoutes = router;
