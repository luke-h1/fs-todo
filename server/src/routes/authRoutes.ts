import express from 'express';
import { isAuth } from '../middleware/isAuth';
import {
  login, logout, me, register,
} from '../controllers/authController';

const router = express.Router();

router.route('/register').post(register);

router.route('/login').post(login);

router.route('/logout').get(isAuth, logout);

router.route('/me').get(isAuth, me);

export default router;
