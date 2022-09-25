import { React, useState, useEffect } from "react";
import { Select } from "grommet";
import currencies from "../data/currencies";
import "./Hero.css";

const Hero = () => {
  const [foreignCurrency, setForeignCurrency] = useState("USD");
  const [foreignAmount, setForeignAmount] = useState(0);

  const homeAmount = 87.43;
  const homeCurrency = "GBP";
  const homeCurrencySymbol = '\u00A3';

  const handleChangeCurrency = (currency) => {
    setForeignCurrency(currency);
  };

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setForeignAmount(data.result.toFixed(2));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const requestURL = `https://api.exchangerate.host/convert?from=${homeCurrency}&to=${foreignCurrency}&amount=${homeAmount}`;
    fetchData(requestURL);
  }, [foreignCurrency, homeAmount]);

  return (
    <div className="balance-container">
      <h2 className="balance-title">Your account balance is</h2>
      <span className="balance-value">
        {homeCurrencySymbol} {homeAmount}
      </span>
      <p className="balance-convert">
        Your balance is <span>{foreignAmount}</span> in{" "}
        <span>
          <Select
            className="convert-select"
            options={currencies}
            value={foreignCurrency}
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