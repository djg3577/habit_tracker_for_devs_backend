"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = __importDefault(require("../../controllers"));
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use("/auth", route);
    //call all auth routes here
    route.post("/decode-jwt", controllers_1.default.auth.decodeJWT);
    route.post("/github", controllers_1.default.auth.GithubLogin);
};
//# sourceMappingURL=auth.js.map