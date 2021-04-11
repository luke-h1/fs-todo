declare namespace Express {
  export interface Request {
    userId: number;
    accessToken: string;
  }
}
