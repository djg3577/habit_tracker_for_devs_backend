"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use("/auth", route);
    //call all auth routes here
    route.post("/decode-jwt");
};
//# sourceMappingURL=auth.js.map