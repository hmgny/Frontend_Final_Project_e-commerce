import { FETCH_ADDRESSES, ADD_ADDRESS, UPDATE_ADDRESS, DELETE_ADDRESS } from "../actions/orderActions";

const initialState = {
  addresses: [],
  loading: false,
  error: null
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADDRESSES:
      return {
        ...state,
        addresses: action.payload,
        loading: false
      };
    case ADD_ADDRESS:
      return {
        ...state,
        addresses: [...state.addresses, action.payload]
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