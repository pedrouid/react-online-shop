import { combineReducers } from 'redux';
import { authenticationReducer } from './_cart';

export default combineReducers({
  cart: authenticationReducer
});
