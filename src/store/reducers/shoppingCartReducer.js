import {
  SET_CART,
  SET_PAYMENT,
  SET_ADDRESS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_COUNT
} from "../actions/shoppingCartActions";

const initialState = {
  cart: [], // [{count, checked, product}]
  payment: {},
  address: {}
};

const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingItem = state.cart.find(
        (item) => item.product.id === action.payload.id
      );

      if (existingItem) {
        const updatedCart = state.cart.map((item) =>
          item.product.id === action.payload.id
            ? { ...item, count: item.count + 1 }
            : item
        );

        return {
          ...state,
          cart: updatedCart,
        };
      }

      const newItem = {
        count: 1,
        checked: true,
        product: action.payload,
      };

      return {
        ...state,
        cart: [...state.cart, newItem],
      };
    }


    case REMOVE_FROM_CART: {
      const filteredCart = state.cart.filter(
        (item) => item.product.id !== action.payload
      );

      return {
        ...state,
        cart: filteredCart,
      };
    }

    case UPDATE_CART_COUNT: {
      const updatedCart = state.cart.map((item) =>
        item.product.id === action.payload.id
          ? { ...item, count: action.payload.count }
          : item
      );

      return {
        ...state,
        cart: updatedCart,
      };
    }

    case SET_CART:
      return {
        ...state,
        cart: action.payload,
      };

    default:
      return state;
  }
};

export default shoppingCartReducer;