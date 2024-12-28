import axios from 'axios';

export const FETCH_CARDS = 'FETCH_CARDS';
export const ADD_CARD = 'ADD_CARD';
export const UPDATE_CARD = 'UPDATE_CARD';
export const DELETE_CARD = 'DELETE_CARD';

export const fetchCards = () => async (dispatch) => {
  try {
    const response = await axios.get('https://workintech-fe-ecommerce.onrender.com/user/card');
    dispatch({ type: FETCH_CARDS, payload: response.data });
  } catch (error) {
    console.error('Error fetching cards:', error);
  }
};

export const addCard = (cardData) => async (dispatch) => {
  try {
    const response = await axios.post('https://workintech-fe-ecommerce.onrender.com/user/card', cardData);
    dispatch({ type: ADD_CARD, payload: response.data });
    return true;
  } catch (error) {
    console.error('Error adding card:', error);
    return false;
  }
};

export const updateCard = (cardData) => async (dispatch) => {
  try {
    const response = await axios.put('https://workintech-fe-ecommerce.onrender.com/user/card', cardData);
    dispatch({ type: UPDATE_CARD, payload: response.data });
    return true;
  } catch (error) {
    console.error('Error updating card:', error);
    return false;
  }
};

export const deleteCard = (cardId) => async (dispatch) => {
  try {
    await axios.delete(`https://workintech-fe-ecommerce.onrender.com/user/card/${cardId}`);
    dispatch({ type: DELETE_CARD, payload: cardId });
    return true;
  } catch (error) {
    console.error('Error deleting card:', error);
    return false;
  }
};
