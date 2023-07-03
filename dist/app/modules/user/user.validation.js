"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: 'First name is required!',
                invalid_type_error: 'First name is invalid!',
            }),
            lastName: zod_1.z.string({
                required_error: 'Last name is required!',
                invalid_type_error: 'Last name is invalid!',
            }),
        }, {
            required_error: 'Name is required!',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required!',
            invalid_type_error: 'Password is invalid!',
        }),
        role: zod_1.z.enum([...user_constant_1.userRole], {
            required_error: 'Role is required!',
        }),
        phoneNumber: zod_1.z.string({
            required_error: 'Phone number is required!',
            invalid_type_error: 'Phone number is invalid!',
        }),
        address: zod_1.z.string({
            required_error: 'Address is required!',
            invalid_type_error: 'Address is invalid!',
        }),
        budget: zod_1.z.number().optional(),
        income: zod_1.z.number().optional(),
    }),
});
const updatedUserZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z
            .object({
            firstName: zod_1.z
                .string({
                invalid_type_error: 'First name is invalid!',
            })
                .optional(),
            lastName: zod_1.z
                .string({
                invalid_type_error: 'Last name is invalid!',
            })
                .optional(),
        })
            .optional(),
        password: zod_1.z
            .string({
            invalid_type_error: 'Password is invalid!',
        })
            .optional(),
        role: zod_1.z.enum([...user_constant_1.userRole]).optional(),
        phoneNumber: zod_1.z
            .string({
            invalid_type_error: 'Phone number is invalid!',
        })
            .optional(),
        address: zod_1.z
            .string({
            invalid_type_error: 'Address is invalid!',
        })
            .optional(),
        budget: zod_1.z.number().optional(),
        income: zod_1.z.number().optional(),
    })
        .refine(({ role }) => {
        if (role)
            return false;
        return true;
    }, {
        message: "You can't update role!",
    }),
});
exports.UserValidation = {
    createUserZodSchema,
    updatedUserZodSchema,
};
