import React from "react";
import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.scss"; // Make sure you create appropriate styling

const ErrorPage: React.FC = () => {
  return (
    <div className={styles.errorPage}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default ErrorPage;
