/**
 * @desc create authenticated user session
 * @param  {String} [uid='']
 * @param  {String} [cart={}]
 * @param  {Date} [expires=Date.now()]
 * @return {Session}
 */
export const setSession = (
  uid = generateUID(),
  cart = {},
  expires = Date.now() + 604800000, // 1 week
  ) => {
  const session = {
    uid,
    cart,
    expires,
  };
  localStorage.setItem('CUSTOMER_SESSION', JSON.stringify(session));
};

/**
 * @desc get session as an object
 * @return {Object}
 */
export const getSession = () => {
  const session = localStorage.getItem('CUSTOMER_SESSION');
  return JSON.parse(session);
};

/**
 * @desc update cart in session
 * @param  {String}  [cart]
 * @return {Session}
 */
export const updateCart = (cart) => {
  if (!Object.keys(cart).length) {
    console.error("updateCart cart argument can't be empty");
    return null;
  }
  const newSession = { ...getSession(), cart };
  return localStorage.setItem('CUSTOMER_SESSION', JSON.stringify(newSession));
};

/**
 * @desc delete session
 * @return {Void}
 */
export const deleteSession = () => {
  localStorage.removeItem('CUSTOMER_SESSION');
};

/**
 * @desc set and clear timeout for Session Expire Warning
 */
let timeout = null;
const refreshTimeout = (refreshTime) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    console.error('TIMEOUT');
  }, refreshTime);
};
export const clearSessionExpireWarning = () => {
  clearTimeout(timeout);
};

/**
 * @desc refresh sesion tokens
 * @return {Void}
 */
export const refreshSession = () => {
  const auth = getSession();

  const getRefreshedSession = (sessionObject, refreshTime) => {
    const newExpires = Date.now() + refreshTime;
    if (sessionObject.maxAge - newExpires > refreshTime) {
      sessionObject.expires = newExpires;
    } else sessionObject.expires = sessionObject.maxAge;
    return JSON.stringify(sessionObject);
  };

  if (auth) {
    localStorage.setItem('CUSTOMER_SESSION', getRefreshedSession(auth, 300000)); // 5 min
    return refreshTimeout(240000); // 4 min
  }
};

/**
 * @desc detects mobile devices
 * @return {Boolean}
 */
export const isMobile = () => {
  if ('ontouchstart' in window && Math.max(document.documentElement.clientWidth, window.innerWidth || 0) <= 800) return true;
  return false;
};


/**
 * @desc converts titles to snakeCase for pathnames
 * @param  {String}  [string='']
 * @return {String}
 */
export const snakeCase = string =>
  string.toLowerCase().replace('&', 'and').replace(/\s/g, '-');

/**
 * @desc  capitalize strings
 * @param  {String}  [string='']
 * @return {String}
 */
export const capitalize = string =>
  string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();


/**
 * @desc returns currency symbol
 * @param {String} currency
 * @return {String}
 */
export const getCurrencySymbol = (currency) => {
  switch (currency.toUpperCase()) {
    case 'GBP':
      return '£';
    case 'EUR':
      return '€';
    case 'USD':
      return '$';
    default:
      return '£';
  }
};

/**
 * @desc generate unique id
 * @return {String}
 */
export function generateUID() {
  // always start with a letter (for DOM friendlyness)
  let idstr = String.fromCharCode(Math.floor((Math.random() * 25) + 65));
  do {
    const ascicode = Math.floor((Math.random() * 42) + 48);
    if (ascicode < 58 || ascicode > 64) {
      idstr += String.fromCharCode(ascicode);
    }
  } while (idstr.length < 32);
  return (idstr);
}
