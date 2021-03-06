import express from 'express';
import { isAuth } from '../middleware/isAuth';
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
  getTodo,
} from '../controllers/todoController';

const router = express.Router();

router.route('/').get(isAuth, getTodos).post(isAuth, createTodo);

router.route('/:id').put(isAuth, updateTodo).delete(isAuth, deleteTodo).post(isAuth, getTodo);

export default router;
