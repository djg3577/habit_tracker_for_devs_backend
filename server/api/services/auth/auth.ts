import Container, { Service } from "typedi";
import axios from "axios";
import { User } from "../../interfaces/user";
import { Pool } from "pg";
import { validateJWT } from "../../../utils/validateJWT";

@Service()
export default class AuthService {
  constructor() {}

  async authenticateUser(authHeader: string) {
    const { token, tokenType } = this._parseHeader(authHeader);

    switch (tokenType) {
      case "jwt":
        return this._authenticateJWTUser(token);
      default:
        return this.getGitHubUser(token);
    }
  }
  private _parseHeader(authHeader: string): {
    token: string;
    tokenType: string;
  } {
    const [type, token] = authHeader.split(" ");
    if (!token) throw new Error("Invalid authorization header format");

    return {
      token,
      tokenType: type.toLowerCase(),
    };
  }

  private async _authenticateJWTUser(token: string): Promise<Partial<User>> {
    const user = await this.decodeJWT(token);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  private async decodeJWT(token: string) {
    const userID = await validateJWT(token);
    const db = Container.get<Pool>("pool");
    const client = await db.connect();
    const result = await client.query(
      "SELECT id, username, email FROM users WHERE id = $1",
      [userID],
    );

    if (!result.rows?.[0]) return null;

    return {
      id: result.rows[0].id,
      username: result.rows[0].username,
      email: result.rows[0].email,
    };
  }

  async exchangeGithubToken(code: string) {
    if (!code) return new Error(" GITHUB CODE REQUIRED ");
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

    const tokenResponse = await axios.post(tokenUrl, reqBody, reqHeaders);

    if (!tokenResponse.data.access_token) {
      throw new Error("Failed to get access token from GitHub");
    }
    const user = await this.getGitHubUser(tokenResponse.data.access_token);

    return [tokenResponse.data.access_token, user];
  }

  async getGitHubUser(accessToken: string) {
    const tokenUrl = "https://api.github.com/user";
    const headers = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    };
    const { data } = await axios.get(tokenUrl, headers);
    return data;
  }
}
