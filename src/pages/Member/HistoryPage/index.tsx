import { useEffect, useState } from "react";
import Navbar from "../../../components/fragments/Navbar";
import Sidebar from "../../../components/fragments/Sidebar";
import styles from "./History.module.scss";
import voucherServices from "../../../service/voucher";
import { useVoucherContext } from "../../../hooks/useVoucherContext";
import Button from "../../../components/ui/Button";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Voucher } from "../../../type/Voucher.type";

const HistoryPage = () => {
  const { vouchers, setVouchers } = useVoucherContext();
  const [claimedVoucher, setClaimedVoucher] = useState<any[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getClaimedVouchers = async () => {
      try {
        const { data } = await voucherServices.getClaimedVoucher();
        const result = await voucherServices.getAllVouchers();
        const enhancedClaimedVouchers = data.data.map((claimed: any) => {
          const correspondingVoucher = result.data.data.find((voucher: any) => {
            return voucher.id === claimed.id_voucher;
          });
          return correspondingVoucher
            ? { ...claimed, nama: correspondingVoucher.nama }
            : claimed;
        });
        setClaimedVoucher(enhancedClaimedVouchers);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Failed to get claimed voucher",
        });
      }
    };

    getClaimedVouchers();
  }, [navigate]);

  const handleUnclaimVoucher = async (claimedVoucher: any) => {
    try {
      const { id } = claimedVoucher;
      const { data } = await voucherServices.unclaimVoucher(id);
      if (data.status) {
        Swal.fire({
          icon: "success",
          title: "Success unclaim voucher",
          text: data.message,
        });
        setClaimedVoucher((prev) =>
          prev.filter((voucher) => voucher.id !== id)
        );

        const newVouchers = vouchers.map((voucher: Voucher) => {
          if (voucher.id === claimedVoucher.id_voucher) {
            return { ...voucher, status: !voucher.status };
          }
          return voucher;
        });

        setVouchers(newVouchers);
      } else {
        throw new Error("Failed unclaim voucher");
      }
    } catch (err: any) {
      const resultFromApi = err.response
        ? err?.response?.data.message
        : "Failed unclaim voucher";
      Swal.fire({
        icon: "error",
        title: "Failed unclaim voucher",
        text: resultFromApi,
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.history}>
        <div className={styles.history__content}>
          <table className={styles.history__content__table}>
            <thead>
              <tr>
                <th>Nama</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {claimedVoucher.length > 0 &&
                claimedVoucher.map((cVoucher, index) => (
                  <tr key={index}>
                    <td style={{ flexGrow: 1 }}>{cVoucher.nama}</td>
                    <td>
                      <div className={styles.history__content__table__action}>
                        <Button
                          type="button"
                          variant="danger"
                          onClick={() => handleUnclaimVoucher(cVoucher)}
                        >
                          <i className="bx bxs-trash"></i> Remove
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              {claimedVoucher.length <= 0 && (
                <>
                  <tr>
                    <td rowSpan={2}>
                      <p>You dont have claimed voucher</p>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
        <Sidebar />
      </div>
    </>
  );
};

export default HistoryPage;
