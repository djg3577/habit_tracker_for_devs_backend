"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("./express"));
const postgres_1 = __importDefault(require("./postgres"));
exports.default = async ({ expressApp }) => {
    try {
        // Initialize database first
        await (0, postgres_1.default)();
        console.log("✅ Database loaded");
        (0, express_1.default)({ app: expressApp });
    }
    catch (e) {
        console.log(e);
        process.exit(1);
    }
};
//# sourceMappingURL=index.js.map