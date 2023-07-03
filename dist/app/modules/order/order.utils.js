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
exports.sellerDetails = exports.cowDetails = exports.buyerDetails = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = __importDefault(require("../user/user.model"));
const user_constant_1 = require("../user/user.constant");
const cow_model_1 = __importDefault(require("../cow/cow.model"));
const cow_constant_1 = require("../cow/cow.constant");
const buyerDetails = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(id).lean();
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Buyer not found!');
    }
    // check user is seller
    else if (user.role === user_constant_1.userRole[0]) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'You are not allowed to perform this action.Because you are seller.');
    }
    return user;
});
exports.buyerDetails = buyerDetails;
const cowDetails = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const cow = yield cow_model_1.default.findById(id).lean();
    if (!cow) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Cow not found!');
    }
    else if (cow.label === cow_constant_1.labels[1]) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'The cow already sold!');
    }
    return cow;
});
exports.cowDetails = cowDetails;
const sellerDetails = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(id).lean();
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Seller not found!');
    }
    return user;
});
exports.sellerDetails = sellerDetails;
