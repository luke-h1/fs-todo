import { Formik, Form } from 'formik';
import React, { useContext } from 'react';
import { CustomInput } from '../components/CustomInput';
import { Spinner } from '../components/Spinner';
import { Wrapper } from '../components/Wrapper';
import todoContext from '../context/todo/TodoContext';

export const CreateTodo: React.FC<{}> = () => {
  const TodoContext = useContext(todoContext);
  const { loading, notes, createTodo } = TodoContext;
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
      {/* display todos here  */}
    </Wrapper>
  );
};
