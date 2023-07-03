"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cow_constant_1 = require("./cow.constant");
const cowSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min: 1,
        required: true,
    },
    price: {
        type: Number,
        min: 1,
        required: true,
    },
    location: {
        type: String,
        enum: cow_constant_1.locations,
        required: true,
    },
    breed: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        min: 1,
        required: true,
    },
    label: {
        type: String,
        enum: cow_constant_1.labels,
        default: cow_constant_1.labels[0],
        required: true,
    },
    category: {
        type: String,
        enum: cow_constant_1.categories,
        required: true,
    },
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
const Cow = (0, mongoose_1.model)('Cow', cowSchema);
exports.default = Cow;
