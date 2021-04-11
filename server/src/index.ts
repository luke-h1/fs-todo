import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import { join } from 'path';
import cors from 'cors';
import { verify } from 'jsonwebtoken';
import { __prod__ } from './constants';
import todoRoutes from './routes/todoRoutes';
import authRoutes from './routes/authRoutes';
import { sendRefreshToken } from './utils/sendRefreshToken';
import { User } from './entities/User';
import { createAccessToken } from './utils/createAccessToken';
import { createRefreshToken } from './utils/createRefreshToken';

require('dotenv-safe').config();

const { PORT } = process.env;

const main = async () => {
  await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: !__prod__,
    migrations: [join(__dirname, './migrations/*.*')],
    synchronize: !__prod__,
    entities: [join(__dirname, './entities/*.*')],
  });
  const app = express();
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    }),
  );
  app.use(express.json());

  app.post('/refresh_token', async (req, res) => {
    const token = req.cookies.jid;
    if (!token) {
      return res.send({ ok: false, accessToken: '' });
    }
    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (e) {
      console.log(e);
      return res.send({ ok: false, accessToken: '' });
    }
    // token is valid & we can send back an acess token
    const user = await User.findOne({ id: payload.userId });
    if (!user) {
      return res.send({ ok: false, accessToken: '' });
    }
    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: '' });
    }
    sendRefreshToken(res, createRefreshToken(user));
    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });

  app.use('/api/todo', todoRoutes);

  app.use('/api/auth', authRoutes);

  app.get('/', (_, res) => {
    res.send('API is running');
  });

  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT} 🚀`);
  });
};
main().catch((e) => console.error(e));
