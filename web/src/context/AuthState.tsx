import React, { useReducer, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import AuthContext from './authContext';
import { authReducer } from './authReducer';

import {
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
    accessToken: !isServer() && localStorage.getItem('token'),
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async () => {
    try {
      dispatch({ type: LOGIN_REQUEST });
      const { data } = await axios.get('http://localhost:3000/auth/github');
      if (!data.accessToken) {
        console.error('no token');
        dispatch({ type: LOGIN_FAIL });
      }
      dispatch({ type: LOGIN_SUCCESS, payload: data });
    } catch (e) {
      console.error('no token');
      dispatch({ type: LOGIN_FAIL });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading: state.loading,
        accessToken: state.accessToken,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
