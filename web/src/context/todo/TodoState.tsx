import React, { useReducer } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import TodoContext from './TodoContext';
import { todoReducer } from './todoReducer';

import {
  CREATE_TODO_REQUEST,
  CREATE_TODO_FAIL,
  CREATE_TODO_SUCCESS,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAIL,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAIL,
  GET_TODOS_REQUEST,
  GET_TODOS_SUCCESS,
} from '../../constants/TodoConstants';
import { isServer } from '../../utils/isServer';
import { API_URL } from '../../constants/API';

export const TodoState = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const initalState = {
    loading: false,
    todos: [],
    todo: {},
  };

  const [state, dispatch] = useReducer(todoReducer, initalState);

  const createTodo = async (text) => {
    dispatch({ type: CREATE_TODO_REQUEST });
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${!isServer() && localStorage.getItem('token')}`,
        },
      };
      const { data } = await axios.post(`${API_URL}/api/todo`, { text }, config);
      dispatch({ type: CREATE_TODO_SUCCESS, payload: data });
      router.push('/todo');
      getTodos();
    } catch (e) {
      console.error('CREATE NOTE ERROR', e);
    }
  };

  const getTodos = async () => {
    dispatch({ type: GET_TODOS_REQUEST });
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${!isServer() && localStorage.getItem('token')}`,
        },
      };
      const { data } = await axios.get(`${API_URL}/api/todo`, config);
      dispatch({ type: GET_TODOS_SUCCESS, payload: data });
    } catch (e) {
      console.error('CREATE NOTE ERROR', e);
    }
  };

  const deleteTodo = async (id: string) => {
    dispatch({ type: DELETE_TODO_REQUEST });
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${!isServer() && localStorage.getItem('token')}`,
        },
      };
      const { data } = await axios.delete(`${API_URL}/api/todo/${id}`, config);
      dispatch({ type: DELETE_TODO_SUCCESS, payload: data });
      getTodos();
    } catch (e) {
      console.error('DELETE NOTE ERROR', e);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        loading: state.loading,
        todos: state.todos,
        todo: state.todo,
        createTodo,
        getTodos,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
