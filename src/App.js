import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import { Grommet } from 'grommet';
import "./App.css";

function App() {
  return (
    <Grommet>
      <Header />
      <Footer />
    </Grommet>
  )
}

export default App;
