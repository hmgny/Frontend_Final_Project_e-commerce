export const SET_USER = 'SET_USER';
export const SET_ROLES = 'SET_ROLES';
export const SET_THEME = 'SET_THEME';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_SELECTED_ROLE = 'SET_SELECTED_ROLE';
export const SET_FETCH_STATE = 'SET_FETCH_STATE';
export const SET_LOADING = 'SET_LOADING';

export const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

export const setRoles = (roles) => ({
  type: SET_ROLES,
  payload: roles
});

export const setSelectedRole = (roleId) => ({
  type: SET_SELECTED_ROLE,
  payload: roleId
});

export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme
});

export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language
});

export const setFetchState = (state) => ({
  type: SET_FETCH_STATE,
  payload: state
});

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading
});
