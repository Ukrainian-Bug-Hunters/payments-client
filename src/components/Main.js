import React, { useContext, useState, useRef } from "react";
import { Select, TextInput, Button } from "grommet";
import CurrenciesContext from "../data/CurrenciesContext";
import PaymentsView from "./PaymentsView";
import "./Main.css";
import BalanceContext from "../data/BalanceContext";

function Main() {
  const [foreignCurrency, setForeignCurrency] = useState("USD");
  const [foreignAmount, setForeignAmount] = useState(0);
  const [homeAmount, setHomeAmount] = useState("");
  const balance  = useContext(BalanceContext);
  const homeCurrency = balance.currency;
  const currencies = useContext(CurrenciesContext);
  const [showPaymentWindow, setShowPaymentWindow] = useState(false);
  const payment = useRef({});

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

  const handleChangeForeignAmount = (event) => {
    if (Number(event.target.value) || event.target.value === "") {
      setForeignAmount(event.target.value);
    } else {
      event.target.value = foreignAmount;
    }
  };

  return (
    <main className="calculator-and-payments">
      <section className="calc-section">
        <h2 className="calc-title">Calculate payment in GBP</h2>
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
          <div>in GBP.</div>
        </div>
        <Button primary label="CALCULATE" onClick={convert} />
        <Button
          primary
          label="Make Payment"
          onClick={() => setShowPaymentWindow(true)}
        />
      </section>
      <PaymentsView
        setShowPaymentWindow={setShowPaymentWindow}
        showPaymentWindow={showPaymentWindow}
        payment={payment.current}
      />
    </main>
  );
}

export default Main;