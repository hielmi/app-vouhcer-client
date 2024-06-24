import { Link, useLocation } from "react-router-dom";
import Button from "../../ui/Button";
import styles from "./AdminSidebar.module.scss";
import { useState } from "react";
import useUserContext from "../../../hooks/useUserContext";

const AdminSidebar = () => {
  const [hideMenu, setHideMenu] = useState(false);
  const { pathname } = useLocation();

  const { logout } = useUserContext();

  return (
    <aside
      className={`${styles.sidebar} ${hideMenu ? styles.sidebar_hide : ""}`}
    >
      <div
        className={styles.sidebar__toggleSidebar}
        onClick={() => setHideMenu(!hideMenu)}
      >
        {hideMenu ? (
          <i className="bx bx-right-arrow-alt"></i>
        ) : (
          <i className="bx bx-arrow-back"></i>
        )}
      </div>
      {!hideMenu && (
        <div className={styles.sidebar__profile}>
          <img src="https://fakeimg.pl/300x200" alt="Admin Profile" />
          <p>Admin</p>
        </div>
      )}

      <div className={styles.sidebar__menu}>
        {!hideMenu && (
          <>
            <p>DASHBOARD MENU</p>
            <hr />
          </>
        )}
        <ul>
          <Link to={"/admin/dashboard"}>
            <li
              className={`${
                pathname === "/admin/dashboard" ? styles.active : ""
              }`}
            >
              <i className="bx bxs-dashboard"></i>
              {!hideMenu && "Dashboard"}
            </li>
          </Link>
          <Link to={"/admin/voucher"} className={styles.sidebar__menu__item}>
            <li
              className={`${
                pathname === "/admin/voucher" ? styles.active : ""
              }`}
            >
              <i className="fa-solid fa-ticket"></i>
              {!hideMenu && "Vouchers"}
            </li>
          </Link>
        </ul>
      </div>
      <Button
        type="button"
        variant="danger"
        className={styles.sidebar__btn}
        onClick={() => logout()}
      >
        <i className="bx bx-log-out-circle"></i>
        {!hideMenu && "Logout"}
      </Button>
    </aside>
  );
};

export default AdminSidebar;
