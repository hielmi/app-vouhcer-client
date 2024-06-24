import { useState } from "react";
import useUserContext from "../../../hooks/useUserContext";
import { useVoucherContext } from "../../../hooks/useVoucherContext";
import Button from "../../ui/Button";
import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  const { logout } = useUserContext();
  const { vouchers } = useVoucherContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { authenticated } = useUserContext();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const categories = vouchers.reduce((acc: any, voucher) => {
    const category = voucher.kategori;
    if (acc[category]) {
      acc[category]++;
    } else {
      acc[category] = 1;
    }
    return acc;
  }, {});

  return (
    <>
      <div className={styles.sidebarToggle} onClick={toggleSidebar}>
        <i className="bx bx-menu"></i>
      </div>
      <aside
        className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}
      >
        <div className="">
          <h1>Kategori</h1>
          <ul>
            {Object.keys(categories).map((category) => (
              <li key={category}>
                {category} ({categories[category]})
              </li>
            ))}
          </ul>
        </div>
        {authenticated ? (
          <Button type="button" variant="danger" onClick={() => logout()}>
            Logout
          </Button>
        ) : (
          ""
        )}
      </aside>
    </>
  );
};

export default Sidebar;
