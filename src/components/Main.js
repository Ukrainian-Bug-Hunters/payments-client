import React, {useState} from "react";
import {Select, TextInput, Button, Table, TableHeader, TableRow, TableCell, TableBody } from "grommet";
import payments from "../data/payments";
import './Main.css';
import {useContext} from "react";
import CurrenciesContext from "../data/CorrenciesContext";

const Main = () => {
    const [foreingCurrency, setForeingCurrency] = useState('USD');
    const [foreingAmount, setForeingAmount] = useState(0);
    const [homeAmount, setHomeAmount] = useState('???');
    const currencies = useContext(CurrenciesContext);

    const convert = () => {
        fetch(`https://api.exchangerate.host/convert?from=${foreingCurrency}&to=GBP&amount=${foreingAmount}`)
        .then(response => response.json())
        .then(data => setHomeAmount(data.result));
    }

    const handleChangeForeingAmount = (event) => {
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
                                options={ Object.keys(currencies).sort() }
                                value={foreingCurrency}
                                onChange={(currency) => setForeingCurrency(currency.target.value)}
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
                                {payments.map((payment, idx) => {
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
            </main>
    )
}

export default Main;
