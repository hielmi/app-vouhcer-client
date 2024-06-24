import AdminSidebar from "../../fragments/AdminSidebar";
import styles from "./AdminLayout.module.scss";
type PropTypes = {
  children: React.ReactNode;
};

const AdminLayout = (props: PropTypes) => {
  const { children } = props;

  return (
    <>
      <div className={styles.admin_layout}>
        <AdminSidebar />
        {children}
      </div>
    </>
  );
};
export default AdminLayout;
