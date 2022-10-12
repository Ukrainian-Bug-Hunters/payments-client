import { createContext } from "react";

const BalanceContext = createContext({
  amount: 87.43,
  currency: "GBP",
  currencySymbol: '\u00A3',
});

export default BalanceContext;