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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = __importDefault(require("./user.model"));
const user_constant_1 = require("./user.constant");
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.find();
    return result;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findById(id);
    return result;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const exitUser = yield user_model_1.default.findById(id);
    if (!exitUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    // Check user is seller. can't update income and budget
    if (exitUser.role === user_constant_1.userRole[0] && (payload.budget || payload.income)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "You can't not update income and budget");
    }
    // Check user is buyer. can't update income
    if (exitUser.role === user_constant_1.userRole[1] && payload.income) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "You can't not update income");
    }
    const { name } = payload, userData = __rest(payload, ["name"]);
    // Dynamic name handling
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach((key) => {
            exitUser.name[key] = name[key]; // exit.name.fistName=user given input
        });
    }
    Object.assign(exitUser, userData);
    const result = yield exitUser.save();
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findByIdAndDelete(id);
    return result;
});
const getMyProfile = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findById(payload.userId);
    return result;
});
const myProfileUpdate = (verifyUser, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const exitUser = yield user_model_1.default.findById(verifyUser.userId);
    if (!exitUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    // Check user is seller. can't update income and budget
    if (payload.budget || payload.income || payload.role) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "You can't not update income, budget and role");
    }
    const { name } = payload, userData = __rest(payload, ["name"]);
    // Dynamic name handling
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach((key) => {
            exitUser.name[key] = name[key];
        });
    }
    Object.assign(exitUser, userData);
    const result = yield exitUser.save();
    return result;
});
exports.UserService = {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    getMyProfile,
    myProfileUpdate,
};
