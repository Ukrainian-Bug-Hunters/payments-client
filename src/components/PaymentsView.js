import { useState, useEffect } from "react";
import { Box, Tab, Tabs } from "grommet";
import PaymentsTable from "./PaymentsTable";

function PaymentsView(props) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [payments, setPayments] = useState([]);
  
  const tabNames = ["All Payments", "Complete", "Pending", "Cancelled"];

  useEffect(() => {
    fetch(`http://localhost:4000/payments`)
      .then(res => res.json())
      .then(data => {
        setPayments(data);
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
    </>
  );
}

export default PaymentsView;
