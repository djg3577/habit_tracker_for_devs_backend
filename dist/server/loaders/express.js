"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ app }) => {
    //testing route
    app.get("/WHATEVER", (req, res) => {
        res.status(200).end();
    });
};
//# sourceMappingURL=express.js.map