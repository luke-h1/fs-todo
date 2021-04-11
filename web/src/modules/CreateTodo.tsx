import { Formik, Form } from 'formik';
import React, { useContext, useEffect } from 'react';
import styled from '@emotion/styled';
import { CustomInput } from '../components/CustomInput';
import { Spinner } from '../components/Spinner';
import { Wrapper } from '../components/Wrapper';
import todoContext from '../context/todo/TodoContext';

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 0 1rem 0;
  width: 1000px;
`;

export const CreateTodo: React.FC<{}> = () => {
  const TodoContext = useContext(todoContext);
  const {
    loading, todos, createTodo, getTodos,
  } = TodoContext;

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Wrapper>
      {loading && <h1>loading</h1>}
      <h1 className="mt-60">Create a note</h1>
      <Formik
        initialValues={{ text: '' }}
        onSubmit={async (values, { setErrors }) => {
          const { text } = values;
          await createTodo(text);
        }}

      >
        {({ isSubmitting }) => (
          <Form>
            <CustomInput name="text" placeholder="text" label="text" />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-8 rounded"
              type="submit"
              disabled={isSubmitting}
            >
              Create note
            </button>
            {loading && <Spinner />}
          </Form>
        )}
      </Formik>
      {todos && todos.map((t) => (
        <Flex key={t.id}>
          <div className="hover:bg-gray-100 focus:outline-none focus:ring-2 cursor-pointer rounded mb-4 min-w-lg w-full">
            <div className="border-gray-300 p-5 rounded-md shadow-lg">
              <h4 className="text-xl font-semibold mb-2 text-left">{t.text}</h4>
              <p className="text-md font-semibold mb-2 text-left">
                TODO ID:
                {t.id}
              </p>
              <div className="flex mt-5">
                <p className="text-left">
                  CREATOR_ID:
                  {t.creatorId}
                </p>
              </div>
            </div>
          </div>
        </Flex>
      ))}

    </Wrapper>
  );
};
