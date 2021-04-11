import Link from 'next/link';
import React, { useContext, useEffect } from 'react';
import styled from '@emotion/styled';
import { Router } from 'express';
import { useRouter } from 'next/router';
import todoContext from '../../context/todo/TodoContext';
import { Spinner } from '../../components/Spinner';
import { CustomLink } from '../../components/CustomLink';

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 1rem 0 1rem 0;
  width: 1000px;
`;

export const TodoIndex = () => {
  const router = useRouter();
  const TodoContext = useContext(todoContext);
  const {
    loading, todos, getTodos, deleteTodo,
  } = TodoContext;

  useEffect(() => {
    getTodos();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Flex>
      <h1 className="text-3xl">Your Todos</h1>
      {todos.length > 0 ? todos.map((t) => (
        <Flex key={t.id}>
          <div className="hover:bg-gray-100 focus:outline-none focus:ring-2 cursor-pointer rounded mb-4 min-w-lg w-full ">
            <Link href={`/todo/${t.id}`}>
              <div className="border-gray-300 p-5 rounded-md shadow-lg">
                <h4 className="text-xl font-semibold mb-2 text-left">{t.text}</h4>
                <p className="text-md font-semibold mb-2 text-left">
                  TODO ID:
                  {' '}
                  {t.id}
                </p>
                <div className="flex mt-5 mb-4 pb-4">
                  <p className="text-left">
                    CREATOR_ID:
                    {' '}
                    {' '}
                    {t.creatorId}
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex flex-row align-center items-center mt-2 mb-5">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4" type="button" onClick={() => { deleteTodo(t.id); }}>
              Delete Todo
            </button>
            {/* push to edit todo page, pass in id from router.params... */}
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={() => { }}>
              Edit Todo
            </button>
          </div>

        </Flex>
      )) : (
        <>
          <h1 className="text-2xl mt-20 mb-4">Looks like you've not created any todos.</h1>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={() => router.push('/')}>
            Click me to create some !
          </button>
        </>
      )}
    </Flex>
  );
};
