import { createStore, combineReducers, applyMiddleware } from 'redux';
import clientReducer from './reducers/clientReducer';
import productReducer from './reducers/productReducer';
import shoppingCartReducer from './reducers/shoppingCartReducer';
import authReducer from './reducers/authReducer';
import carouselReducer from './reducers/carouselReducer';
import categoryReducer from './reducers/categoryReducer';
import { thunk } from 'redux-thunk';

const rootReducer = combineReducers({
  client: clientReducer,
  product: productReducer,
  shoppingCart: shoppingCartReducer,
  auth: authReducer,
  carousel: carouselReducer,
  categories: categoryReducer,
});

const store = createStore(rootReducer,applyMiddleware(thunk));

export default store;
