import payments from "../data/payments";
const CANCEL_PAYMENT = "CANCEL-PAYMENT";
const ADD_PAYMENT = "ADD-PAYMENT";

const store = {
  
  _state: {
    payments,
  },
  
  getState() {
    return this._state;
  },
  
  dispatch(action) {
    this._state = paymentsReducer(this._state, action);
  },
};

function paymentsReducer(state, action) {
  switch (action.type) {
    
    case CANCEL_PAYMENT: {
      return state;
    }
    
    case ADD_PAYMENT: {
      return { ...state, payments: [...state.payments, action.payment] };
    }
    
    default:
      return state;
  }
}

export const cancelPayment = (payment) => {
  Object.assign(payment, { status: "Cancelled" });
  return { type: CANCEL_PAYMENT, payment };
};

export const addPayment = (payment) => ({
  type: ADD_PAYMENT,
  payment,
});

export default store;
