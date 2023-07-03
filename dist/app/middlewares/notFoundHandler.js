"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const notFoundHandler = (req, res, next) => {
    const notFoundResponse = {
        success: false,
        message: 'Not Found!',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'API Not Found!',
            },
        ],
    };
    res.status(http_status_1.default.NOT_FOUND).json(notFoundResponse);
    next();
};
exports.default = notFoundHandler;
