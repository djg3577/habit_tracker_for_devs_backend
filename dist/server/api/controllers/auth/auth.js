"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = __importDefault(require("typedi"));
const auth_1 = __importDefault(require("../../services/auth/auth"));
exports.default = {
    async decodeJWT(req, res) {
        try {
            return res.status(200).json({
                user: req.githubUser,
                userId: req.userID,
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
    async GithubLogin(req, res) {
        try {
            const { code } = req.body;
            const authService = typedi_1.default.get(auth_1.default);
            const response = await authService.exchangeGithubToken(code);
            return res.status(200).json({
                response,
            });
        }
        catch (e) {
            console.log(e);
            return res.status(500).json(e);
        }
    },
};
//# sourceMappingURL=auth.js.map