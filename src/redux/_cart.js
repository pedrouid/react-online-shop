// -- Constants ------------------------------------------------------------- //
const CART_REQUEST = 'cart/CART_REQUEST';
const CART_SUCCESS = 'cart/CART_SUCCESS';
const CART_FAILURE = 'cart/CART_FAILURE';

// -- Actions --------------------------------------------------------------- //

export const cart = () =>
  (dispatch) => {
    dispatch({ type: CART_REQUEST });
    dispatch()
    .then(() => {
      dispatch({ type: CART_SUCCESS });
      window.browserHistory.push('/login');
      window.rogueDispatch({ type: 'RESET' });
    });
  };

// -- Reducer --------------------------------------------------------------- //
const INITIAL_STATE = {
  basket: {}
};

export const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CART_REQUEST:
      return { ...state, fetching: true };
    case CART_SUCCESS:
    case CART_FAILURE:
      return { ...state, fetching: false };
    default:
      return state;
  }
};
