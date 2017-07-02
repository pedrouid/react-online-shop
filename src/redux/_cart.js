import { getSession } from '../helpers/utilities';

// -- Constants ------------------------------------------------------------- //
const CART_CLEAR = 'cart/CART_CLEAR';
const CART_REMOVE = 'cart/CART_REMOVE';
const CART_UPDATE = 'cart/CART_UPDATE';

// -- Actions --------------------------------------------------------------- //

export const cartClear = () =>
  (dispatch) => {
    console.log(getSession().cart);
    dispatch({ type: CART_CLEAR });
  };

export const cartUpdate = product =>
  (dispatch) => {
    console.log(getSession().cart);
    console.log(product);
    dispatch({ type: CART_UPDATE });
  };

export const cartRemove = () =>
  (dispatch) => {
    console.log(getSession().cart);
    dispatch({ type: CART_REMOVE });
  };

// -- Reducer --------------------------------------------------------------- //
const INITIAL_STATE = {
  cart: {}
};

export const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CART_CLEAR:
      return { ...state, cart: {} };
    case CART_REMOVE:
    case CART_UPDATE:
      return { ...state, cart: action.payload.cart };
    default:
      return state;
  }
};
