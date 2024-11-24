import { Service } from "typedi";
import axios from "axios";

@Service()
export default class AuthService {
  constructor() {}

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
