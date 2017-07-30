import { getSession, updateCart, getCurrentPrice } from '../helpers/utilities';

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
    let payload = null;

    // get previous cart from localStorage
    const prevCart = getSession().cart;

    // update Cart total quantity
    const prevQuantity = prevCart.totalQuantity ? prevCart.totalQuantity : 0;
    const totalQuantity = prevQuantity + option.quantity;

    // update Cart subtotal value
    const prevSubtotal = prevCart.subtotal ? prevCart.subtotal : 0;
    const subtotal = prevSubtotal + getCurrentPrice(product.unitPrice) * option.quantity;

    // check prevCart contains the same product
    if (prevCart[product.sku]) {
      let isNewOption = true;
      const prevOptions = prevCart[product.sku].options;
      // updates options if already populated
      let newOptions = prevOptions.map((prev) => {
        if (prev.size === option.size) {
          isNewOption = false;
          return { size: prev.size, quantity: prev.quantity + option.quantity };
        }
        return prev;
      });
      // updates with new option
      if (isNewOption) {
        newOptions = [...newOptions, option];
      }
      // updates existant product
      const updatedProduct = {
        ...prevCart[product.sku],
        options: newOptions
      };
      // updates cart with updatedProduct
      payload = {
        ...prevCart,
        totalQuantity,
        subtotal,
        [product.sku]: updatedProduct
      };
    } else {
      // adds new product to cart
      payload = {
        ...prevCart,
        totalQuantity,
        subtotal,
        [product.sku]: {
          name: product.name,
          unitPrice: product.unitPrice,
          imageUrl: product.imageUrl,
          pathname: product.pathname,
          options: [option]
        }
      };
    }

    // updates localStorage with updatedCart
    updateCart(payload);

    // updates redux store with updatedCart
    dispatch({
      type: CART_UPDATE,
      payload
    });
  };

export const cartRemove = () =>
  (dispatch) => {
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
