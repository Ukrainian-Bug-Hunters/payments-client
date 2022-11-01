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

// import React, { useState, useEffect } from "react";
// import io from "socket.io-client";

// const socket = io("http://localhost:5000");

// function App() {
//   const [isConnected, setIsConnected] = useState(socket.connected);
//   const [message, setMessage] = useState("hi");

//   useEffect(() => {
//     socket.on("connect", () => {
//       setIsConnected(true);
//       console.log(socket);
//     });

//     socket.on("message", (data) => {
//       setMessage(data);
//       console.log(data);
//     });

//     socket.on("disconnect", () => {
//       setIsConnected(false);
//     });

//     return () => {
//       socket.off("connect");
//       socket.off("message");
//       socket.off("disconnect");
//     };
//   }, []);

//   const sendMessage = () => {
//     socket.emit("message", message);
//   };

//   const handleChange = (event) => {
//     setMessage(event.target.value);
//   };

//   return (
//     <div>
//       <p>Connected: {"" + isConnected}</p>
//       <input value={message} type="text" onChange={handleChange} />
//       <button onClick={sendMessage}>Send message</button>
//     </div>
//   );
// }

// export default App;
