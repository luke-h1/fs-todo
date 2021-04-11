import express from 'express';
import { login, register } from '../controllers/authController';

const router = express.Router();

router.route('/register').post(register);

router.route('/').post(login);

export default router;
