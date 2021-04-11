import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../constants/AuthConstants";

export const authReducer = (state: any, action: any) => {
  switch (action.type) {
    default: {
      return state;
    }
    case LOGIN_SUCCESS: {
      const { token } = action.payload;
      localStorage.setItem("token", token);
      return {
        accessToken: token,
        loading: false,
        user: action.payload.user,
      };
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

    case REGISTER_SUCCESS: {
      return {
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
      };
    }
  }
};
