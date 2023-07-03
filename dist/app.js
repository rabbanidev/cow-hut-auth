"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const notFoundHandler_1 = __importDefault(require("./app/middlewares/notFoundHandler"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const sendResponse_1 = __importDefault(require("./shared/sendResponse"));
const app = (0, express_1.default)();
// cors use
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
// parser use
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Aplication routes
app.use('/api/v1', routes_1.default);
// Test
app.get('/', (req, res) => {
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Cow online hut home page!',
    });
});
// Global Error Hnadler
app.use(globalErrorHandler_1.default);
// Not Found Handler
app.use(notFoundHandler_1.default);
exports.default = app;
