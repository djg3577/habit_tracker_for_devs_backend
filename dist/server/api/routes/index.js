"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth/auth"));
const activity_1 = __importDefault(require("./activity/activity"));
const user_1 = __importDefault(require("./user/user"));
exports.default = () => {
    const app = (0, express_1.Router)();
    //ALL API GO HERE
    (0, auth_1.default)(app);
    (0, activity_1.default)(app);
    (0, user_1.default)(app);
    return app;
};
//# sourceMappingURL=index.js.map