import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';

export const isAuth: RequestHandler<{}, any, any, {}> = (req, _, next) => {
  const authHeader = req.headers.authorization;
  console.log('authHeader', authHeader);
  if (!authHeader) {
    throw new Error('not authenticated');
  }
  const token = authHeader?.split(' ')[1];
  console.log('token', authHeader.split(' ')[1]);
  if (!token) {
    throw new Error('not authenticated');
  }

  try {
    const payload: any = verify(token!, process.env.ACCESS_TOKEN_SECRET);
    console.log('PAYLOAD', payload);
    req.userId = payload.userId;
    next();
    return;
  } catch {
    throw new Error('token expired probably');
  }
};
