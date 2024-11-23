"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("./express"));
exports.default = async ({ expressApp }) => {
    try {
        (0, express_1.default)({ app: expressApp });
    }
    catch (e) {
        process.exit(1);
    }
};
//# sourceMappingURL=index.js.map