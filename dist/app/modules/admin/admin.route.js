"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequestHandler_1 = __importDefault(require("../../middlewares/validateRequestHandler"));
const admin_validation_1 = require("./admin.validation");
const admin_controller_1 = require("./admin.controller");
const router = express_1.default.Router();
router.post('/create-admin', (0, validateRequestHandler_1.default)(admin_validation_1.AdminValidation.createAdminZodSchema), admin_controller_1.AdminController.createAdmin);
router.post('/login', (0, validateRequestHandler_1.default)(admin_validation_1.AdminValidation.loginAdminZodSchema), admin_controller_1.AdminController.loginAdmin);
exports.AdminRoutes = router;
