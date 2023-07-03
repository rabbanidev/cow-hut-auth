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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = __importDefault(require("../user/user.model"));
const jwtHelpers_1 = require("../../../helper/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const admin_model_1 = __importDefault(require("../admin/admin.model"));
const signup = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.role === 'buyer' && !payload.budget) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Your budget must be greater then 0!');
    }
    if (payload.role === 'seller') {
        payload.budget = 0;
    }
    payload.income = 0;
    const result = yield user_model_1.default.create(payload);
    return result;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check user exit's
    const user = new user_model_1.default();
    const userData = yield user.userExit(payload.phoneNumber);
    if (!userData) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    // compare password
    const isMatchedPassword = (userData === null || userData === void 0 ? void 0 : userData.password) &&
        (yield user.matchedPassword(payload.password, userData.password));
    if (!isMatchedPassword) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Password doesn't match !");
    }
    // generate access and refresh token
    const { _id, role } = userData;
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
const refreshToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Verify token
    let verifyToken = null;
    try {
        verifyToken = jwtHelpers_1.jwtHelpers.verifyToken(payload, config_1.default.jwt.refresh_secret);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid refresh token!');
    }
    const { userId } = verifyToken;
    // Check user exit's
    const user = (yield admin_model_1.default.findById(userId)) || user_model_1.default.findById(userId);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User Not Found!');
    }
    // generate a new access token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        userId: user._id,
        role: user.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
exports.AuthService = {
    signup,
    loginUser,
    refreshToken,
};
