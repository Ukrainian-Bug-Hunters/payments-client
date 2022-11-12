import React, { useContext, useState, useRef, useEffect } from "react";
import { Select, TextInput, Button } from "grommet";
import CurrenciesContext from "../data/CurrenciesContext";
import PaymentsView from "./PaymentsView";
import "./Main.css";
import BalanceContext from "../data/BalanceContext";
import MakePaymentWindow from "./MakePaymentWindow";

function Main({ socket }) {
  const balance = useContext(BalanceContext);
  const [foreignCurrency, setForeignCurrency] = useState("USD");
  const [foreignAmount, setForeignAmount] = useState(0);
  const [homeAmount, setHomeAmount] = useState("");
  const homeCurrency = balance.currency;
  const currencies = useContext(CurrenciesContext);
  const [showPaymentWindow, setShowPaymentWindow] = useState(false);
  const payment = useRef({});
  const [payments, setPayments] = useState([]);

// TODO:
  // get rid of Simple Store, by completing and merging https://trello.com/c/eE1POkeF/22
  // then use State for keeping payments data (response from back-end, /payments end-point):
  // const [payments, setPayments] = useState(store.getState().payments);

  useEffect(() => {
    const processMessage = (data) => {
      console.log(data);
      // TODO: when above change (with using payments api) is done
      // and Simple Store is removed implement the below approach:
     
      // check the `data.action`
      // if data.action === update then:
      // setPayments((prevPayments) => {
      //   const copyPayments = { ...prevPayments };
      //   const updatedPayments = data.payments;
      //   // TODO: update the payments
      //   // - in copyPayments
      //   // - with updatedPayments
      //   // and return copyPayments
      //   return copyPayments;
      // });

      // if data.action === deleted then:
      // do something different....
      
    };

    if (socket) {
      socket.on("payments", processMessage);
      return () => {
        socket.off("payments", processMessage);
      };
    }
  }, [socket]);

  useEffect(() => {
    fetch(`http://localhost:4000/payments`)
      .then((res) => res.json())
      .then((data) => {
        setPayments(data);
      });
  }, []);

  const convert = () => {
    fetch(
      `https://api.exchangerate.host/convert?from=${foreignCurrency}&to=${homeCurrency}&amount=${foreignAmount}`
    )
      .then((response) => response.json())
      .then((data) => {
        payment.current = {
          date: data.date,
          foreignCurrency: foreignCurrency,
          foreignAmount: data.query.amount,
          homeCurrency: homeCurrency,
          homeAmount: data.result,
          exchangeRate: data.info.rate,
        };

        setHomeAmount(data.result);
      });
  };

  const addPayment = (payment) => {
    fetch("http://localhost:4000/payments", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(payment),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error(
            "oooops, we couldn't  post a new payment to the back-end server!"
          );
        }
      })
      .then((newPayment) => {
        setShowPaymentWindow(false);
        // todo:
        /**
         * `data` is our `new Payments`
         * we need to add it to the `payments` state now.
         */
        setPayments([...payments, newPayment]);
      });
  };

  const handleChangeForeignAmount = (event) => {
    if (Number(event.target.value) || event.target.value === "") {
      setForeignAmount(event.target.value);
      // if foreignAmount updated manually,
      // then homeAmmount needs to reset and recalculated
      setHomeAmount("");
    } else {
      event.target.value = foreignAmount;
    }
  };

  return (
    <main className="calculator-and-payments">
      <section className="calc-section">
        <h2 className="calc-title">Calculate payment in {homeCurrency}</h2>
        <div className="calc-data-container">
          <Select
            className="convert-select"
            options={Object.keys(currencies)}
            value={foreignCurrency}
            onChange={({ currency }) => setForeignCurrency(currency)}
          />
          <TextInput
            className="calc-text-input"
            placeholder="type here"
            onChange={(event) => {
              handleChangeForeignAmount(event);
            }}
          />
          <div className="calc-res">is worth</div>
          <TextInput
            className="calc-text-input"
            readOnly
            placeholder="type here"
            value={homeAmount}
          />
          <div>in {homeCurrency}.</div>
        </div>
        <Button primary label="CALCULATE" onClick={convert} />
        <Button
          primary
          label="Make Payment"
          onClick={() => setShowPaymentWindow(true)}
        />
      </section>
      <section>
        <PaymentsView payments={payments} />
      </section>

      {showPaymentWindow && (
        <MakePaymentWindow
          setShowPaymentWindow={setShowPaymentWindow}
          paymentDetails={payment.current}
          payments={payments}
          addPayment={addPayment}
        />
      )}
    </main>
  );
}

export default Main;
