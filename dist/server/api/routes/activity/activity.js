"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use("/activities", route);
    //Will use the log activity in the activity controller here
    app.post("/");
    //Will use the get activity in the activity controller here
    app.get("/");
    //Will use the get dates in the activity controller here
    app.get("/dates");
};
//# sourceMappingURL=activity.js.map