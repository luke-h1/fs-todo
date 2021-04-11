import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import { join } from 'path';
import cors from 'cors';
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
