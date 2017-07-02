// -- Constants ------------------------------------------------------------- //
const MODAL_SHOW = 'modal/MODAL_SHOW';
const MODAL_HIDE = 'modal/MODAL_HIDE';

// -- Actions --------------------------------------------------------------- //

export const modalShow = modalID =>
  (dispatch) => {
    dispatch({ type: MODAL_SHOW, payload: modalID });
  };

export const modalHide = () =>
  (dispatch) => {
    dispatch({ type: MODAL_HIDE });
  };

// -- Reducer --------------------------------------------------------------- //
const INITIAL_STATE = {
  modalID: '',
  show: false
};

export const modalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MODAL_SHOW:
      return {
        ...state,
        modalID: action.payload,
        show: true
      };
    case MODAL_HIDE:
      return {
        ...state,
        modalID: '',
        show: false
      };
    default:
      return state;
  }
};
