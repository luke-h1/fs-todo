import Link from 'next/link';
import React, { useContext, useEffect } from 'react';
import styled from '@emotion/styled';
import todoContext from '../../context/todo/TodoContext';
import { Spinner } from '../../components/Spinner';

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
  const TodoContext = useContext(todoContext);
  const {
    loading, todos, getTodos,
  } = TodoContext;

  useEffect(() => {
    getTodos();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Flex>
      <h1>Your Todos</h1>
      {todos !== null ? todos.map((t) => (
        <Flex key={t.id}>
          <Link href={`/todo/${t.id}`}>
            <div className="hover:bg-gray-100 focus:outline-none focus:ring-2 cursor-pointer rounded mb-4 min-w-lg w-full">
              <div className="border-gray-300 p-5 rounded-md shadow-lg">
                <h4 className="text-xl font-semibold mb-2 text-left">{t.text}</h4>
                <p className="text-md font-semibold mb-2 text-left">
                  TODO ID:
                  {t.id}
                </p>
                <div className="flex mt-5 mb-4 pb-4">
                  <p className="text-left">
                    CREATOR_ID:
                    {t.creatorId}
                  </p>
                </div>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4" type="button" onClick={() => { }}>
                  Delete Todo
                </button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={() => { }}>
                  Edit Todo
                </button>

              </div>
            </div>
          </Link>
        </Flex>
      )) : (
        <h1>no todos to show</h1>
      )}
    </Flex>
  );
};
