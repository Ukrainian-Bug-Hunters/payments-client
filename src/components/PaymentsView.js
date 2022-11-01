import { useState, useEffect } from "react";
import { Box, Tab, Tabs } from "grommet";
import PaymentsTable from "./PaymentsTable";
import store from "./Store";
import MakePaymentWindow from "./MakePaymentWindow";
import io from "socket.io-client";
const socket = io("http://localhost:5000");

function PaymentsView(props) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const tabNames = ["All Payments", "Complete", "Pending", "Cancelled"];
  let payments = store.getState().payments;

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected with id: " + socket.id);
    });
  }, []);

  return (
    <>
      <section className="payments-section">
        <h2 className="payments-title">Payments</h2>
        <Box align="center" pad="medium">
          <Tabs
            activeIndex={activeTabIndex}
            onActive={setActiveTabIndex}
            justify="center"
          >
            <Tab title={tabNames[0]}>
              <Box margin="small" gap="small">
                <PaymentsTable payments={payments} />
              </Box>
            </Tab>

            <Tab title={tabNames[1]}>
              <Box margin="small">
                <PaymentsTable
                  payments={payments.filter(
                    (payment) => payment.status === tabNames[1]
                  )}
                />
              </Box>
            </Tab>

            <Tab title={tabNames[2]}>
              <Box margin="small">
                <PaymentsTable
                  payments={payments.filter(
                    (payment) => payment.status === tabNames[2]
                  )}
                />
              </Box>
            </Tab>

            <Tab title={tabNames[3]}>
              <Box margin="small">
                <PaymentsTable
                  payments={payments.filter(
                    (payment) => payment.status === tabNames[3]
                  )}
                />
              </Box>
            </Tab>
          </Tabs>
        </Box>
      </section>
      {props.showPaymentWindow && (
        <MakePaymentWindow
          socket={socket}
          closeWindow={props.setShowPaymentWindow}
          paymentDetails={props.payment}
        />
      )}
    </>
  );
}

export default PaymentsView;
