import { z } from 'zod';
import { adminRole } from './admin.constant';

const createAdminZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'Phone number is required!',
      invalid_type_error: 'Phone number is invalid!',
    }),
    role: z.enum([...adminRole] as [string, ...string[]], {
      required_error: 'Role is required!',
    }),
    password: z.string({
      required_error: 'Password is required!',
      invalid_type_error: 'Password is invalid!',
    }),
    name: z.object(
      {
        firstName: z.string({
          required_error: 'First name is required!',
          invalid_type_error: 'First name is invalid!',
        }),
        lastName: z.string({
          required_error: 'Last name is required!',
          invalid_type_error: 'Last name is invalid!',
        }),
      },
      {
        required_error: 'Name is required!',
      }
    ),
    address: z.string({
      required_error: 'Address is required!',
      invalid_type_error: 'Address is invalid!',
    }),
  }),
});

const loginAdminZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'Phone number is required!',
      invalid_type_error: 'Phone number is invalid!',
    }),

    password: z.string({
      required_error: 'Password is required!',
      invalid_type_error: 'Password is invalid!',
    }),
  }),
});

export const AdminValidation = {
  createAdminZodSchema,
  loginAdminZodSchema,
};
