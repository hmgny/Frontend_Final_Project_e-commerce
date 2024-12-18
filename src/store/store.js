import { createStore, combineReducers } from 'redux';
import clientReducer from './reducers/clientReducer';
import productReducer from './reducers/productReducer';
import shoppingCartReducer from './reducers/shoppingCartReducer';
import authReducer from './reducers/authReducer';
import carouselReducer from './reducers/carouselReducer';

const rootReducer = combineReducers({
  client: clientReducer,
  product: productReducer,
  shoppingCart: shoppingCartReducer,
  auth: authReducer,
  carousel: carouselReducer
});

export const store = createStore(rootReducer);

export default store;
