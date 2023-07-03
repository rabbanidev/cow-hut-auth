"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moduleRoutes_1 = __importDefault(require("./moduleRoutes"));
const router = express_1.default.Router();
moduleRoutes_1.default.forEach((moduleRoute) => router.use(moduleRoute.path, moduleRoute.route));
exports.default = router;
