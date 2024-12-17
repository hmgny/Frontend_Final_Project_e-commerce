import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  TOGGLE_REMEMBER_ME
} from '../actions/authActions';

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
  rememberMe: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        error: null
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        error: null
      };
    case TOGGLE_REMEMBER_ME:
      return {
        ...state,
        rememberMe: !state.rememberMe
      };
    default:
      return state;
  }
};

export default authReducer;
