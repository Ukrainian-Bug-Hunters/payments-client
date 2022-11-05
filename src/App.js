import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { Grommet } from "grommet";
import { useEffect, useState, useContext } from "react";
import CurrenciesContext from "./data/CurrenciesContext";
import BalanceContext from "./data/BalanceContext";

import io from "socket.io-client";

function App() {
  const [currencies, setCurrencies] = useState({});
  const balance = useContext(BalanceContext);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    fetch("https://api.exchangerate.host/symbols")
      .then((response) => response.json())
      .then((data) => setCurrencies(data.symbols));
  }, []);

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    
    // TODO:
    // consider parametrizing this link, either the way below or some another way:
    // const newSocket = io(`http://${window.location.hostname}:5000`);

    setSocket(newSocket);
    return () => {
      newSocket.close()
    };
  }, [setSocket]);

  useEffect(() => {
    if(socket) {
      socket.on("connect", () => {
        console.log("connected to Socket with id: " + socket.id);
      });
    }
  }, [socket]);

  return (
    <CurrenciesContext.Provider value={currencies}>
      <BalanceContext.Provider value={balance}>
        <Grommet>
          <Header />
          <Hero socket={socket} />
          <Main socket={socket} />
          <Footer />
        </Grommet>
      </BalanceContext.Provider>
    </CurrenciesContext.Provider>
  );
}

export default App;

