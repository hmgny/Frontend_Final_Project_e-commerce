import axios from 'axios';

const FETCH_ADDRESSES = 'FETCH_ADDRESSES';
const ADD_ADDRESS = 'ADD_ADDRESS';
const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
const DELETE_ADDRESS = 'DELETE_ADDRESS';
export const CREATE_ORDER = 'CREATE_ORDER';

const fetchAddresses = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get(
      'https://workintech-fe-ecommerce.onrender.com/user/address',
      {
        headers: { 
          'Authorization': token
        }
      }
    );
    
    console.log('API Response:', response.data); // Debug için ekle

    if (response.data) {
      dispatch({ 
        type: FETCH_ADDRESSES, 
        payload: response.data 
      });
      return response.data;
    }
  } catch (error) {
    console.error('Error fetching addresses:', error);
    dispatch({ 
      type: FETCH_ADDRESSES, 
      payload: [] 
    });
  }
};

const addAddress = (address) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    // API'ye gönderilecek veriyi düzenle
    const addressData = {
      ...address,
      title: address.title || 'Ev Adresi', // Varsayılan başlık
      name: address.name,
      surname: address.surname,
      phone: address.phone,
      city: address.city,
      district: address.district,
      neighborhood: address.neighborhood,
      address: address.address
    };

    const response = await axios.post(
      'https://workintech-fe-ecommerce.onrender.com/user/address', 
      addressData,
      {
        headers: { 
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (response.data) {
      // Yeni adresi localStorage'a ekle
      const existingAddresses = JSON.parse(localStorage.getItem('addresses') || '[]');
      const updatedAddresses = [...existingAddresses, response.data];
      localStorage.setItem('addresses', JSON.stringify(updatedAddresses));

      // Redux store'u güncelle
      dispatch({ type: ADD_ADDRESS, payload: response.data });
      // Adres listesini yenile
      await dispatch(fetchAddresses());
      return response.data;
    }
  } catch (error) {
    console.error('Error adding address:', error);
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return null;
  }
};

const updateAddress = (address) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.put(
      'https://workintech-fe-ecommerce.onrender.com/user/address',
      address,
      {
        headers: { 
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      }
    );
    dispatch({ type: UPDATE_ADDRESS, payload: response.data });
  } catch (error) {
    console.error('Error updating address:', error);
  }
};

const deleteAddress = (addressId) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    await axios.delete(
      `https://workintech-fe-ecommerce.onrender.com/user/address/${addressId}`,
      {
        headers: { 
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      }
    );
    dispatch({ type: DELETE_ADDRESS, payload: addressId });
  } catch (error) {
    console.error('Error deleting address:', error);
  }
};

export const createOrder = (orderData) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await axios.post(
      'https://workintech-fe-ecommerce.onrender.com/order',
      orderData,
      {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data) {
      dispatch({ type: CREATE_ORDER, payload: response.data });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error creating order:', error);
    return false;
  }
};

export { 
  FETCH_ADDRESSES, 
  ADD_ADDRESS, 
  UPDATE_ADDRESS, 
  DELETE_ADDRESS,
  fetchAddresses,
  addAddress,
  updateAddress,
  deleteAddress 
};
