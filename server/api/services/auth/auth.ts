import { Pool } from "pg";
import { Container, Service } from "typedi";
@Service()
export default class AuthService {
  constructor(private db: Pool) {}

  //! WILL COME BACK TO THIS LATER maybe hehe
  async getUserByEmail(email: string) {
    const result = await this.db.query(
      "SELECT id, username, email, code FROM users WHERE email = $1",
      [email],
    );
    const user =  result.rows[0];
    await this.verifyUserEmail(user.id)
  }

  async verifyUserEmail(userId: string) {
    try {
    } catch (error) {
      console.log(error);
    }
  }
}
