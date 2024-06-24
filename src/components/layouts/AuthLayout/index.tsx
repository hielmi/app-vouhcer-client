import { Link } from "react-router-dom";
import styles from "./AuthLayout.module.scss";

type PropTypes = {
  title: string;
  children?: React.ReactNode;
  link: string;
  linkText?: string;
};

const AuthLayout = (props: PropTypes) => {
  const { title, children, link, linkText } = props;
  return (
    <div className={styles.auth}>
      <div className={styles.auth__form}>
        <h1 className={styles.auth__title}>{title}</h1>
        {children}
      </div>
      <p className={styles.auth__link}>
        {linkText}
        <Link to={link}> here</Link>
      </p>
    </div>
  );
};

export default AuthLayout;
