"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowValidation = void 0;
const zod_1 = require("zod");
const cow_constant_1 = require("./cow.constant");
const createCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required!',
            invalid_type_error: 'Name is invalid!',
        }),
        age: zod_1.z
            .number({
            required_error: 'Age is required!',
            invalid_type_error: 'Age is invalid!',
        })
            .min(1, {
            message: 'Age must be greater than 0',
        }),
        price: zod_1.z
            .number({
            required_error: 'Price is required!',
            invalid_type_error: 'Price is invalid!',
        })
            .min(1, {
            message: 'Price must be greater than 0!',
        }),
        location: zod_1.z.enum([...cow_constant_1.locations], {
            required_error: 'Location is required!',
        }),
        breed: zod_1.z.string({
            required_error: 'Breed is required!',
            invalid_type_error: 'Breed is invalid!',
        }),
        weight: zod_1.z
            .number({
            required_error: 'Weight is required!',
            invalid_type_error: 'Weight is invalid!',
        })
            .min(1, {
            message: 'Weight must be greater than 0!',
        }),
        label: zod_1.z.enum([...cow_constant_1.labels]).optional(),
        category: zod_1.z.enum([...cow_constant_1.categories], {
            required_error: 'Category is required!',
        }),
        seller: zod_1.z.string({
            required_error: 'Seller is required!',
            invalid_type_error: 'Seller is invalid!',
        }),
    }),
});
const updateCowZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z
            .string({
            invalid_type_error: 'Name is invalid!',
        })
            .optional(),
        age: zod_1.z
            .number({
            invalid_type_error: 'Age is invalid!',
        })
            .min(1, {
            message: 'Age must be greater than 0',
        })
            .optional(),
        price: zod_1.z
            .number({
            invalid_type_error: 'Price is invalid!',
        })
            .min(1, {
            message: 'Price must be greater than 0!',
        })
            .optional(),
        location: zod_1.z.enum([...cow_constant_1.locations]).optional(),
        breed: zod_1.z
            .string({
            invalid_type_error: 'Breed is invalid!',
        })
            .optional(),
        weight: zod_1.z
            .number({
            invalid_type_error: 'Weight is invalid!',
        })
            .min(1, {
            message: 'Weight must be greater than 0!',
        })
            .optional(),
        label: zod_1.z.enum([...cow_constant_1.labels]).optional(),
        category: zod_1.z.enum([...cow_constant_1.categories]).optional(),
        seller: zod_1.z
            .string({
            invalid_type_error: 'Seller is invalid!',
        })
            .optional(),
    })
        .refine(({ label }) => {
        if (label === cow_constant_1.labels[1])
            return false;
        return true;
    }, {
        message: "You can't update label field!",
    }),
});
exports.CowValidation = {
    createCowZodSchema,
    updateCowZodSchema,
};
