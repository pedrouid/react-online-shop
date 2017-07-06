import { getSession, updateCart } from '../helpers/utilities';

// -- Constants ------------------------------------------------------------- //
const CART_CLEAR = 'cart/CART_CLEAR';
const CART_REMOVE = 'cart/CART_REMOVE';
const CART_UPDATE = 'cart/CART_UPDATE';

// -- Actions --------------------------------------------------------------- //

export const cartClear = () =>
  (dispatch) => {
    updateCart({});
    dispatch({ type: CART_CLEAR });
  };

export const cartUpdate = (product, option) =>
  (dispatch) => {
    const prevCart = getSession().cart;
    let payload = null;
    if (prevCart[product.sku]) {
      let isNewOption = true;
      const prevOptions = prevCart[product.sku].options;
      let newOptions = prevOptions.map((prev) => {
        if (prev.size === option.size) {
          isNewOption = false;
          return { size: prev.size, quantity: prev.quantity + option.quantity };
        }
        return prev;
      });
      if (isNewOption) {
        newOptions = [...newOptions, option];
      }
      const updatedProduct = {
        ...prevCart[product.sku],
        options: newOptions
      };
      payload = {
        ...prevCart,
        [product.sku]: updatedProduct
      };
    } else {
      payload = {
        ...prevCart,
        [product.sku]: {
          name: product.name,
          unitPrice: product.unitPrice,
          imageUrl: product.imageUrl,
          pathname: product.pathname,
          options: [option]
        }
      };
    }
    console.log(payload);
    updateCart(payload);
    dispatch({
      type: CART_UPDATE,
      payload
    });
  };

export const cartRemove = () =>
  (dispatch) => {
    console.log(getSession().cart);
    dispatch({ type: CART_REMOVE });
  };

// -- Reducer --------------------------------------------------------------- //
const INITIAL_STATE = {
  cart: getSession() ? getSession().cart : {}
};

export const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CART_CLEAR:
      return { ...state, cart: {} };
    case CART_REMOVE:
    case CART_UPDATE:
      return { ...state, cart: action.payload };
    default:
      return state;
  }
};
