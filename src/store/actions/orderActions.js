
import axios from 'axios';

const FETCH_ADDRESSES = 'FETCH_ADDRESSES';
const ADD_ADDRESS = 'ADD_ADDRESS';
const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
const DELETE_ADDRESS = 'DELETE_ADDRESS';

const fetchAddresses = () => async (dispatch) => {
    try {
      const response = await axios.get('https://workintech-fe-ecommerce.onrender.com/user/address', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      dispatch({ type: FETCH_ADDRESSES, payload: response.data });
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };
  
  const addAddress = (address) => async (dispatch) => {
    try {
      const response = await axios.post('https://workintech-fe-ecommerce.onrender.com/user/address', address, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      dispatch({ type: ADD_ADDRESS, payload: response.data });
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };
  
  const updateAddress = (address) => async (dispatch) => {
    try {
      const response = await axios.put('https://workintech-fe-ecommerce.onrender.com/user/address', address, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      dispatch({ type: UPDATE_ADDRESS, payload: response.data });
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };
  
  const deleteAddress = (addressId) => async (dispatch) => {
    try {
      await axios.delete(`https://workintech-fe-ecommerce.onrender.com/user/address/${addressId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      dispatch({ type: DELETE_ADDRESS, payload: addressId });
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };




export { FETCH_ADDRESSES, ADD_ADDRESS, UPDATE_ADDRESS, DELETE_ADDRESS};
