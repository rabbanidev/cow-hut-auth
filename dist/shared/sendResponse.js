"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, payload) => {
    const responseData = {
        statusCode: payload.statusCode,
        success: payload.success,
        message: payload.message || null,
        meta: payload.meta || null || undefined,
        data: payload.data || null,
    };
    res.status(payload.statusCode).json(responseData);
};
exports.default = sendResponse;
