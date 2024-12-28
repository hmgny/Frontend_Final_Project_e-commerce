import axios from 'axios';

// Action Types
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const TOGGLE_REMEMBER_ME = 'TOGGLE_REMEMBER_ME';
export const SET_USER = 'SET_USER';

// Action Creators
export const loginStart = () => ({
  type: LOGIN_START
});

export const loginSuccess = (userData) => {
  // Her zaman token'ı localStorage'a kaydedelim
  localStorage.setItem('token', userData.token);
  localStorage.setItem('user', JSON.stringify(userData.user));
  
  return {
    type: LOGIN_SUCCESS,
    payload: userData
  };
};

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error
});

export const toggleRememberMe = () => ({
  type: TOGGLE_REMEMBER_ME
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  delete axios.defaults.headers.common['Authorization'];
  window.location.href = '/login'; // Çıkış yapınca login sayfasına yönlendir
  
  return {
    type: LOGOUT
  };
};

export const verifyToken = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    try {
      // Set token in axios header
      axios.defaults.headers.common['Authorization'] = token;
      
      // Verify token
      const response = await axios.get('https://workintech-fe-ecommerce.onrender.com/verify');
      
      // If successful, update user in store
      dispatch(setUser(response.data));
      
      // Update token in case it was renewed
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['Authorization'] = response.data.token;
      }
    } catch (error) {
      // If verification fails, logout
      dispatch(logout());
    }
  }
};

export const login = (credentials, rememberMe) => async (dispatch) => {
  try {
    const response = await axios.post('https://workintech-fe-ecommerce.onrender.com/login', credentials);
    const { token, user } = response.data;
    
    if (rememberMe) {
      localStorage.setItem('token', token);
    }
    
    axios.defaults.headers.common['Authorization'] = token;
    dispatch(setUser(user));
    
    return true;
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  }
};
