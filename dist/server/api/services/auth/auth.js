"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const axios_1 = __importDefault(require("axios"));
let AuthService = class AuthService {
    constructor() { }
    async exchangeGithubToken(code) {
        if (!code)
            return new Error(" GITHUB CODE REQUIRED ");
        const client_id = process.env.GITHUB_CLIENT_ID;
        const client_secret = process.env.GITHUB_CLIENT_SECRET;
        const redirect_uri = process.env.GITHUB_REDIRECT_URI;
        const tokenUrl = "https://github.com/login/oauth/access_token";
        const reqBody = {
            client_id,
            client_secret,
            redirect_uri,
            code,
        };
        const reqHeaders = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };
        const tokenResponse = await axios_1.default.post(tokenUrl, reqBody, reqHeaders);
        console.log(tokenResponse);
        if (!tokenResponse.data.access_token) {
            throw new Error("Failed to get access token from GitHub");
        }
        const user = await this.getGitHubUser(tokenResponse.data.access_token);
        return [tokenResponse.data.access_token, user];
    }
    async getGitHubUser(accessToken) {
        const tokenUrl = "https://api.github.com/user";
        const headers = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json",
            },
        };
        const { data } = await axios_1.default.get(tokenUrl, headers);
        return data;
    }
};
AuthService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], AuthService);
exports.default = AuthService;
//# sourceMappingURL=auth.js.map