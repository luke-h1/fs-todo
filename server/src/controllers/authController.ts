import argon2 from 'argon2';
import { getConnection } from 'typeorm';
import { sendRefreshToken } from '../utils/sendRefreshToken';
import { createRefreshToken } from '../utils/createRefreshToken';
import { createAccessToken } from '../utils/createAccessToken';
import { User } from '../entities/User';
import { validateRegister } from '../utils/validateRegister';

const register = async (req, res) => {
  const { email, password }: { email: string; password: string } = req.params;
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
    console.log('USER', user);
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
      // log user in after succesfull registration
      const token = createAccessToken(user);
      sendRefreshToken(res, createRefreshToken(user));
      return { user, token };
    }
  }
};

export { register };
