"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const admin_model_1 = __importDefault(require("./admin.model"));
const jwtHelpers_1 = require("../../../helper/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const createAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.default.create(payload);
    return result;
});
const loginAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const adminData = yield admin_model_1.default.adminExit(payload.phoneNumber);
    // Check admin
    if (!adminData) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'No admin found!');
    }
    // Check password
    const isMatchedPassword = (adminData === null || adminData === void 0 ? void 0 : adminData.password) &&
        (yield admin_model_1.default.matchedPassword(payload.password, adminData.password));
    if (!isMatchedPassword) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Password doesn't match !");
    }
    // create access and refresh token
    const { _id, role } = adminData;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({
        userId: _id,
        role: role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({
        userId: _id,
        role: role,
    }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
exports.AdminService = {
    createAdmin,
    loginAdmin,
};
