import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import styles from "../../styles/dashboard/dashboard.module.css";

const AdminRoutes = () => {
  return (
    <div className={styles.container}>
      <nav className={styles.nav_bar}>
        <h1>Dashboard</h1>
        <ul>
          <li>
            <NavLink
              className={({ isActive }) => {
                return isActive ? styles.active : "";
              }}
              to="/admin/product"
            >
              Product
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => {
                return isActive ? styles.active : "";
              }}
              to="/admin/order"
            >
              Order
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminRoutes;
