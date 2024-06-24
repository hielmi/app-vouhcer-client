import instance from "../lib/axios/instance";

interface ClaimVoucherData {
  id: number;
}

const voucherServices = {
  addVoucher: (data: FormData) =>
    instance.post("/api/voucher", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  getAllVouchers: () => instance.get("/api/vouchers"),

  getVoucherById: (id: string) => instance.get(`/api/voucher/${id}`),

  updateVoucherById: (id: string, data: FormData) =>
    instance.put(`/api/voucher/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  deleteVoucherById: (id: number) => instance.delete(`/api/voucher/${id}`),

  getClaimedVoucher: () => instance.get("/api/claim-vouchers"),

  claimVoucher: (data: ClaimVoucherData) =>
    instance.post("/api/claim-voucher", data),

  unclaimVoucher: (id: number) => instance.delete(`/api/unclaim-voucher/${id}`),
};

export default voucherServices;
