"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidation = void 0;
const zod_1 = require("zod");
const admin_constant_1 = require("./admin.constant");
const createAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({
            required_error: 'Phone number is required!',
            invalid_type_error: 'Phone number is invalid!',
        }),
        role: zod_1.z.enum([...admin_constant_1.adminRole], {
            required_error: 'Role is required!',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required!',
            invalid_type_error: 'Password is invalid!',
        }),
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
        address: zod_1.z.string({
            required_error: 'Address is required!',
            invalid_type_error: 'Address is invalid!',
        }),
    }),
});
const loginAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({
            required_error: 'Phone number is required!',
            invalid_type_error: 'Phone number is invalid!',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required!',
            invalid_type_error: 'Password is invalid!',
        }),
    }),
});
exports.AdminValidation = {
    createAdminZodSchema,
    loginAdminZodSchema,
};
