import AdminLayout from "../../../components/layouts/AdminLayout";
import styles from "./Voucher.module.scss";
import Button from "../../../components/ui/Button";
import { useState } from "react";
import ModalUpdateProduct from "./ModalUpdateProduct";
import ModalAddProduct from "./ModalAddProduct";
import ModalDeleteProduct from "./ModalDeleteProduct";
import { Voucher } from "../../../type/Voucher.type";
import { useVoucherContext } from "../../../hooks/useVoucherContext";

const AdminVoucherPage = () => {
  const [editVoucher, setEditVoucher] = useState<Voucher | null>(null);
  const [deleteVoucher, setDeleteVoucher] = useState<Voucher | null>(null);
  const [showModalAddVoucer, SetShowModalAddVoucer] = useState<boolean>(false);

  const { vouchers } = useVoucherContext();

  return (
    <>
      <AdminLayout>
        <div className={styles.voucher}>
          <h2>Vouchers</h2>
          <Button type="button" onClick={() => SetShowModalAddVoucer(true)}>
            Add Voucher
          </Button>
          <div className={styles.voucher__content}>
            <table className={styles.voucher__content__table}>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Foto</th>
                  <th>Kategori</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {vouchers &&
                  vouchers.map((voucher: Voucher, index) => (
                    <tr key={voucher.id}>
                      <td>{index + 1}</td>
                      <td>{voucher.nama}</td>
                      <td>
                        <img
                          src={`http://8.215.34.100:4000/images/${voucher.foto}`}
                          alt={`images-${voucher.nama}`}
                          width="50"
                        />
                      </td>
                      <td>{voucher.kategori}</td>
                      <td>
                        <div className={styles.voucher__content__table__action}>
                          <Button
                            type="button"
                            variant="warning"
                            onClick={() => setEditVoucher(voucher)}
                          >
                            <i className="bx bxs-edit-alt"></i>
                          </Button>
                          <Button
                            type="button"
                            variant="danger"
                            onClick={() => setDeleteVoucher(voucher)}
                          >
                            <i className="bx bxs-trash"></i>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </AdminLayout>
      {editVoucher && (
        <ModalUpdateProduct
          voucher={editVoucher}
          setEditVoucher={setEditVoucher}
        />
      )}
      {showModalAddVoucer && (
        <ModalAddProduct setShowModalAddVoucher={SetShowModalAddVoucer} />
      )}
      {deleteVoucher && (
        <ModalDeleteProduct
          voucher={deleteVoucher}
          setDeleteVoucher={setDeleteVoucher}
        />
      )}
    </>
  );
};

export default AdminVoucherPage;
