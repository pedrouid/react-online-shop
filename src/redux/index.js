import { combineReducers } from 'redux';
import { cartReducer } from './_cart';

export default combineReducers({
  cart: cartReducer
});
