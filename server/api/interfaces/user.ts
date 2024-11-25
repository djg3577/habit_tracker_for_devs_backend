export interface User {
  user_id: string;
  username: string;
  email: string;
  password: string;
  code: number;
}

export interface GithubUser {
  id: number;
  login?: string;
  username?: string;
}
