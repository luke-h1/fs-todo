import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from '../constants/AuthConstants';

export const authReducer = (state: any, action: any) => {
  switch (action.type) {
    default: {
      return state;
    }
    case LOGIN_SUCCESS: {
      const token = action.payload.accesstoken;
      localStorage.setItem('token', token);
      return {
        accessToken: token,
        loading: false,
        user: action.payload.user,
      };
    }

    case LOGIN_REQUEST: {
      return {
        loading: false,
      };
    }

    case LOGIN_FAIL: {
      return {
        accessToken: null,
        loading: false,
        user: null,
      };
    }
  }
};
