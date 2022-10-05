import payments from "../data/payments";
const CANCEL_PAYMENT = "CANCEL-PAYMENT";
const ADD_PAYMENT = "ADD-PAYMENT";
const DECREASE_AMOUNT = "DECREASE-AMOUNT";

const store = {
  _state: {
    payments,
    balance: 830,
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
    case DECREASE_AMOUNT: {
      return { ...state, balance: state.balance - action.amount };
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

export const decreaseAmount = (amount) => ({
  type: DECREASE_AMOUNT,
  amount,
});

export default store;
