import axios from 'axios';

export const FETCH_CARDS = 'FETCH_CARDS';
export const ADD_CARD = 'ADD_CARD';
export const UPDATE_CARD = 'UPDATE_CARD';
export const DELETE_CARD = 'DELETE_CARD';

export const fetchCards = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get(
      'https://workintech-fe-ecommerce.onrender.com/user/card',
      {
        headers: { 
          'Authorization': token
        }
      }
    );
    
    if (response.data) {
      dispatch({ 
        type: FETCH_CARDS, 
        payload: response.data 
      });
      return response.data;
    }
  } catch (error) {
    console.error('Error fetching cards:', error);
    dispatch({ 
      type: FETCH_CARDS, 
      payload: [] 
    });
  }
};

export const addCard = (card) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    // API'ye gönderilecek veriyi düzenle
    const formattedCard = {
      name_on_card: card.name_on_card,
      card_no: card.card_no,
      expire_year: card.expire_year,
      expire_month: card.expire_month,
    };

    const response = await axios.post(
      'https://workintech-fe-ecommerce.onrender.com/user/card', 
      formattedCard,
      {
        headers: { 
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (response.data) {
      dispatch({ type: ADD_CARD, payload: response.data });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error adding card:', error);
    return false;
  }
};

export const updateCard = (card) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const formattedCard = {
      id: card.id,
      card_no: card.card_no,
      expire_month: card.expire_month,
      expire_year: card.expire_year,
      name_on_card: card.name_on_card,
    };

    const response = await axios.put(
      'https://workintech-fe-ecommerce.onrender.com/user/card',
      formattedCard,
      {
        headers: { 
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      }
    );
    dispatch({ type: UPDATE_CARD, payload: response.data });
  } catch (error) {
    console.error('Error updating card:', error);
  }
};

export const deleteCard = (cardId) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    await axios.delete(
      `https://workintech-fe-ecommerce.onrender.com/user/card/${cardId}`,
      {
        headers: { 
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      }
    );
    dispatch({ type: DELETE_CARD, payload:cardId });
  } catch (error) {
    console.error('Error deleting card:', error);
  }
};

