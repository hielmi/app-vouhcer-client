import AdminLayout from "../../components/layouts/AdminLayout";
import { useVoucherContext } from "../../hooks/useVoucherContext";
import styles from "./Dashboard.module.scss";
const AdminDashboard = () => {
  const { vouchers } = useVoucherContext();

  return (
    <>
      <AdminLayout>
        <div className={styles.dashboard}>
          <h2>Dashboard</h2>
          <div className={styles.dashboard__item}>
            <h3>Total Vouchers</h3>
            <p>{vouchers.length}</p>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminDashboard;
