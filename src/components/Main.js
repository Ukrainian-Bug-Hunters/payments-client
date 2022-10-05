import React, { useState, useContext, useRef } from "react";
import {Select, TextInput, Button, Table, TableHeader, TableRow, TableCell, TableBody } from "grommet";
import payments from "../data/payments";
import './Main.css';
import CurrenciesContext from "../data/CorrenciesContext";
import MakePaymentWindow from "./MakePaymentWindow";

function Main() {
    const [paymentsData, setPaymentsData] = useState(payments);
    const currencies = useContext(CurrenciesContext);
    
    const homeCurrency = "GBP";
    const [homeAmount, setHomeAmount] = useState("");
    
    const [foreignCurrency, setForeignCurrency] = useState('USD');
    const [foreignAmount, setForeignAmount] = useState("");
    
    const [showPaymentWindow, setShowPaymentWindow] = useState(false);

    const payment = useRef({});
    
    const convert = () => {
        fetch(`https://api.exchangerate.host/convert?from=${foreignCurrency}&to=${homeCurrency}&amount=${foreignAmount}`)
        .then(response => response.json())
        .then(data => {

            payment.current = {
                    date: data.date,
                    foreignCurrency: foreignCurrency,
                    foreignAmount: data.query.amount,
                    homeCurrency: homeCurrency,
                    homeAmount: data.result,
                    exchangeRate: data.info.rate
            };
            
            setHomeAmount(data.result);
        });
    }

    const handleChangeforeignAmount = (event) => {
        if(Number(event.target.value) || event.target.value === ''){
            setForeignAmount(event.target.value);
        }
        else{
            event.target.value = foreignAmount;
        }
    }

    const submitedPayment = (payment) => {
        setPaymentsData([...paymentsData, payment]);
    }


    return (
            <main className="calculator-and-payments">
             <section className="calc-section">
                <h2 className="calc-title">Calculate payment in GBP</h2>
                    <div className="calc-data-container">
                            <Select className="convert-select"
                                options={ Object.keys(currencies).sort() }
                                value={foreignCurrency}
                                onChange={(currency) => setForeignCurrency(currency.target.value)}
                            />
                            <TextInput className="calc-text-input"
                                placeholder="type here"
                                onChange={(event) => {
                                    handleChangeforeignAmount(event);
                                }}

                            />
                        <div className="calc-res">is worth</div>
                            <TextInput className="calc-text-input" 
                                readOnly
                                value={homeAmount}
                            />
                        <div>in GBP.</div>
                    </div>
                    <Button primary label="CALCULATE"
                        onClick={convert}
                     />
                    <Button primary label="Make Payment" 
                        onClick={() => setShowPaymentWindow(true)}
                    />
                </section>
                <section className="payments-section">
                    <h2 className="payments-title">Payments</h2>
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableCell scope="col" border="bottom">
                                <strong>Date</strong>
                            </TableCell>
                            <TableCell scope="col" border="bottom">
                                <strong>Cur</strong>
                            </TableCell>
                            <TableCell scope="col" border="bottom">
                                <strong>Amount</strong>
                            </TableCell>
                            <TableCell scope="col" border="bottom">
                                <strong>Description</strong>
                            </TableCell>
                            <TableCell scope="col" border="bottom">
                                <strong>Status</strong>
                            </TableCell>
                            <TableCell scope="col" border="bottom">
                                <strong>Action</strong>
                            </TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                                {paymentsData.map((payment, idx) => {
                                    return(
                                        <TableRow key = {idx}>
                                        <TableCell>{payment.date}</TableCell>
                                        <TableCell>{payment.currency}</TableCell>
                                        <TableCell>{payment.amount}</TableCell>
                                        <TableCell>{payment.description}</TableCell>
                                        <TableCell>{payment.status}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell><strong>???</strong></TableCell>
                                <TableCell scope="row"><strong>Total (GBP)</strong></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    </section>
                    {showPaymentWindow &&   <MakePaymentWindow 
                                                submitPayment={submitedPayment} 
                                                closeWindow={setShowPaymentWindow}
                                                paymentDetails={payment.current}
                                            />}
            </main>
    )
}

export default Main;
