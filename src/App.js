import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { Grommet } from "grommet";
import { useEffect, useState, useContext } from "react";
import CurrenciesContext from "./data/CurrenciesContext";
import BalanceContext from "./data/BalanceContext";

function App() {
  const [currencies, setCurrencies] = useState({});
  const balance = useContext(BalanceContext);

  useEffect(() => {
    fetch("https://api.exchangerate.host/symbols")
      .then((response) => response.json())
      .then((data) => setCurrencies(data.symbols));
  }, []);

  return (
    <CurrenciesContext.Provider value={currencies}>
      <BalanceContext.Provider value={balance}>
        <Grommet>
          <Header />
          <Hero />
          <Main />
          <Footer />
        </Grommet>
      </BalanceContext.Provider>
    </CurrenciesContext.Provider>
  );
}

export default App;
