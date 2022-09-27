const ADD_PAYMENT = "ADD-PAYMENTS";
const CANCEL_PAYMENT = "CANCEL-PAYMENTS";

let store = {
  _state: {
    payments: [
      {
        date: "2018-05-12",
        currency: "GBP",
        amount: 6.89,
        exchangeRate: 1,
        description: "Dinner with friends at a local restaurant",
        status: "Pending",
      },
      {
        date: "2018-02-24",
        currency: "USD",
        amount: 12.23,
        exchangeRate: 1.2327,
        description: "New headphones purchased from Amazon with free delivery",
        status: "Complete",
      },
      {
        date: "2017-12-30",
        currency: "AUD",
        amount: 28.74,
        exchangeRate: 1.5318,
        description: "Groceries for the week",
        status: "Complete",
      },
      {
        date: "2017-10-17",
        currency: "GBP",
        amount: 2.06,
        exchangeRate: 1,
        description: "Coffee with Luke at iCafe",
        status: "Complete",
      },
      {
        date: "2017-09-02",
        currency: "TRY",
        amount: 87,
        exchangeRate: 4.1098,
        description: "Gift for my mother back home",
        status: "Complete",
      },
    ],
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
    case ADD_PAYMENT: {
      let newPayment = {
        date: action.date,
        currency: action.currency,
        amount: action.amount,
        exchangeRate: action.exchangeRate,
        description: action.description,
        status: "Pending",
      };
      return {
        ...state,
        payments: [...state.payments, newPayment],
      };
    }
    case CANCEL_PAYMENT: {
      let newPayments = [
        ...state.payments.filter(
          (payment) =>
            JSON.stringify(payment) !== JSON.stringify(action.payment)
        ),
      ];
      return { ...state, payments: newPayments };
    }
    default:
      return state;
  }
}

export const addPayment = (
  date,
  currency,
  amount,
  exchangeRate,
  description
) => ({
  type: ADD_PAYMENT,
  date,
  currency,
  amount,
  exchangeRate,
  description,
});

export const cancelPayments = (payment) => ({
  type: CANCEL_PAYMENT,
  payment,
});

export default store;
