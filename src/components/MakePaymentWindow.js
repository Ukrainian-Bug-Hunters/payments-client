import React, { useState } from "react";
import { Layer, Button, TextInput } from "grommet";
import "./MakePaymentWindow.css";
import store, { addPayment, decreaseAmount } from "./Store";

export default function MakePaymentWindow({ closeWindow, paymentDetails }) {
  const date = paymentDetails?.date || new Date().toLocaleDateString("fr-CA");
  const foreignCurrency = paymentDetails?.foreignCurrency || "USD";
  const homeCurrency = paymentDetails?.homeCurrency || "GBP";
  const exchangeRate = paymentDetails?.exchangeRate || 0;

  const [description, setDescription] = useState("");

  const [foreignAmount, setForeignAmount] = useState(
    paymentDetails?.foreignAmount || 0
  );
  const [homeAmount, setHomeAmount] = useState(paymentDetails?.homeAmount || 0);

  const onClose = () => {
    closeWindow(false);
  };

  const handleAmountUpdate = (event) => {
    if (event.target.id === "foreign-amount") {
      if (isValidAmountValue(event.target.value)) {
        // update foreignAmount
        setForeignAmount(Number(event.target.value));
        // recalculate homeAmount
        setHomeAmount(Number(event.target.value) * exchangeRate);
      } else {
        event.target.value = foreignAmount;
      }
    }

    if (event.target.id === "home-amount") {
      if (isValidAmountValue(event.target.value)) {
        // update homeAmount
        setHomeAmount(Number(event.target.value));
        // recalculate foreignAmount
        setForeignAmount(Number(event.target.value) / exchangeRate);
      } else {
        event.target.value = homeAmount;
      }
    }
  };

  const isValidAmountValue = (value) => {
    if (Number(value) || value === "") {
      return true;
    }

    return false;
  };

  return (
    <Layer onEsc={() => onClose} onClickOutside={onClose}>
      <div className="payment-window">
        <h1 className="window-title">Enter payment details</h1>
        <div className="input-fields">
          <h2>Date: {date}</h2>
          <div className="amount-line">
            <h2>Amount ({foreignCurrency}):</h2>
            <TextInput
              id="foreign-amount"
              placeholder="type here"
              value={foreignAmount}
              onChange={handleAmountUpdate}
            />
          </div>

          <div className="amount-line">
            <h2>Amount ({homeCurrency}):</h2>
            <TextInput
              id="home-amount"
              placeholder="type here"
              value={homeAmount}
              onChange={handleAmountUpdate}
            />
          </div>
          <h2>ExchangeRate: {exchangeRate}</h2>
          <div className="description-box">
            <h2>Description:</h2>
            <TextInput
              onChange={(event) => setDescription(event.target.value)}
              value={description}
            />
          </div>
        </div>
        <div className="buttons">
          <Button primary label="Cancel" size="large" onClick={onClose} />
          <Button
            primary
            label="Submit"
            size="large"
            onClick={() => {
              store.dispatch(
                addPayment({
                  date: date,
                  currency: foreignCurrency,
                  amount: foreignAmount,
                  exchangeRate: exchangeRate,
                  description: description,
                  status: "Pending",
                }),
                store.dispatch(decreaseAmount(foreignAmount)),
                onClose()
              );
            }}
          />
        </div>
      </div>
    </Layer>
  );
}
