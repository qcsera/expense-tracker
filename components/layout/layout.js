import { Fragment } from "react";
import Header from "../layout/header";
import styles from "./layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
