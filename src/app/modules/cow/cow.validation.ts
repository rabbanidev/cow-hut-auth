import { z } from 'zod';
import { categories, labels, locations } from './cow.constant';

const createCowZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required!',
      invalid_type_error: 'Name is invalid!',
    }),
    age: z
      .number({
        required_error: 'Age is required!',
        invalid_type_error: 'Age is invalid!',
      })
      .min(1, {
        message: 'Age must be greater than 0',
      }),
    price: z
      .number({
        required_error: 'Price is required!',
        invalid_type_error: 'Price is invalid!',
      })
      .min(1, {
        message: 'Price must be greater than 0!',
      }),
    location: z.enum([...locations] as [string, ...string[]], {
      required_error: 'Location is required!',
    }),
    breed: z.string({
      required_error: 'Breed is required!',
      invalid_type_error: 'Breed is invalid!',
    }),
    weight: z
      .number({
        required_error: 'Weight is required!',
        invalid_type_error: 'Weight is invalid!',
      })
      .min(1, {
        message: 'Weight must be greater than 0!',
      }),
    label: z.enum([...labels] as [string, ...string[]]).optional(),
    category: z.enum([...categories] as [string, ...string[]], {
      required_error: 'Category is required!',
    }),
    seller: z.string({
      required_error: 'Seller is required!',
      invalid_type_error: 'Seller is invalid!',
    }),
  }),
});

const updateCowZodSchema = z.object({
  body: z
    .object({
      name: z
        .string({
          invalid_type_error: 'Name is invalid!',
        })
        .optional(),
      age: z
        .number({
          invalid_type_error: 'Age is invalid!',
        })
        .min(1, {
          message: 'Age must be greater than 0',
        })
        .optional(),
      price: z
        .number({
          invalid_type_error: 'Price is invalid!',
        })
        .min(1, {
          message: 'Price must be greater than 0!',
        })
        .optional(),
      location: z.enum([...locations] as [string, ...string[]]).optional(),
      breed: z
        .string({
          invalid_type_error: 'Breed is invalid!',
        })
        .optional(),
      weight: z
        .number({
          invalid_type_error: 'Weight is invalid!',
        })
        .min(1, {
          message: 'Weight must be greater than 0!',
        })
        .optional(),
      label: z.enum([...labels] as [string, ...string[]]).optional(),
      category: z.enum([...categories] as [string, ...string[]]).optional(),
      seller: z
        .string({
          invalid_type_error: 'Seller is invalid!',
        })
        .optional(),
    })
    .refine(
      ({ label }) => {
        if (label === labels[1]) return false;
        return true;
      },
      {
        message: "You can't update label field!",
      }
    ),
});

export const CowValidation = {
  createCowZodSchema,
  updateCowZodSchema,
};
