import { response } from 'express';

export const sendRefreshToken = (res: typeof response, token: string) => {
  res.cookie('jid', token, {
    httpOnly: true,
    path: '/refresh_token',
  });
};
