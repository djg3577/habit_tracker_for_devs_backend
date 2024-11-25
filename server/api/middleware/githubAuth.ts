import axios from "axios";
interface GithubUser {
  id: number;
  login: string;
}

declare global {
  namespace Express {
    interface Request {
      userID?: string;
      githubUser?: GithubUser;
    }
  }
}

const githubAuthMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ error: "NO authorization header provided" });

  const [bearer, token] = authHeader.split(" ");

  if (!bearer || !token || bearer.toLowerCase() !== "bearer") {
    return res.status(401).json({ error: "Invalid token format" });
  }

  try {
    const tokenUrl = "https://api.github.com/user";
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    };
    const { data } = await axios.get(tokenUrl, headers);
    req.user = data;
    next();
  } catch (error) {
    console.log("ERROR WITH GITHUB AUTH", error);
  }
};

export default githubAuthMiddleware;
