import { NavLink, Outlet } from "react-router-dom"
import AppNav from "./AppNav"
import styles from "./Sidebar.module.css"

export default function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <NavLink to="/">
                <img src="../../public/logo.png" alt="logo" className="logo" />
            </NavLink>
            <AppNav />
            <Outlet />
        </div>
    )
}
