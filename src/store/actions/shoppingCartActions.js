export const SET_CART = 'SET_CART';
export const SET_PAYMENT = 'SET_PAYMENT';
export const SET_ADDRESS = 'SET_ADDRESS';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_COUNT = 'UPDATE_CART_COUNT';
export const TOGGLE_CART_ITEM = 'TOGGLE_CART_ITEM';
export const CLEAR_CART = 'CLEAR_CART';

export const toggleCartItem = (productId) => ({
  type: TOGGLE_CART_ITEM,
  payload: productId
});

export const setCart = (cart) => ({
  type: SET_CART,
  payload: cart
});

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId
});

export const updateCartCount = (productId, count) => ({
  type: UPDATE_CART_COUNT,
  payload: { id: productId, count }
});

export const setPayment = (payment) => ({
  type: SET_PAYMENT,
  payload: payment
});

export const setAddress = (address) => ({
  type: SET_ADDRESS,
  payload: address
});

export const clearCart = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_CART });
    return true;
  } catch (error) {
    console.error('Error clearing cart:', error);
    return false;
  }
};
