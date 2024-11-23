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

  async getUserByEmail(req, res) {
    try {
      const authService = Container.get(AuthService);
      const result = authService.getUserByEmail(req.email);
      return res.status(200).json({ result });
    } catch (error) {
      console.log(error);
    }
  },

  async verifyUserEmail(req, res) {
    try {
      await this.db.query;
    } catch (error) {
      console.log(error);
    }
  },
};
