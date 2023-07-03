"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (error) => {
    const statusCode = 400;
    const message = 'Validation Error';
    const errorMessages = error.issues.map((issue) => {
        var _a;
        const lastPath = issue === null || issue === void 0 ? void 0 : issue.path[((_a = issue === null || issue === void 0 ? void 0 : issue.path) === null || _a === void 0 ? void 0 : _a.length) - 1];
        return {
            path: lastPath,
            message: issue === null || issue === void 0 ? void 0 : issue.message,
        };
    });
    return {
        statusCode,
        message,
        errorMessages,
    };
};
exports.default = handleZodError;
