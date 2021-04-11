import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import { join } from 'path';
import cors from 'cors';
import { verify } from 'jsonwebtoken';
import { User } from './entities/User';
import { __prod__ } from './constants';
import todoRoutes from './routes/todoRoutes';
import authRoutes from './routes/authRoutes';

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

  /* auth stuff - move this stuff into auth controller / auth routes */
  app.get('/auth/:id', async (req, res) => {
    res.send({ accessToken: req.params.id });
  });

  app.get('/me', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.send({ user: null });
      return;
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      res.send({ user: null });
      return;
    }

    let userId = '';
    try {
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET);
      userId = payload.userId;
    } catch (e) {
      res.send({ user: null });
      return;
    }
    if (!userId) {
      res.send({ user: null });
      return;
    }
    const user = await User.findOne(userId);
    res.send({ user });
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
