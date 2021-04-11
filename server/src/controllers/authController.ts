import argon2 from 'argon2';
import { getConnection } from 'typeorm';
import { verify } from 'jsonwebtoken';
import { sendRefreshToken } from '../utils/sendRefreshToken';
import { createRefreshToken } from '../utils/createRefreshToken';
import { createAccessToken } from '../utils/createAccessToken';
import { User } from '../entities/User';
import { validateRegister } from '../utils/validateRegister';

interface userInfo {
  email: string;
  password: string;
}

const register = async (req, res) => {
  const { email, password }: userInfo = req.body;
  const errors = validateRegister(email, password);
  if (errors) {
    res.status(400).json({ errors });
  }
  const hashedPassword = await argon2.hash(password);
  let user;
  try {
    const result = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        email,
        password: hashedPassword,
      })
      .returning('*')
      .execute();
    user = result.raw[0];
    // log user in after succesfull registration
    const token = createAccessToken(user);
    sendRefreshToken(res, createRefreshToken(user));
    res.status(200).json({ user, token });
  } catch (e) {
    if (e.code === '23505') {
      res.status(400).json({
        errors: [
          {
            field: 'email',
            message: 'email already taken',
          },
        ],
      });
    }
  }
};

const login = async (req, res) => {
  const { email, password }: userInfo = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    res.status(400).json({
      errors: [
        {
          field: 'email',
          message: "user doesn't exist",
        },
      ],
    });
  }
  const valid = await argon2.verify(user!.password, password);
  if (!valid) {
    res.status(400).json({
      errors: [
        {
          field: 'email',
          message: 'unauthorized',
        },
      ],
    });
  }
  // login is successfull
  const token = createAccessToken(user!);
  sendRefreshToken(res, createRefreshToken(user!));
  res.status(200).json({ user, token });
};

const logout = async (req, res) => {
  sendRefreshToken(res, '');
  res.status(200).json({ token: null, user: null });
};

const me = async (req, res) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    res.status(400).send({ user: null });
  }
  try {
    const token = authorization.split(' ')[1];
    const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findOne(payload.user.id);
    res.status(200).json({ user });
  } catch (e) {
    console.error(e);
  }
};

export {
  register, login, logout, me,
};
