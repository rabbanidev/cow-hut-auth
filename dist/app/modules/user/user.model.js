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
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = require("mongoose");
const user_constant_1 = require("./user.constant");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("../../../config"));
const userSchema = new mongoose_1.Schema({
    name: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: user_constant_1.userRole,
        required: true,
    },
    phoneNumber: {
        type: String,
        unique: true,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    budget: {
        type: Number,
        required: true,
    },
    income: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform(doc, ret) {
            delete ret.password;
        },
    },
});
// Check user exit's
userSchema.methods.userExit = function (phoneNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield User.findOne({ phoneNumber }, { role: 1, password: 1 });
    });
};
// check or compare password
userSchema.methods.matchedPassword = function (textPassword, hashPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(textPassword, hashPassword);
    });
};
// Hash password using prehook middleware
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        user.password = yield bcryptjs_1.default.hash(this.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
