// Action Types
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const TOGGLE_REMEMBER_ME = 'TOGGLE_REMEMBER_ME';

// Action Creators
export const loginStart = () => ({
  type: LOGIN_START
});

export const loginSuccess = (userData) => ({
  type: LOGIN_SUCCESS,
  payload: userData
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error
});

export const toggleRememberMe = () => ({
  type: TOGGLE_REMEMBER_ME
});

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return {
    type: LOGOUT
  };
};
