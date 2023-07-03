import { z } from 'zod';

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});

const loginZodSchema = z.object({
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

export const AuthValidation = {
  refreshTokenZodSchema,
  loginZodSchema,
};
