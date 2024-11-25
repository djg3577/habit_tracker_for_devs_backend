import Container from "typedi";
import AuthService from "../../services/auth/auth";

export default {
  async decodeJWT(req, res) {
    try {
      const authService = Container.get(AuthService);
      const authHeader = req.headers.authorization;
      if (!authHeader)
        return res.status(401).json({ error: "Missing Authorization header" });
      
      const user = await authService.authenticateUser(authHeader);
      return res.status(200).json({
        user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  async GithubLogin(req, res) {
    try {
      const { code } = req.body;
      const authService = Container.get(AuthService);
      const response = await authService.exchangeGithubToken(code);

      return res.status(200).json({
        response,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  },
};
