import React, {useState} from "react";
import {Select, TextInput, Button } from "grommet";
import currencies from "../data/currencies";
// todo:
// get all supported currencies from 
// https://api.exchangerate.host/symbols
import Payments from "./Payments";
import './Main.css';


const Main = () => {
    const [foreingCurrency, setForeingCurrency] = useState('USD');
    const [foreingAmount, setForeingAmount] = useState(0);
    const [homeAmount, setHomeAmount] = useState(0);

    function convert(){
        fetch(`https://api.exchangerate.host/convert?from=${foreingCurrency}&to=GBP&amount=${foreingAmount}`)
        .then(response => response.json())
        .then(data => setHomeAmount(data.result));
    }

    function handleChangeForeingAmount(event){
        if(Number(event.target.value) || event.target.value === ''){
            setForeingAmount(event.target.value);
        }
        else{
            event.target.value = foreingAmount;
        }
    }

    return (
        <main className="calculator-and-payments">
            <section className="calc-section">
                <h2 className="calc-title">Calculate payment in GBP</h2>
                    <div className="calc-data-container">
                            <Select className="convert-select"
                                options={currencies}
                                value={foreingCurrency}
                                onChange={({currency}) => setForeingCurrency(currency)}
                            />
                            <TextInput className="calc-text-input"
                                placeholder="type here"
                                onChange={(event) => {
                                    handleChangeForeingAmount(event);
                                }}

                            />
                        <div className="calc-res">is worth</div>
                            <TextInput className="calc-text-input" readOnly
                                placeholder="type here"
                                value={homeAmount}
                            />
                        <div>in GBP.</div>
                    </div>
                    <Button primary label="CALCULATE"
                        onClick={convert}
                    />
            </section>
            <Payments />
        </main>
    )
}

export default Main;
