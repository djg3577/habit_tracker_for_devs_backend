import Container, { Service } from "typedi";
import { User } from "../../interfaces/user";
import { Pool } from "pg";
export interface Activity {
  id?: number;
  userId: number;
  activity_name: string;
  duration: number; // Duration in minutes
  date: string;
}

type GithubUser = {
  login: string;
  id: number;
};

@Service()
export default class ActivityService {
  async logActivity(activity: Activity, user: GithubUser) {
    const db = Container.get<Pool>("pool");
    const client = await db.connect();
    await client.query(
      "INSERT INTO activity (github_id, activity_name, duration, date) VALUES ($1, $2, $3, $4)",
      [
        user.id,
        activity.activity_name.toUpperCase(),
        activity.duration,
        activity.date,
      ],
    );

    client.release();
  }
  async getActivityTotals(github_id: GithubUser["id"]) {
    const db = Container.get<Pool>("pool");
    const client = await db.connect();
    const result = await client.query(
      `SELECT activity_name,
          SUM(duration) as total_duration,
          COUNT(*) as total_sessions
        FROM activity
        WHERE github_id = $1
        GROUP BY activity_name`,
      [github_id],
    );
    client.release();
    return result.rows;
  }
  async getActivityDates(github_id: GithubUser["id"]) {
    const db = Container.get<Pool>("pool");
    const client = await db.connect();
    const result = await client.query(
      `SELECT date, COUNT(*) FROM activity WHERE github_id = $1 GROUP BY date`,
      [github_id],
    );
    return result.rows;
  }
  async createUserFromGithubID(githubUser: GithubUser) {
    const db = Container.get<Pool>("pool");
    const client = await db.connect();

    await client.query("BEGIN");
    const existingUserResult = await client.query(
      `SELECT user_id FROM "user" WHERE github_id = $1`,
      [githubUser.id],
    );

    if (existingUserResult.rows.length > 0) return await client.query("COMMIT");

    await client.query(
      `INSERT INTO "user" (github_id, github_login) VALUES ($1, $2) RETURNING user_id`,
      [githubUser.id, githubUser.login],
    );

    return await client.query("COMMIT");
  }
}
