import { createContext } from "react";

const BalanceContext = createContext({
  amount: 87.43,
  currency: "GPB",
  currencySymbol: '\u00A3',
});

export default BalanceContext;
