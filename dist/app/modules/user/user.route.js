"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequestHandler_1 = __importDefault(require("../../middlewares/validateRequestHandler"));
const user_validation_1 = require("./user.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const enum_1 = require("../../../enum");
const router = express_1.default.Router();
// My Profile routes
router.get('/my-profile', (0, auth_1.default)(enum_1.USER_ROLE.BUYER, enum_1.USER_ROLE.SELLER), user_controller_1.UserController.getMyProfile);
router.patch('/my-profile', (0, auth_1.default)(enum_1.USER_ROLE.BUYER, enum_1.USER_ROLE.SELLER), user_controller_1.UserController.myProfileUpdate);
router.patch('/:id', (0, validateRequestHandler_1.default)(user_validation_1.UserValidation.updatedUserZodSchema), (0, auth_1.default)(enum_1.USER_ROLE.ADMIN), user_controller_1.UserController.updateUser);
router.delete('/:id', (0, auth_1.default)(enum_1.USER_ROLE.ADMIN), user_controller_1.UserController.deleteUser);
router.get('/:id', (0, auth_1.default)(enum_1.USER_ROLE.ADMIN), user_controller_1.UserController.getSingleUser);
router.get('/', (0, auth_1.default)(enum_1.USER_ROLE.ADMIN), user_controller_1.UserController.getAllUsers);
exports.UserRoutes = router;
