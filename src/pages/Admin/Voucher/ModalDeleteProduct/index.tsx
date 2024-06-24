import { Dispatch, SetStateAction, useState } from "react";
import Modal from "../../../../components/ui/Modal";
import styles from "./ModalDeleteUser.module.scss";
import Button from "../../../../components/ui/Button";
import { Voucher } from "../../../../type/Voucher.type";
import voucherServices from "../../../../service/voucher";
import { useVoucherContext } from "../../../../hooks/useVoucherContext";
import Swal from "sweetalert2";

type PropTypes = {
  voucher: Voucher | null;
  setDeleteVoucher: Dispatch<SetStateAction<Voucher | null>>;
};

const ModalDeleteProduct = (props: PropTypes) => {
  const { voucher, setDeleteVoucher } = props;
  const { setVouchers } = useVoucherContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!voucher) return;

    setIsLoading(true);

    try {
      const { data } = await voucherServices.deleteVoucherById(voucher?.id);

      if (data.status) {
        setVouchers((prevVouchers: Voucher[]) =>
          prevVouchers.filter((v) => v.id !== voucher.id)
        );
        setDeleteVoucher(null);
      } else {
        throw new Error("Failed to delete voucher");
      }
    } catch (err: any) {
      const resultFromApi = err.response
        ? err.response.data.message
        : "An error occurred while deleting the voucher";
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: resultFromApi,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      onClose={() => {
        setDeleteVoucher(null);
      }}
    >
      <div className={styles.modal__content}>
        <h1 className={styles.modal__content__title}>Are you sure? </h1>
        <Button type="button" variant="danger" onClick={handleDelete}>
          {isLoading ? "Deleting..." : "Yes, delete"}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalDeleteProduct;
