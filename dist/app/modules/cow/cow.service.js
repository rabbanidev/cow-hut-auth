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
exports.CowService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const cow_model_1 = __importDefault(require("./cow.model"));
const cow_utils_1 = require("./cow.utils");
const paginationHelpers_1 = require("../../../helper/paginationHelpers");
const cow_constant_1 = require("./cow.constant");
const createCow = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isSeller = yield (0, cow_utils_1.checkSeller)(payload.seller.toString());
    if (!isSeller) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'This user is not a seller!');
    }
    const result = (yield cow_model_1.default.create(payload)).populate('seller');
    return result;
});
const getAllCows = (filters, paginationsOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, minPrice, maxPrice } = filters, filtersData = __rest(filters, ["searchTerm", "minPrice", "maxPrice"]);
    const { page, limit, skip, sortConditions } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationsOptions);
    const andConditions = [];
    // searchterm implemenation
    if (searchTerm) {
        andConditions.push({
            $or: cow_constant_1.cowSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // min and max price implemenation
    if (minPrice || maxPrice) {
        andConditions.push({
            price: {
                $gte: minPrice || 0,
                $lte: maxPrice || Infinity,
            },
        });
    }
    // filtering implemenation
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield cow_model_1.default.find(whereConditions)
        .populate('seller')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    // total documents
    const total = yield cow_model_1.default.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.default.findById(id).populate('seller');
    return result;
});
const updateCow = (id, verifyUser, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const exitCow = yield cow_model_1.default.findById(id);
    if (!exitCow) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Cow not found!');
    }
    if (exitCow.seller.toString() !== verifyUser.userId) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Forbidden !');
    }
    Object.assign(exitCow, payload);
    const result = (yield exitCow.save()).populate('seller');
    return result;
});
const deleteCow = (id, verifyUser) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.default.findOneAndDelete({
        _id: id,
        seller: verifyUser.userId,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Cow not found !');
    }
    return result;
});
exports.CowService = {
    createCow,
    getAllCows,
    getSingleCow,
    updateCow,
    deleteCow,
};
