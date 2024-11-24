import Container from "typedi";
import AuthService from "../../services/auth/auth";

export default {
  async decodeJWT(req, res) {
    try {
      return res.status(200).json({
        user: req.githubUser,
        userId: req.userID,
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
