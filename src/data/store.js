import payments from "./payments";
const CANCEL_PAYMENT = "CANCEL-PAYMENTS";

let store = {
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
    default:
      return state;
  }
}

export const cancelPayment = (payment) => {
  Object.assign(payment, { status: "Cancelled" });
  return { type: CANCEL_PAYMENT, payment };
};

export default store;
