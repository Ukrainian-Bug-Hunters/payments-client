import React from 'react';
import Header from './components/Header';
import Hero from "./components/Hero";
import Main from './components/Main';
import Footer from './components/Footer';

import { Grommet } from 'grommet';
import {useEffect, useState} from "react";
import CurrenciesContext from './data/CurrenciesContext';

function App() {

  const [currencies, setCurrencies] = useState({});
  
  useEffect(() => {
    fetch("https://api.exchangerate.host/symbols")
      .then(response => response.json())
      .then(data => setCurrencies(data.symbols));
  }, []);

  return (
    <CurrenciesContext.Provider value={currencies}>
      <Grommet>
        <Header />
        <Hero />
        <Main />
        <Footer />
      </Grommet>
    </CurrenciesContext.Provider>
  )
}

export default App;