"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh token is required!',
        }),
    }),
});
const loginZodSchema = zod_1.z.object({
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
exports.AuthValidation = {
    refreshTokenZodSchema,
    loginZodSchema,
};
