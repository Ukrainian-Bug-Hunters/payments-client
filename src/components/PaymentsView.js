import { useState } from "react";
import { Box, Tab, Tabs } from "grommet";
import PaymentsTable from "./PaymentsTable";
import store from "./Store";
import MakePaymentWindow from "./MakePaymentWindow";

function PaymentsView(props) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const tabNames = ["All Payments", "Complete", "Pending", "Cancelled"];
  let payments = store.getState().payments;

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
          closeWindow={props.setShowPaymentWindow}
          paymentDetails={props.payment}
        />
      )}
    </>
  );
}

export default PaymentsView;
