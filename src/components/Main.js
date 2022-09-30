import React, { useState } from "react";
import {
  Select,
  TextInput,
  Button,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "grommet";
import currencies from "../data/currencies";
// todo:
// get all supported currencies from
// https://api.exchangerate.host/symbols
import store, { cancelPayment } from "../data/store";
import "./Main.css";

function Main() {
  const [foreingCurrency, setForeingCurrency] = useState("USD");
  const [foreingAmount, setForeingAmount] = useState(0);
  const [homeAmount, setHomeAmount] = useState("???");
  const homeCurrency = "GBP";
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const convert = () => {
    fetch(
      `https://api.exchangerate.host/convert?from=${foreingCurrency}&to=${homeCurrency}&amount=${foreingAmount}`
    )
      .then((response) => response.json())
      .then((data) => setHomeAmount(data.result));
  };

  const handleChangeForeingAmount = (event) => {
    if (Number(event.target.value) || event.target.value === "") {
      setForeingAmount(event.target.value);
    } else {
      event.target.value = foreingAmount;
    }
  };

  return (
    <main className="calculator-and-payments">
      <section className="calc-section">
        <h2 className="calc-title">Calculate payment in GBP</h2>
        <div className="calc-data-container">
          <Select
            className="convert-select"
            options={currencies}
            value={foreingCurrency}
            onChange={({ currency }) => setForeingCurrency(currency)}
          />
          <TextInput
            className="calc-text-input"
            placeholder="type here"
            onChange={(event) => {
              handleChangeForeingAmount(event);
            }}
          />
          <div className="calc-res">is worth</div>
          <TextInput
            className="calc-text-input"
            readOnly
            placeholder="type here"
            value={homeAmount}
          />
          <div>in GBP.</div>
        </div>
        <Button primary label="CALCULATE" onClick={convert} />
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
            {store.getState().payments.map((payment, idx) => {
              return (
                <TableRow key={idx}>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.currency}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>{payment.description}</TableCell>
                  <TableCell>{payment.status}</TableCell>
                  <TableCell>
                    {payment.status === "Pending" ? (
                      <Button
                        type="button"
                        primary
                        label="Cancel"
                        onClick={() => {
                          store.dispatch(cancelPayment(payment));
                          forceUpdate();
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>
                <strong>???</strong>
              </TableCell>
              <TableCell scope="row">
                <strong>Total (GBP)</strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </main>
  );
}

export default Main;
