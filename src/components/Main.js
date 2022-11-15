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

  useEffect(() => {
    const processMessage = (data) => {
      if (data.action === "created") {
        setPayments((payments) => [...payments, data.payment]);
      } else if (data.action === "updated") {
        setPayments((payments) => [
          ...payments.filter((payment) => payment.id !== data.payment.id),
          data.payment,
        ]);
      } else if (data.action === "deleted") {
        setPayments((payments) => [
          ...payments.filter((payment) => payment.id !== data.payment.id),
        ]);
      }
    };

    if (socket) {
      socket.on("payments", (data) => {
        processMessage(data);
      });
      return () => {
        socket.off("payments");
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
          homeAmount: data.result.toFixed(2),
          exchangeRate: data.info.rate,
        };

        setHomeAmount(data.result.toFixed(2));
      });
  };

  const addPayment = (payment) => {
    fetch("http://localhost:4000/payments", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(payment),
    }).then((res) => {
      if (res.ok) {
        // do nothing
      } else {
        throw Error(
          "oooops, we couldn't  post a new payment to the back-end server!"
        );
      }
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
            onChange={(event) => setForeignCurrency(event.target.value)}
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
            placeholder="0.00"
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
