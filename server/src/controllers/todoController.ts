import { Response } from 'express';
import { Todo } from 'src/entities/Todo';

const getTodos = async (req, res) => {
  const todos = await Todo.find({
    where: { creatorId: req.userId },
    order: { id: 'DESC' },
  });
  res.status(200).json({ todos });
};

const createTodo = async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    creatorId: req.userId,
  }).save();
  res.status(201).json({ todo });
};

const updateTodo = async (req, res) => {
  const todo = await Todo.findOne(req.body.id);
  if (!todo) {
    return res.status(200).json({ todo: null });
  }
  if (todo.creatorId !== req.userId) {
    throw new Error('not authorized');
  }
  todo.completed = !todo.completed;
  todo.text = req.body.text || todo.text;
  await todo.save();
  res.status(204).json({ todo });
};

const deleteTodo = async (req, res) => {
  const todo = await Todo.findOne(req.body.id);
  if (!todo) {
    return res.status(200).json({ todo: null });
  }
  if (todo.creatorId !== req.userId) {
    throw new Error('not authorized');
  }
  await todo.remove();
  res.status(200).json({ deleted: true });
};

export {
  getTodos, createTodo, updateTodo, deleteTodo,
};
