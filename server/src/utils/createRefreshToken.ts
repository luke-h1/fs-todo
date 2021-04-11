import { sign } from 'jsonwebtoken';
import { User } from '../entities/User';

export const createRefreshToken = (user: User) => sign({ userId: user.id, tokenVersion: user.tokenVersion }, process.env.REFRESH_TOKEN_SECRET!, {
  expiresIn: '7d',
});
