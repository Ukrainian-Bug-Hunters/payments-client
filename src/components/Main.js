import React, {useState} from "react";
import {Select, TextInput, Button, Table, TableHeader, TableRow, TableCell, TableBody } from "grommet";
import currencies from "../data/currencies";
import payments from "../data/payments";
import './Main.css';
console.log(payments)
const Main = () => {
    const [currency, setCurrency] = useState('USD');
    let amount = 0;
    const [convertResult, setConvertResult] = useState('???');

    function convert(){
        fetch(`https://api.exchangerate.host/convert?from=${currency}&to=GBP&amount=${amount}`)
        .then(response => response.json())
        .then(res => setConvertResult(res.result))
    }

    return (
            <main className="calculator-and-payments">
             <section className="calc-section">
                <h2 className="calc-title">Calculate payment in GBP</h2>
                    <div className="calc-data-container">
                        <span>
                            <Select className="convert-select"
                                options={currencies}
                                value={currency}
                                onChange={({option}) => setCurrency(option)}
                            />
                        </span>
                        <span>
                            <TextInput className="calc-text-input"
                                placeholder="type here"
                                onChange={(event) => {amount = event.target.value}}
                            />
                        </span>
                        <p className="calc-res">is worth</p>
                        <span>
                            <TextInput className="calc-text-input" readOnly
                                placeholder="type here"
                                value={convertResult}
                            />
                        </span>
                        <p>in GBP.</p>
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
                            <TableRow>
                                <TableCell scope="row">
                                    2022-05-12
                                </TableCell>
                                <TableCell>GBP</TableCell>
                                <TableCell>6.89</TableCell>
                                <TableCell>Dinner with friends at a local restaurant</TableCell>
                                <TableCell>Pending</TableCell>
                                <TableCell><Button primary label="Cancel" /></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell scope="row">
                                    2022-08-20
                                </TableCell>
                                <TableCell>GBP</TableCell>
                                <TableCell>12.89</TableCell>
                                <TableCell>New headphones purchased from Amazon with free delivery</TableCell>
                                <TableCell>Complete</TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                                {payments.map((payment) => {
                                    return(
                                        <TableRow>
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
