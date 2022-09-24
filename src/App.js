import React from 'react';
import Footer from './components/Footer';
import Hero from "./components/Hero";
import Main from './components/Main';
import Header from './components/Header';
import { Grommet } from 'grommet';

function App() {
  return (
    <Grommet>
      <Header />
      <Hero />
      <Main />
      <Footer />
    </Grommet>
  )
}

export default App;
