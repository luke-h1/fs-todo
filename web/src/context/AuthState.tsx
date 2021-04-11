import React, { useReducer, useContext } from 'react';
import { useRouter } from 'next/router';
import AuthContext from './authContext';
import { authReducer } from './authReducer';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from '../constants/AuthConstants';

export const AuthState = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const initialState = {
    loading: false,

  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        loading: state.loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
