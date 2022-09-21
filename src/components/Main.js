import React from "react";
import { Grommet, Select, TextInput, Button, Table, TableHeader, TableRow, TableCell, TableBody } from "grommet";

const Main = () => {
    const [firstValue, setFirstValue] = React.useState('USD');
    const [secondValue, setSecondValue] = React.useState('0.00');
    const [thirdValue, setThirdValue] = React.useState('???');

    return (
        <Grommet>
            <main className="Calc-container">
                <h2 className="Calc-title">Calculate payment in GBP</h2>
                    <div className="Calc-data-container">
                        <span>
                            <Select className="Convert-select"
                                options={['USD']}
                                value={firstValue}
                                onChange={({ option }) => setFirstValue(option)}
                            />
                        </span>
                        <span>
                            <TextInput className="Calc-text-input"
                                placeholder="type here"
                                value={secondValue}
                                onChange={event => setSecondValue(event.target.value)}
                            />
                        </span>
                        <p className="Calc-res">is worth</p>
                        <span>
                            <TextInput className="Calc-text-input" readOnly
                                placeholder="type here"
                                value={thirdValue}
                                onChange={event => setThirdValue(event.target.value)}
                            />
                        </span>
                        <p>in GBP.</p>
                    </div>
                    <Button primary label="CALCULATE" />

                    <h2 className="Payments-title">Payments</h2>
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
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell><strong>???</strong></TableCell>
                                <TableCell scope="row"><strong>Total (GBP)</strong></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
            </main>
        </Grommet>
    )
}

export default Main;
