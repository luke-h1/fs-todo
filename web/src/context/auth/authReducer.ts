import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from '../../constants/AuthConstants';

export const authReducer = (state: any, action: any) => {
  switch (action.type) {
    default: {
      return state;
    }

    case REGISTER_REQUEST:
    case LOGIN_REQUEST: {
      return {
        loading: true,
        user: null,
        accessToken: null,
      };
    }

    case REGISTER_FAIL:
    case LOGIN_FAIL: {
      return {
        accessToken: null,
        loading: false,
        user: null,
      };
    }

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS: {
      const { token, user } = action.payload;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      return {
        loading: false,
        user,
        token,
      };
    }
  }
};
