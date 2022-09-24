import { React, useState, useEffect } from "react";
import { Select } from "grommet";
import currencies from "../data/currencies";
import "./Hero.css";

const Hero = () => {
  const [currency, setCurrency] = useState("USD");
  const [convertedBalance, setConvertedBalance] = useState(0);
  const balanceValue = 87.43;
  const requestURL = `https://api.exchangerate.host/convert?from=GBP&to=${currency}&amount=${balanceValue}`;

  const handleChangeCurrency = (currency) => {
    setCurrency(currency);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(requestURL);
        const data = await response.json();
        setConvertedBalance(data.result.toFixed(2));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  });

  return (
    <div className="balance-container">
      <h2 className="balance-title">Your account balance is</h2>
      <span className="balance-value">£ {balanceValue}</span>
      <p className="balance-convert">
        Your balance is <span>{convertedBalance}</span> in{" "}
        <span>
          <Select
            className="convert-select"
            options={currencies}
            value={currency}
            onChange={(e) => {
              handleChangeCurrency(e.target.value);
            }}
          />
        </span>
      </p>
    </div>
  );
};

export default Hero;
