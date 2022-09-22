import { React, useState, useEffect } from "react";
import { Select } from "grommet";
import currencies from "../data/currencies";

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
    <div className="Balance-container">
      <h2 className="Balance-title">Your account balance is</h2>
      <span className="Balance-value">£ {balanceValue}</span>
      <p className="Balance-convert">
        Your balance is <span>{convertedBalance}</span> in{" "}
        <span>
          <Select
            className="Convert-select"
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
