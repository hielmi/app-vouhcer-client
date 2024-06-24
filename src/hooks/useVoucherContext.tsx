import { VoucherContext } from "../context/VoucherContext";
import { useContext } from "react";

export const useVoucherContext = () => {
  const context = useContext(VoucherContext);
  if (!context) {
    throw new Error("useVoucherContext must be used within a VoucherProvider");
  }
  return context;
};
