import { FETCH_ADDRESSES, ADD_ADDRESS, UPDATE_ADDRESS, DELETE_ADDRESS } from "../actions/orderActions";

const initialState = {
  addresses: [],
  loading: false,
  error: null
};

export const orderReducer = (state = initialState, action) => {
  console.log('Reducer received action:', action); // Debug için ekle
  switch (action.type) {
    case FETCH_ADDRESSES:
      console.log('Updating addresses in reducer:', action.payload); // Debug için ekle
      return {
        ...state,
        addresses: action.payload || [], // Null check ekle
        loading: false
      };
    case ADD_ADDRESS:
      return {
        ...state,
        addresses: Array.isArray(state.addresses) 
          ? [...state.addresses, action.payload]
          : [action.payload]
      };
    case UPDATE_ADDRESS:
      return {
        ...state,
        addresses: state.addresses.map(address => 
          address.id === action.payload.id ? action.payload : address
        )
      };
    case DELETE_ADDRESS:
      return {
        ...state,
        addresses: state.addresses.filter(address => address.id !== action.payload)
      };
    default:
      return state;
  }
};

export default orderReducer;