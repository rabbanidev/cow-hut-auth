"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = require("zod");
const createOrderZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        cow: zod_1.z.string({
            required_error: 'Cow is required!',
            invalid_type_error: 'Invalid Cow ID!',
        }),
        buyer: zod_1.z.string({
            required_error: 'Buyer is required!',
            invalid_type_error: 'Invalid Buyer ID!',
        }),
    }),
});
exports.OrderValidation = {
    createOrderZodSchema,
};
