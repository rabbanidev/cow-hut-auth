import { z } from 'zod';
import { userRole } from './user.constant';

const createUserZodSchema = z.object({
  body: z.object({
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
    password: z.string({
      required_error: 'Password is required!',
      invalid_type_error: 'Password is invalid!',
    }),
    role: z.enum([...userRole] as [string, ...string[]], {
      required_error: 'Role is required!',
    }),
    phoneNumber: z.string({
      required_error: 'Phone number is required!',
      invalid_type_error: 'Phone number is invalid!',
    }),
    address: z.string({
      required_error: 'Address is required!',
      invalid_type_error: 'Address is invalid!',
    }),
    budget: z.number().optional(),
    income: z.number().optional(),
  }),
});

const updatedUserZodSchema = z.object({
  body: z
    .object({
      name: z
        .object({
          firstName: z
            .string({
              invalid_type_error: 'First name is invalid!',
            })
            .optional(),
          lastName: z
            .string({
              invalid_type_error: 'Last name is invalid!',
            })
            .optional(),
        })
        .optional(),
      password: z
        .string({
          invalid_type_error: 'Password is invalid!',
        })
        .optional(),
      role: z.enum([...userRole] as [string, ...string[]]).optional(),
      phoneNumber: z
        .string({
          invalid_type_error: 'Phone number is invalid!',
        })
        .optional(),
      address: z
        .string({
          invalid_type_error: 'Address is invalid!',
        })
        .optional(),
      budget: z.number().optional(),
      income: z.number().optional(),
    })
    .refine(
      ({ role }) => {
        if (role) return false;
        return true;
      },
      {
        message: "You can't update role!",
      }
    ),
});

export const UserValidation = {
  createUserZodSchema,
  updatedUserZodSchema,
};
