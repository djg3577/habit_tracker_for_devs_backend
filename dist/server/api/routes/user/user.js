"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use("/users", route);
    //will yse the create user in user controller here
    route.post("/");
    //will use the get user in the user controller here
    route.get("/:id");
};
//# sourceMappingURL=user.js.map