declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    ACCESS_TOKEN_SECRET: string;
    DATABASE_URL: string;
  }
}