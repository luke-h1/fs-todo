import { sign } from 'jsonwebtoken';
import { User } from '../entities/User';

export const createAccessToken = (user: User) => sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
  expiresIn: '1d',
});
