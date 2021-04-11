export const API_URL: string = process.env.NODE_ENV === 'production'
  ? 'deployed_api'
  : 'http://localhost:3000';
