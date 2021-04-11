import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import { join } from 'path';
import { Strategy as GithubStrategy } from 'passport-github';
import passport from 'passport';
import cors from 'cors';
import { sign, verify } from 'jsonwebtoken';
import { readFileSync } from 'node:fs';
import { Todo } from './entities/Todo';
import { isAuth } from './middleware/isAuth';
import { User } from './entities/User';
import { __prod__ } from './constants';

require('dotenv-safe').config();

const main = async () => {
  await createConnection({
    type: 'postgres',
    database: 'githubTodo',
    entities: [join(__dirname, './entities/*.*')],
    logging: !__prod__,
    synchronize: !__prod__,
    // dropSchema: true,
  });
  const app = express();

  passport.serializeUser((user: any, done) => {
    done(null, user.accessToken);
  });

  app.use(
    cors({
      origin: '*',
      credentials: true,
    }),
  );

  app.use('*', (_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
  app.use(express.json());

  //   todo - update a todo

  app.get('/auth/:id', async (req, res) => {
    res.send({ accessToken: req.params.id });
  });

  app.get('/todo', isAuth, async (req, res) => {
    const todos = await Todo.find({
      where: { creatorId: req.userId },
      order: { id: 'DESC' },
    });
    res.send({ todos });
  });

  app.post('/todo', isAuth, async (req, res) => {
    const todo = await Todo.create({
      text: req.body.text,
      creatorId: req.userId,
    }).save();
    res.send({ todo });
  });

  app.put('/todo', isAuth, async (req, res) => {
    const todo = await Todo.findOne(req.body.id);
    if (!todo) {
      res.send({ todo: null });
      return;
    }
    if (todo.creatorId !== req.userId) {
      throw new Error('not authorized');
    }
    todo.completed = !todo.completed;
    await todo.save();
    res.send({ todo });
  });

  app.delete('/todo', isAuth, async (req, res) => {
    const todo = await Todo.findOne(req.body.id);
    if (!todo) {
      res.send({ todo: null });
      return;
    }
    if (todo.creatorId !== req.userId) {
      throw new Error('not authorized');
    }
    await todo.remove();
    res.send({ deleted: true });
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

  app.get('/', (_, res) => {
    res.send('API is running');
  });

  app.listen(3000, () => {
    console.log('listening on 3000');
  });
};
main().catch((e) => console.error(e));
