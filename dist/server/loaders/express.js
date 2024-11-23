"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("../api/routes"));
exports.default = ({ app }) => {
    // enables cross origin resource sharing
    app.use((0, cors_1.default)());
    // flexibility on PUT POST DELETE calls
    app.use(require("method-override")());
    // req.body turns into json
    app.use(body_parser_1.default.json());
    //turns cookies into json
    app.use((0, cookie_parser_1.default)());
    //ALL API
    app.use((0, routes_1.default)());
};
//# sourceMappingURL=express.js.map