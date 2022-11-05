import { useState, useEffect } from "react";
import { Box, Tab, Tabs } from "grommet";
import PaymentsTable from "./PaymentsTable";
import store from "./Store";

function PaymentsView({ socket }) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const tabNames = ["All Payments", "Complete", "Pending", "Cancelled"];
  
  let payments = store.getState().payments;

  // TODO: 
  // get rid of Simple Store, by completing and merging https://trello.com/c/eE1POkeF/22
  // then use State for keeping payments data (response from back-end, /payments end-point):
  // const [payments, setPayments] = useState(store.getState().payments);

  useEffect(() => {
    const paymentsProcessor = (data) => {
      console.log(data);
      // TODO: when above change (with using payments api) is done 
      // and Simple Store is removed implement the below approach:
      // check the `data.action`
      // if data.action === update then:
      // setPayments((prevPayments) => {
      //   const copyPayments = { ...prevPayments };
      //   const updatedPayments = data.payments;
      //   // TODO: update the payments
      //   // - in copyPayments
      //   // - with updatedPayments
      //   // and return copyPayments
      //   return copyPayments;
      // });

      // if data.action === deleted then:
      // do something different....
    };

    if (socket) {
      socket.on("payments", paymentsProcessor);
      return () => {
         socket.off("payments", paymentsProcessor);
      };
    }
  }, [socket]);

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
