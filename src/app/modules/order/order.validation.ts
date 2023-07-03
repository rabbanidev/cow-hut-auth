import { z } from 'zod';

const createOrderZodSchema = z.object({
  body: z.object({
    cow: z.string({
      required_error: 'Cow is required!',
      invalid_type_error: 'Invalid Cow ID!',
    }),
    buyer: z.string({
      required_error: 'Buyer is required!',
      invalid_type_error: 'Invalid Buyer ID!',
    }),
  }),
});

export const OrderValidation = {
  createOrderZodSchema,
};
