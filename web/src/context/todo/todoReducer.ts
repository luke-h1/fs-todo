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
  GET_SINGLE_TODO_FAIL,
  GET_SINGLE_TODO_REQUEST,
  GET_SINGLE_TODO_SUCCESS,
} from "../../constants/TodoConstants";

export const todoReducer = (state: any, action: any) => {
  switch (action.type) {
    default: {
      return state;
    }

    case GET_SINGLE_TODO_SUCCESS: {
      const { todo } = action.payload;
      return {
        todo,
        loading: false,
      };
    }

    case CREATE_TODO_SUCCESS: {
      const { todos } = action.payload;
      return {
        todos,
        loading: false,
      };
    }

    case GET_TODOS_SUCCESS: {
      const { todos } = action.payload;
      return {
        todos,
        loading: false,
      };
    }

    case GET_SINGLE_TODO_REQUEST:
    case GET_TODOS_REQUEST:
    case CREATE_TODO_REQUEST:
    case UPDATE_TODO_REQUEST:
    case DELETE_TODO_REQUEST: {
      return {
        loading: true,
      };
    }
  }
};
