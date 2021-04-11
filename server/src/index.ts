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
import { profile } from "node:console";
import { sign } from "jsonwebtoken";

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
};
