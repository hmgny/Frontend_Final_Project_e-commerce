import {
  SET_CART,
  SET_PAYMENT,
  SET_ADDRESS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_COUNT
} from "../actions/shoppingCartActions";

const initialState = {
  // LocalStorage'dan sepet verilerini al, yoksa boş array kullan
  cart: JSON.parse(localStorage.getItem('cart')) || [], 
  payment: {},
  address: {}
};

const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingItem = state.cart.find(
        (item) => item.product.id === action.payload.id
      );

      let updatedCart;
      if (existingItem) {
        updatedCart = state.cart.map((item) =>
          item.product.id === action.payload.id
            ? { ...item, count: item.count + 1 }
            : item
        );
      } else {
        const newItem = {
          count: 1,
          checked: true,
          product: action.payload,
        };
        updatedCart = [...state.cart, newItem];
      }

      // Sepet güncellendiğinde localStorage'a kaydet
      localStorage.setItem('cart', JSON.stringify(updatedCart));

      return {
        ...state,
        cart: updatedCart,
      };
    }

    case REMOVE_FROM_CART: {
      const filteredCart = state.cart.filter(
        (item) => item.product.id !== action.payload
      );
      
      // Sepetten ürün silindiğinde localStorage'ı güncelle
      localStorage.setItem('cart', JSON.stringify(filteredCart));

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

      // Ürün miktarı güncellendiğinde localStorage'ı güncelle 
      localStorage.setItem('cart', JSON.stringify(updatedCart));

      return {
        ...state,
        cart: updatedCart,
      };
    }

    case SET_CART: {
      // Sepet tamamen değiştirildiğinde localStorage'ı güncelle
      localStorage.setItem('cart', JSON.stringify(action.payload));
      
      return {
        ...state,
        cart: action.payload,
      };
    }

    default:
      return state;
  }
};

export default shoppingCartReducer;