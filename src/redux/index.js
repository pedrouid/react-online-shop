import { combineReducers } from 'redux';
import { cartReducer } from './_cart';
import { modalReducer } from './_modal';

export default combineReducers({
  cart: cartReducer,
  modal: modalReducer
});
