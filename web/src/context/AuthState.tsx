import React, { useReducer, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import AuthContext from './authContext';
import { authReducer } from './authReducer';

import {
  REGISTER_REQUEST,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from '../constants/AuthConstants';
import { isServer } from '../utils/isServer';
import { API_URL } from '../constants/API';

export const AuthState = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const initialState = {
    loading: false,
    token: !isServer() && localStorage.getItem('token'),
    user: null,

  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const register = async (email, password) => {
    dispatch({ type: REGISTER_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data } = await axios.post(`${API_URL}/api/auth/register`, { email, password }, config);
      dispatch({ type: REGISTER_SUCCESS, payload: data });
      router.push('/');
    } catch (e) {
      dispatch({ type: REGISTER_FAIL });
    }
  };

  const login = async (email, password) => {
    dispatch({ type: LOGIN_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data } = await axios.post(`${API_URL}/api/auth/login`, { email, password }, config);
      dispatch({ type: LOGIN_SUCCESS, payload: data });
      router.push('/');
    } catch (e) {
      dispatch({ type: LOGIN_FAIL });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading: state.loading,
        token: state.token,
        user: state.user,
        register,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
