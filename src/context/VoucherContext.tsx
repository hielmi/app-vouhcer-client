import {
  useState,
  FC,
  ReactNode,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import { Voucher } from "../type/Voucher.type";

export type VoucherContextType = {
  vouchers: Voucher[];
  setVouchers: Dispatch<SetStateAction<Voucher[]>>;
  saveVoucher: (voucher: Voucher) => void;
  updateVoucher: (id: number) => void;
  deleteVoucher: (id: number) => void;
};

export const VoucherContext = createContext<VoucherContextType | undefined>(
  undefined
);

const VoucherProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);

  const saveVoucher = (voucher: Voucher) => {
    setVouchers((prevVouchers) => [...prevVouchers, voucher]);
  };

  const updateVoucher = (id: number) => {
    setVouchers((prevVouchers) =>
      prevVouchers.map((voucher) =>
        voucher.id === id ? { ...voucher, status: true } : voucher
      )
    );
  };

  const deleteVoucher = (id: number) => {
    setVouchers((prevVouchers) =>
      prevVouchers.filter((voucher) => voucher.id !== id)
    );
  };

  const contextValue: VoucherContextType = {
    vouchers,
    setVouchers,
    saveVoucher,
    updateVoucher,
    deleteVoucher,
  };

  return (
    <VoucherContext.Provider value={contextValue}>
      {children}
    </VoucherContext.Provider>
  );
};

export default VoucherProvider;
