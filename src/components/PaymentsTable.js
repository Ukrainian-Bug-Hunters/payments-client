import { useCallback, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "grommet";
import store, { cancelPayment } from "./Store";

function PaymentsTable({ payments }) {
  const homeCurrency = 'GBP';
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const getKey = ({date, currency, amount, status}) => {
    return `${date}-${currency}-${amount}-${status}`;
  }

  const calculateHomeAmount = (amount, exchangeRate) => {
    const homeAmount = Math.round(amount / exchangeRate * 100) / 100;
    return homeAmount;
  }

  const calculateTotalhomeAmount = () => {
    const totalhomeAmount = Math.round(
      payments.reduce((total, payment) => 
        total = total + calculateHomeAmount(payment.amount, payment.exchangeRate), 0) * 100) / 100;
    return totalhomeAmount;
  }

  return (
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
            <strong>{homeCurrency}</strong>
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
        {payments.map((payment) => {
          return (
            <TableRow key={getKey(payment)}>
              <TableCell>{payment.date}</TableCell>
              <TableCell>{payment.currency}</TableCell>
              <TableCell>{payment.amount}</TableCell>
              <TableCell>{calculateHomeAmount(payment.amount, payment.exchangeRate)}</TableCell>
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
          <TableCell></TableCell>
          <TableCell>
            <strong>{calculateTotalhomeAmount()}</strong>
          </TableCell>
          <TableCell scope="row">
            <strong>Total ({homeCurrency})</strong>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default PaymentsTable;
