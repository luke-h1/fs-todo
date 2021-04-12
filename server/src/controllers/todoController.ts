import { createQueryBuilder, getConnection } from 'typeorm';
import { Todo } from '../entities/Todo';

const getTodos = async (req, res) => {
  const todos = await Todo.find({
    where: { creatorId: req.userId },
    order: { id: 'DESC' },
  });
  res.status(200).json({ todos });
};

const getTodo = async (req, res) => {
  if (!req.body.userId || !req.body.id) {
    console.log('req.body.userId', req.body.userId);
    console.log('req.body.id', req.body.id);
    throw new Error('no params');
  }

  const todo = await getConnection().query(
    `
  SELECT * FROM "todo" 
  WHERE (todo."creatorId" = $1 AND "id" = $2)

  `,
    [req.body.userId, req.body.id],
  );
  res.status(200).json({ todo });
};

// const getTodo = async (req, res) => {
//   const todo = await getConnection()
//     .createQueryBuilder()
//     .select('todo')
//     .where('id = :id and "creatorId" = :creatorId', {
//       id: req.body.id,
//       creatorId: req.body.userId,
//     })
//     .getRawMany();

//   if (todo) {
//     res.status(200).json({ todo });
//   }
// };

// const getTodo = async (req, res) => {
//   const todo = await Todo.findOne({
//     where: { id: req.body.id }

//   })
//   const todo = await Todo.findOne({
//     where: { creatorId: req.userId },
//     order: { id: 'DESC' },
//   });
//   res.status(200).json({ todo });
// };

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
  getTodos, createTodo, updateTodo, deleteTodo, getTodo,
};
