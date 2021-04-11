import "reflect-metadata";
require("dotenv-safe").config();
import express from "express";
import { createConnection } from "typeorm";
import { __prod__ } from "./constants";
import { join } from "path";
import { User } from "./entities/User";
import { Strategy as GithubStrategy } from "passport-github";
import passport from "passport";
import cors from "cors";
import { Todo } from "./entities/Todo";
import { isAuth } from "./middleware/isAuth";
import { sign, verify } from "jsonwebtoken";

const main = async () => {
  await createConnection({
    type: "postgres",
    database: "githubTodo",
    entities: [join(__dirname, "./entities/*.*")],
    logging: !__prod__,
    synchronize: !__prod__,
    // dropSchema: true,
  });
  const app = express();

  passport.serializeUser((user: any, done) => {
    done(null, user.accessToken);
  });

  app.use(cors({ origin: "*" })); // TODO: change this when ready for deploy
  app.use(passport.initialize());
  app.use(express.json());

  passport.use(
    new GithubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/github/callback",
      },
      async (_, __, profile, cb) => {
        let user = await User.findOne({ where: { githubId: profile.id } });
        if (user) {
          // user already exists, just update their details
          user.name = profile.displayName;
          await user.save();
        } else {
          // user doesn't exist. Create a new user
          user = await User.create({
            name: profile.displayName,
            githubId: profile.id,
          }).save();
        }
        cb(null, {
          accessToken: sign(
            { userId: user.id },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "1y", // TODO: change this when ready for deploy
            }
          ),
        });
      }
    )
  );

  app.get("/auth/github", passport.authenticate("github", { session: false }));

  app.get(
    "/auth/github/callback",
    passport.authenticate("github", { session: false }),
    function (req: any, res) {
      res.redirect(`http://localhost:54321/auth/${req.user.accessToken}`);
    }
  );

  app.get(`/todo`, isAuth, async (req, res) => {
    const todos = await Todo.find({
      where: { creatorId: req.userId },
      order: { id: "DESC" },
    });
    res.send({ todos });
  });

  app.post("/todo", isAuth, async (req, res) => {
    const todo = await Todo.create({
      text: req.body.text,
      creatorId: req.userId,
    }).save();
    res.send({ todo });
  });

  app.put("/todo", isAuth, async (req, res) => {
    const todo = await Todo.findOne(req.body.id);
    if (!todo) {
      res.send({ todo: null });
      return;
    }
    if (todo.creatorId !== req.userId) {
      throw new Error("not authorized");
    }
    todo.completed = !todo.completed;
    await todo.save();
    res.send({ todo });
  });

  app.delete("/todo", isAuth, async (req, res) => {
    const todo = await Todo.findOne(req.body.id);
    if (!todo) {
      res.send({ todo: null });
      return;
    }
    if (todo.creatorId !== req.userId) {
      throw new Error("not authorized");
    }
    await todo.remove();
    res.send({ deleted: true });
  });

  app.get("/me", async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.send({ user: null });
      return;
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      res.send({ user: null });
      return;
    }

    let userId = "";
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

  app.get("/", (_, res) => {
    res.send("API is running");
  });

  app.listen(3000, () => {
    console.log("listening on 3000");
  });
};
main().catch((e) => console.error(e));
