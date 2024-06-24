import { Link, useLocation } from "react-router-dom";
import Button from "../../ui/Button";
import styles from "./Navbar.module.scss";
import useUserContext from "../../../hooks/useUserContext";

const Navbar = () => {
  const { user, authenticated } = useUserContext();

  const { pathname } = useLocation();

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navbar__profile}>
          <h1>{user?.nama || "Guest"}</h1>
        </div>
        <div className={styles.navbar__header}>
          <h1>Voucher App</h1>
        </div>
        <div className={styles.navbar__btn_nav}>
          {authenticated && user?.role === "member" && (
            <Link to={pathname.includes("history") ? "/" : "/member/history"}>
              <Button type="button" variant="secondary">
                {pathname.includes("history") ? "Home" : "History"}
              </Button>
            </Link>
          )}
          {authenticated && user?.role === "admin" && (
            <Button type="button" className={styles.navbar__btn_nav__dashboard}>
              <Link to={"/admin/dashboard"}>Dahsboard</Link>
            </Button>
          )}
          {!authenticated && (
            <Link to={"/auth/login"}>
              <Button
                type="button"
                className={styles.navbar__btn_nav__dashboard}
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
