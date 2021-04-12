/* eslint-disable radix */
import { Router, useRouter } from 'next/router';
import React, { Fragment, useContext, useEffect } from 'react';
import todoContext from '../../context/todo/TodoContext';

export const EditTogoPage: React.FC<{}> = () => {
  const router = useRouter();
  const TodoContext = useContext(todoContext);
  const { loading, getSingleTodo, todo } = TodoContext;

  useEffect(() => {
    // use effect to get note by id and display in edit form
  }, []);

  return (
    <>
      {todo && (
      <h1>{todo.text}</h1>
      )}
      <h1 className="text-3xl">
        todo id is:
        {' '}
        {router.query.id}
      </h1>
    </>
  );
};
