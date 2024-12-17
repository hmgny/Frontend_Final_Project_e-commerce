import {
  SET_USER,
  SET_ROLES,
  SET_THEME,
  SET_LANGUAGE,
  SET_SELECTED_ROLE,
  SET_FETCH_STATE,
  SET_LOADING
} from '../actions/clientActions';

const initialState = {
  user: {},
  addressList: [],
  creditCards: [],
  roles: [],
  selectedRole: 'customer',
  theme: 'light',
  language: 'en',
  fetchState: 'NOT_FETCHED',
  loading: false
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    case SET_ROLES:
      return {
        ...state,
        roles: action.payload
      };
    case SET_SELECTED_ROLE:
      return {
        ...state,
        selectedRole: action.payload
      };
    case SET_THEME:
      return {
        ...state,
        theme: action.payload
      };
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };
    case SET_FETCH_STATE:
      return {
        ...state,
        fetchState: action.payload
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};

export default clientReducer;
