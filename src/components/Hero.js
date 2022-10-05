import { React, useState, useEffect } from "react";
import { Select } from "grommet";
import store from "./Store";
import { useContext } from "react";
import CurrenciesContext from "../data/CurrenciesContext";
import "./Hero.css";

const Hero = () => {
  const [foreignCurrency, setForeignCurrency] = useState("USD");
  const [foreignAmount, setForeignAmount] = useState(0);
  const homeCurrency = "GBP";
  const homeCurrencySymbol = "\u00A3";
  const homeAmount = store.getState().balance;
  const currencies = useContext(CurrenciesContext);

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
            options={Object.keys(currencies).sort()}
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
