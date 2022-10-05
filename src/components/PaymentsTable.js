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
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
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
          <TableCell>
            <strong>???</strong>
          </TableCell>
          <TableCell scope="row">
            <strong>Total (GBP)</strong>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default PaymentsTable;
